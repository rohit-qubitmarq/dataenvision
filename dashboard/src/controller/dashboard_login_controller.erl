-module(dashboard_login_controller, [Req]).
-compile(export_all).

%user login
login_person('GET', []) ->
	{output, []};
login_person('POST', []) ->

	case boss_db:find(person, [{email, 'equals', Req:post_param("email")}]) of
		[Person] ->
			Password = Req:post_param("password"),
			io:format("password is : ~p~n", [Password]),
				case Person:check_password(Password) of
					true ->
						Person_role = boss_db:find(person_role, [{person_id, 'equals', Person:id()}]),
						[Roleid] = lists:map(fun(PersonRole) -> PersonRole:role_id() end, Person_role),
						io:format("Person_role is : ~p~n", [Person_role]),

						Role = boss_db:find(role, [{id, 'equals', Roleid}]),
						io:format("Role is : ~p~n", [Role]),

						{json, [{person, Person}, {role, Role}]};
					false ->
						io:format("PASSWORD DO NOT MATCHED")
				end;
		_error ->
			io:format("Email DO NOT MATCHED")
	end.