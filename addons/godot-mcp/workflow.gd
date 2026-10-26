@tool
extends RefCounted

var plugin: EditorPlugin
var logger = preload("workflow_logger.gd").new()
var scripts := {}
var jobs := {}
var sequence := 0

func initialize(owner_plugin: EditorPlugin) -> void:
	if plugin == owner_plugin: return
	plugin = owner_plugin
	OS.add_logger(logger)

func shutdown() -> void:
	logger.active = false
	OS.remove_logger(logger)
	for job in jobs.values():
		_release_viewport(job)
	jobs.clear()
	scripts.clear()

func handles(command: String) -> bool:
	return command in ["run_gdscript","workflow_info","workflow_capture_start","workflow_import_start","workflow_job_status","workflow_job_cancel","workflow_tilemap_summary"]

func execute(command: String, params: Dictionary) -> Dictionary:
	match command:
		"run_gdscript": return _run_script(params)
		"workflow_info": return {"name":"godot-mcp","version":"1.12.9-workflow.1","godot_pid":OS.get_process_id(),"project":ProjectSettings.globalize_path("res://"),"script":get_script().resource_path,"script_cache_size":scripts.size(),"native_jobs":jobs.size()}
		"workflow_capture_start": return _capture_start(params)
		"workflow_import_start": return _import_start(params)
		"workflow_job_status": return _job_status(str(params.get("job_id","")))
		"workflow_job_cancel":
			var id = str(params.get("job_id",""))
			if not jobs.has(id): return {"error":"Unknown native job"}
			var job: Dictionary = jobs[id]
			if job.status == "running":
				job.status = "cancelled"
				_release_viewport(job)
			return _job_status(id)
		"workflow_tilemap_summary": return _tilemap_summary(params)
	return {"error":"Unknown workflow command"}

func _finish_script(result, error := "") -> Dictionary:
	logger.active = false
	var errors: Array = logger.errors.duplicate(true)
	if error.is_empty() and not errors.is_empty():
		error = "GDScript execution failed: "+str(errors[0].get("message","runtime error"))
	var out = {"ok":error.is_empty(),"result":plugin._value_to_jsonable(result),"errors":errors}
	if not error.is_empty(): out["error"] = error
	return out

func _run_script(params: Dictionary) -> Dictionary:
	var code = str(params.get("code",""))
	var root = EditorInterface.get_edited_scene_root()
	if code.is_empty(): return {"error":"Missing code"}
	var expected = str(params.get("expected_scene",""))
	if not expected.is_empty() and (root == null or root.scene_file_path != expected):
		return {"error":"Edited scene differs from expected_scene"}
	logger.errors.clear()
	logger.active = true
	if str(params.get("mode","expression")) == "expression":
		var expression = Expression.new()
		if expression.parse(code) != OK:
			return _finish_script(null,"Parse error: "+expression.get_error_text())
		var value = expression.execute([],root)
		if expression.has_execute_failed():
			return _finish_script(null,"Execution error: "+expression.get_error_text())
		return _finish_script(value)
	if str(params.get("mode","")) != "script":
		return _finish_script(null,"Unknown script mode")
	var key = code.sha256_text()
	var script: GDScript
	if scripts.has(key):
		script = scripts[key]
	else:
		script = GDScript.new()
		script.source_code = code
		var error = script.reload()
		if error != OK:
			return _finish_script(null,"GDScript compilation failed ("+str(error)+")")
		var base = script.get_instance_base_type()
		if base != "RefCounted" and not ClassDB.is_parent_class(base,"RefCounted"):
			return _finish_script(null,"Script mode requires extends RefCounted")
		if scripts.size() >= 16: scripts.erase(scripts.keys()[0])
		scripts[key] = script
	var runner = script.new()
	if runner == null or not runner.has_method("run"):
		return _finish_script(null,"Script must provide run(context)")
	var context = {"root":root,"editor":EditorInterface,"undo":plugin.get_undo_redo(),"args":params.get("args",{})}
	var result = runner.call("run",context)
	return _finish_script(result)

