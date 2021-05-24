import axios from 'axios';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

import BackEndUrl from '../RouteUrls';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

function RatingFrom ({ road_id }) {
	const [ formData, setFromData ] = useState({
		road_id     : road_id,
		user_email  : localStorage.getItem('user'),
		overall     : '',
		difficulty  : '',
		description : ''
	});

	const handleChange = (e) => {
		const val = e.target.value;
		setFromData({
			...formData,
			[e.target.name]: val
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios
			.post(`${BackEndUrl}/road/${road_id}/rating/create`, formData)
			.then((res) => res.data)
			.then((data) => {
				if (data['success'] === 'true') {
					setFromData({
						road_id     : road_id,
						user_email  : localStorage.getItem('user'),
						overall     : '',
						difficulty  : '',
						description : ''
					});
					window.location.replace(`/roads/${road_id}`);
				}
			});
	};

	return (
		<div
			style={{
				margin : '30px'
			}}
		>
			<h2>Leave a Review!</h2>
			<Form onSubmit={handleSubmit}>
				<Form.Row>
					<Form.Group as={Col} md="12">
						<Form.Label>Description</Form.Label>
						<Form.Control
							value={formData.description}
							name="description"
							onChange={handleChange}
							as="textarea"
							rows={3}
						/>
					</Form.Group>
				</Form.Row>
				<Form.Row>
					<Form.Group as={Col} md="6">
						<Form.Label>Overall</Form.Label>
						<Form.Control name="overall" onChange={handleChange} as="select">
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
						</Form.Control>
					</Form.Group>
					<Form.Group as={Col} md="6" controlId="exampleForm.ControlSelect1">
						<Form.Label>Difficulty</Form.Label>
						<Form.Control name="difficulty" onChange={handleChange} as="select">
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
						</Form.Control>
					</Form.Group>
				</Form.Row>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
		// <div className="RatingFrom">
		// 	<form onSubmit={handleSubmit}>
		// 		<label>Overall (1-10)</label>
		// 		<input value={formData.overall} name="overall" onChange={handleChange} type="number" min="1" max="10" />
		// 		<label>Difficulty (1-10)</label>
		// 		<input
		// 			value={formData.difficulty}
		// 			name="difficulty"
		// 			onChange={handleChange}
		// 			type="number"
		// 			min="1"
		// 			max="10"
		// 		/>
		// 		<label>Description</label>
		// 		<input type="text" value={formData.description} name="description" onChange={handleChange} />
		// 		<button>Submit</button>
		// 	</form>
		// </div>
	);
}

export default RatingFrom;
