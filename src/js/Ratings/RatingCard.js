import axios from 'axios';
import React from 'react';
import BackEndUrl from '../RouteUrls';
import '../../css/RatingCard.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function RatingCard ({ overall, difficulty, user_email, description, road_id, rating_count }) {
	const removeRating = async () => {
		const data = {
			user_email : localStorage.getItem('user')
		};
		axios.post(`${BackEndUrl}/road/${road_id}/rating/delete`, data);
		window.location.replace(`/roads/${road_id}`);
	};
	return (
		<Card
			style={{
				marginLeft   : '30px',
				marginRight  : '30px',
				marginBottom : '40px'
			}}
		>
			<Card.Header>Review</Card.Header>
			<Card.Body>
				<blockquote className="blockquote mb-0">
					<p> {description}</p>
					<p>
						<b>Overall: </b>
						{overall}
					</p>
					<p>
						<b>Difficulty: </b>
						{difficulty}
					</p>
					<p>
						<b>RATING COUNT: </b>
						{rating_count}
					</p>
					<footer className="blockquote-footer">
						<cite title="Source Title">{user_email.split('@')[0]}</cite>
					</footer>
				</blockquote>

				{user_email === localStorage.getItem('user') ? (
					<Button variant="danger" id="ratingbutton" onClick={removeRating}>
						Delete
					</Button>
				) : (
					<div />
				)}
			</Card.Body>
		</Card>
		// <div className="RatingCard">
		// 	<div className="ratingcontainer">
		// 		<div className="ratinguser">
		// 			<p className="ratinguseremail">{user_email.split('@')[0]}</p>
		// 		</div>
		// 		<hr className="ratinghr" />
		// 		<div className="ratingdescription">
		// 			<b>Description:</b>
		// 			<p>{description}</p>
		// 		</div>
		// 		<div className="ratingoveralldifficulty">
		// 			{/* <p className="ratingrating">
		// 				<b>Overall:</b> {overall}
		// 				<b>Difficulty:</b> {difficulty}
		// 			</p> */}
		// 			<span id="ratingoverall" className="ratingrating">
		// 				<b>Overall: </b>
		// 				{overall}
		// 			</span>
		// 			<span id="ratingdifficulty" className="ratingrating">
		// 				<b>Difficulty: </b>
		// 				{difficulty}
		// 			</span>
		// 		</div>
		// 		{user_email === localStorage.getItem('user') ? (
		// 			<button id="ratingbutton" onClick={removeRating}>
		// 				Delete
		// 			</button>
		// 		) : (
		// 			<div />
		// 		)}
		// 	</div>
		// </div>
	);
}

export default RatingCard;