func _new_job(kind: String) -> Dictionary:
	for id in jobs.keys():
		var old: Dictionary = jobs[id]
		if old.status != "running" and Time.get_ticks_msec()-old.created_ms > 60000:
			jobs.erase(id)
	if jobs.size() >= 64:
		return {"error":"Too many native jobs"}
	sequence += 1
	var job = {"id":"native_"+str(sequence),"kind":kind,"status":"running","completed":0,"created_ms":Time.get_ticks_msec(),"created_us":Time.get_ticks_usec()}
	jobs[job.id] = job
	return job

func _job_status(id: String) -> Dictionary:
	if not jobs.has(id): return {"error":"Unknown or expired native job"}
	var job: Dictionary = jobs[id]
	return {"job_id":id,"status":job.status,"completed":job.completed,"result":job.get("result",{}),"error":job.get("error","")}

func _release_viewport(job: Dictionary) -> void:
	if job.get("owned",false) and is_instance_valid(job.get("viewport")):
		job.viewport.queue_free()
	job.erase("viewport")

func _capture_start(params: Dictionary) -> Dictionary:
	var mode = str(params.get("mode","editor"))
	var viewport: Viewport
	var owned := false
	if mode == "region_2d":
		var root = EditorInterface.get_edited_scene_root()
		if root == null or not root is CanvasItem: return {"error":"A 2D scene is required"}
		var r: Dictionary = params.get("rect",{})
		var rect = Rect2(float(r.get("x",0)),float(r.get("y",0)),float(r.get("width",0)),float(r.get("height",0)))
		if rect.size.x <= 0 or rect.size.y <= 0: return {"error":"Invalid world-pixel rectangle"}
		var requested: Dictionary = params.get("size",{})
		var width = int(requested.get("width",1280))
		var height = int(requested.get("height",clampi(roundi(width*rect.size.y/rect.size.x),1,2048)))
		if width < 1 or height < 1 or width > 2048 or height > 2048: return {"error":"Invalid output size"}
		var target = SubViewport.new()
		target.name = "MCPRegionPreview"
		target.size = Vector2i(width,height)
		target.world_2d = root.get_world_2d()
		var zoom = minf(float(width)/rect.size.x,float(height)/rect.size.y)
		target.canvas_transform = Transform2D(Vector2(zoom,0),Vector2(0,zoom),Vector2(width,height)/2.0-rect.get_center()*zoom)
		target.canvas_item_default_texture_filter = Viewport.DEFAULT_CANVAS_ITEM_TEXTURE_FILTER_NEAREST
		target.render_target_update_mode = SubViewport.UPDATE_ONCE
		plugin.add_child(target)
		viewport = target
		owned = true
	elif mode == "viewport_2d":
		viewport = EditorInterface.get_editor_viewport_2d()
	elif mode == "editor":
		viewport = EditorInterface.get_editor_main_screen().get_viewport()
	else:
		return {"error":"Unknown screenshot mode"}
	if viewport == null: return {"error":"No render viewport"}
	var job = _new_job("capture")
	if job.has("error"):
		if owned: viewport.queue_free()
		return job
	job["viewport"] = viewport
	job["owned"] = owned
	job["mode"] = mode
	job["path"] = str(params.get("path","user://mcp_screenshot.png"))
	RenderingServer.frame_post_draw.connect(_finish_capture.bind(job.id),CONNECT_ONE_SHOT)
	return {"job_id":job.id}

func _finish_capture(id: String) -> void:
	if not jobs.has(id): return
	var job: Dictionary = jobs[id]
	if job.status != "running": return
	var viewport = job.get("viewport")
	if not is_instance_valid(viewport):
		job.status = "failed"
		job["error"] = "Preview viewport unavailable"
		return
	var image = viewport.get_texture().get_image()
	if image == null or image.is_empty():
		job.status = "failed"
		job["error"] = "Empty screenshot"
	else:
		var full_path = ProjectSettings.globalize_path(job.path)
		var error = image.save_png(full_path)
		if error == OK:
			job.status = "completed"
			job.completed = 1
			job["result"] = {"path":full_path,"width":image.get_width(),"height":image.get_height(),"mode":job.mode,"timing":{"render_ms":float(Time.get_ticks_usec()-job.created_us)/1000.0},"scene_instances_created":0}
		else:
			job.status = "failed"
			job["error"] = "PNG save failed: "+str(error)
	_release_viewport(job)

