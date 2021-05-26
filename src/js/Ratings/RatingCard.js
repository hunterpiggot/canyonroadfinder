import axios from 'axios';
import React from 'react';
import BackEndUrl from '../RouteUrls';
import '../../css/RatingCard.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function RatingCard ({ overall, difficulty, user_email, description, road_id, rating_count }) {
	// When the user has made a review, a delete button appears. When clicked, this function is called. This send a post request to the back end to remove it from the database. It then refreshes the page.
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
	);
}

export default RatingCard;
