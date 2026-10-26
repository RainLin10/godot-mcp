@tool
extends Logger

var active := false
var errors: Array[Dictionary] = []

func _log_error(function: String, file: String, line: int, code: String, rationale: String, _editor_notify: bool, error_type: int, _script_backtraces: Array[ScriptBacktrace]) -> void:
	if active and errors.size() < 100:
		errors.append({"function":function,"file":file,"line":line,"message":rationale if not rationale.is_empty() else code,"code":code,"type":error_type})