func _import_start(params: Dictionary) -> Dictionary:
	var paths: Array = params.get("paths",[])
	if paths.is_empty(): return {"error":"No asset paths"}
	var project = ProjectSettings.globalize_path("res://").replace("\\","/").trim_suffix("/")+"/"
	for value in paths:
		var path = str(value)
		var full = ProjectSettings.globalize_path(path).replace("\\","/").simplify_path()
		if not path.begins_with("res://") or not full.begins_with(project):
			return {"error":"Asset path must stay inside project: "+path}
	var job = _new_job("import")
	if job.has("error"): return job
	job["paths"] = paths
	job["deadline"] = Time.get_ticks_msec()+int(params.get("timeout_ms",30000))
	job["next_check"] = 0
	EditorInterface.get_resource_filesystem().scan()
	return {"job_id":job.id}

func tick() -> void:
	for job in jobs.values():
		if job.status != "running" or job.kind != "import": continue
		var now = Time.get_ticks_msec()
		if now < job.next_check: continue
		job.next_check = now+100
		var scanning = EditorInterface.get_resource_filesystem().is_scanning()
		var statuses = []
		var pending := false
		var failed := false
		var completed := 0
		for value in job.paths:
			var path = str(value)
			var state = "pending"
			if not FileAccess.file_exists(path):
				state = "missing"
				failed = true
				completed += 1
			elif not scanning and ResourceLoader.exists(path) and ResourceLoader.load(path) != null:
				state = "ready"
				completed += 1
			elif now >= job.deadline:
				state = "timeout"
				failed = true
				completed += 1
			else:
				pending = true
			statuses.append({"path":path,"status":state})
		job.completed = completed
		job["result"] = {"assets":statuses}
		if not pending:
			job.status = "failed" if failed else "completed"
			if failed: job["error"] = "Some assets were missing or did not become loadable"

func _tilemap_summary(params: Dictionary) -> Dictionary:
	var root = EditorInterface.get_edited_scene_root()
	if root == null: return {"error":"No edited scene"}
	var node = root.get_node_or_null(str(params.get("node_path","")))
	if not node is TileMapLayer: return {"error":"Target must be TileMapLayer"}
	var r: Dictionary = params.get("rect",{})
	var rect = Rect2i(int(r.get("x",0)),int(r.get("y",0)),int(r.get("width",0)),int(r.get("height",0)))
	if rect.size.x <= 0 or rect.size.y <= 0 or rect.size.x*rect.size.y > 65536:
		return {"error":"Rectangle must contain 1..65536 cells"}
	var occupied := 0
	var invalid := 0
	var sources := {}
	var minimum = rect.end
	var maximum = rect.position
	for y in range(rect.position.y,rect.end.y):
		for x in range(rect.position.x,rect.end.x):
			var cell = Vector2i(x,y)
			var id = node.get_cell_source_id(cell)
			if id == -1: continue
			occupied += 1
			minimum = minimum.min(cell)
			maximum = maximum.max(cell+Vector2i.ONE)
			sources[str(id)] = sources.get(str(id),0)+1
			if node.tile_set == null or not node.tile_set.has_source(id):
				invalid += 1
				continue
			var source = node.tile_set.get_source(id)
			var atlas = node.get_cell_atlas_coords(cell)
			if not source.has_tile(atlas):
				invalid += 1
			elif source is TileSetAtlasSource and not source.has_alternative_tile(atlas,node.get_cell_alternative_tile(cell)):
				invalid += 1
	var bounds = {"x":minimum.x,"y":minimum.y,"width":maximum.x-minimum.x,"height":maximum.y-minimum.y} if occupied > 0 else {}
	return {"node_path":str(params.get("node_path")),"inspected_cells":rect.size.x*rect.size.y,"occupied":occupied,"invalid_tiles":invalid,"sources":sources,"occupied_bounds":bounds}
