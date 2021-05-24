import axios from 'axios';
import React, { useState } from 'react';
import BackEndUrl from '../RouteUrls';
import '../../css/LoginForm.css';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';

function LoginForm () {
	const [ formData, setFormData ] = useState({
		email    : '',
		password : ''
	});

	const [ invalidInput, setInvalidInput ] = useState('');

	const handleChange = (e) => {
		const value = e.target.value;
		setFormData({
			...formData,
			[e.target.name]: value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData['email'].length || !formData['password'].length) {
			setInvalidInput('Please Fill out all Inputs');
		}
		else {
			await axios
				.post(`${BackEndUrl}/auth/login`, formData)
				.then((res) => {
					if (res.data['user'].length > 0) {
						localStorage.setItem('user', res.data['user']);
						window.location.replace('/roadlist');
					}
				})
				.catch((err) => setInvalidInput('Email or Password is Incorrect'));
		}
	};

	return (
		<Row>
			<Col md={{ span: 6, offset: 3 }}>
				{/* {invalidInput.length ? <h3>{invalidInput}</h3> : <div className="validInput" />} */}
				<Jumbotron>
					{invalidInput.length ? <h3>{invalidInput}</h3> : <div className="validInput" />}
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="formGroupEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								onChange={handleChange}
								name="email"
								value={formData.email}
								type="email"
								placeholder="Enter email"
							/>
						</Form.Group>
						<Form.Group controlId="formGroupPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								onChange={handleChange}
								name="password"
								value={formData.password}
								type="password"
								placeholder="Password"
							/>
						</Form.Group>
						<Button onClick={handleSubmit}>Login</Button>
					</Form>
				</Jumbotron>
			</Col>
		</Row>
	);
}

export default LoginForm;
