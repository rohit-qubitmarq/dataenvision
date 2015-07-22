-module(dashboard_register_controller, [Req]).
-compile(export_all).

%regitering user
register_person('GET', []) ->
	{output, []};
register_person('POST',[]) ->
	io:format("Hi register called in CB controller"),
	{ok, Salt} = bcrypt:gen_salt(),
	{ok, Password} = bcrypt:hashpw(Req:post_param("password"), Salt),
	NewPerson = boss_record:new(person, [
			{name, Req:post_param("name")}, 
			{password, Password}, 
			{email, Req:post_param("email")}
		]),
	{ok, SavedPerson} = NewPerson:save(),
	{json, SavedPerson}.