import React from 'react';
import LoginForm from './LoginForm';

// When going to the login page, this is what is called

function Login () {
	return (
		<div className="Login">
			<h1>Login</h1>
			<LoginForm />
		</div>
	);
}

export default Login;
