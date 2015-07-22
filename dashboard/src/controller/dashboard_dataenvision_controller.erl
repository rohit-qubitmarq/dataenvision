-module(dashboard_dataenvision_controller, [Req]).
-compile(export_all).
-default_action(index).

index('GET', []) ->
{redirect, "/static/DataEnvision/index.html#"}.