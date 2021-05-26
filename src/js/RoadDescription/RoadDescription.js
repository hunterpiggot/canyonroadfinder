import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GoogleMap, KmlLayer, LoadScript } from '@react-google-maps/api';
import '../../css/RoadDescription.css';
import BackEndUrl from '../RouteUrls';
import RatingCard from '../Ratings/RatingCard';
import RatingForm from '../Ratings/RatingForm';
import Table from 'react-bootstrap/Table';

function RoadDescription () {
	// Gets the road id
	let { id } = useParams();

	// Stores the road information
	const [ road, setRoad ] = useState({});
	// Stores all the reviews
	const [ ratings, setRatings ] = useState({ ratings: [] });
	// Stores the overall rating average
	const [ overallRating, setOverallRating ] = useState('-');
	// Stores the difficulty rating average
	const [ difficultyRating, setDifficultyRating ] = useState('-');
	// Sees if the user has already left a review
	const [ alreadyRated, setAlreadyRated ] = useState(false);
	// Sees whta the status for the road is and can change when the user changes it
	const [ userRoadStatus, setUserRoadStatus ] = useState([]);
	// sees if the user has a location saved in local storage
	const [ userLocation, setUserLocation ] = useState(false);

	useEffect(
		() => {
			// This sees if the user has a location, if it does, it chagnes the userLocation state to reflect that
			const checkUserLocation = () => {
				if (localStorage.getItem('location')) {
					setUserLocation(true);
				}
			};
			// Sends a request to the database to get the road information
			const getRoad = async () => {
				const res = await axios(`${BackEndUrl}/road/${id}`);
				setRoad(res.data);
			};
			// Sends a request to the database to get all the reviews for the road. If there are reviews, is sees if the there are more than 4 and sets changes the overall rating and difficulty rating
			const getRatings = async () => {
				const res = await axios(`${BackEndUrl}/road/${id}/rating`);
				setRatings(res.data);
				let overallRatingSum = 0;
				let difficultyRatingSum = 0;
				if (res.data['ratings'].length > 4) {
					for (let rating of res.data['ratings']) {
						if (rating['user_email'] === localStorage.getItem('user')) {
							setAlreadyRated(true);
						}
						overallRatingSum += rating.overall;
						difficultyRatingSum += rating.difficulty;
					}
					setOverallRating(Math.round(overallRatingSum / res.data['ratings'].length * 100) / 100);
					setDifficultyRating(Math.round(difficultyRatingSum / res.data['ratings'].length * 100) / 100);
				}
			};
			// Gets the status of the road for the user and reflects that in state
			const getRoadStatus = async () => {
				if (localStorage.getItem('user')) {
					const res = await axios(`${BackEndUrl}/road/userRoadList/${localStorage.getItem('user')}/${id}`);

					setUserRoadStatus(res.data['status'].split(', '));
				}
			};
			checkUserLocation();
			getRoadStatus();
			getRoad();
			getRatings();
		},
		[ id ]
	);

	// For all the reviews, it calls this function to create a rating card
	const renderRatingCards = (ratings) => {
		const ratingList = ratings['ratings'].map((r) => (
			<RatingCard
				key={r.id}
				overall={r.overall}
				difficulty={r.difficulty}
				user_email={r.user_email}
				description={r.description}
				road_id={r.road_id}
				rating_count={r.rating_count}
			/>
		));
		return ratingList;
	};
	const mapStyles = {
		height : '100%',
		width  : '100%'
	};
	// If it is a loop, it will change the bool to a string or it will just use false
	const loop = road.loop ? road.loop.toString() : 'false';
	// If there is a latlong to the road, it will set it as that, or it will use a default value
	const latlng = road.latLong ? road.latLong.split(', ') : [ '38.8320083404165', '-104.8422776269326' ];
	// This sets the center of the viewing of the map
	const defaultCenter = {
		lat : Number(latlng[0]),
		lng : Number(latlng[1])
	};

	// This gets the users current location if the user allows it. This then updates the database to set the location

	const getLocation = () => {
		try {
			const options = {
				enableHighAccuracy : true,
				timeout            : 5000,
				maximumAge         : 0
			};
			const success = async (pos) => {
				let crd = pos.coords;

				if (localStorage.getItem('user')) {
					setUserLocation(true);
					let data = {
						lat : crd.latitude.toString(),
						lng : crd.longitude.toString()
					};
					await axios
						.post(`${BackEndUrl}/users/location/${localStorage.getItem('user')}`, data)
						.then((res) => res.data)
						.then((resData) => localStorage.setItem('location', `${data['lat']}, ${data['lng']}`));
				}
			};
			const error = (err) => {
				console.warn(`ERROR(${err.code}: ${err.message})`);
			};

			navigator.geolocation.getCurrentPosition(success, error, options);
		} catch (err) {
			console.error(err);
			return err.response;
		}
	};

	// This function is called when a user adds a status to a road. It sees what is being changed and sends a post request to the database to reflect the changes. If the request worked, it changes the state and updates the page

	const addItem = async (e) => {
		const target = e.target.id;
		let data = {
			road_id    : id,
			user_email : localStorage.getItem('user'),
			status     : target
		};
		await axios.post(`${BackEndUrl}/road/userRoadList/add`, data).then((res) => res.data).then((data) => {
			if (data.status.length) {
				setUserRoadStatus([ ...userRoadStatus, target ]);
			}
		});
	};
	// This is the same as the other function but instead of adding, it removes the status

	const removeItem = async (e) => {
		const target = e.target.id;
		let data = {
			road_id    : id,
			user_email : localStorage.getItem('user'),
			status     : target
		};
		await axios.post(`${BackEndUrl}/road/userRoadList/remove`, data).then((res) => res.data).then((data) => {
			if (data.status.length) {
				const newStatus = [ ...userRoadStatus ];
				const index = userRoadStatus.indexOf(target);
				if (index !== -1) {
					newStatus.splice(index, 1);
					setUserRoadStatus(newStatus);
				}
			}
		});
	};

	return (
		<div className="RoadDescription">
			<h1>{road.name}</h1>
			<div className="RoadDescription-status-tags">
				<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.5.0/css/all.css" />
			</div>
			<div className="RoadDescription-map-and-details">
				<div className="RoadDescription-details">
					<Table>
						<thead>
							<tr>
								<th colSpan="2">Details</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Length:</td>
								<td>{road.length}</td>
							</tr>
							<tr>
								<td>Elevation Change:</td>
								<td>{road.elevationChange}</td>
							</tr>
							<tr>
								<td>Loop:</td>
								<td>{loop}</td>
							</tr>
							<tr>
								<td>Location:</td>
								<td>{road.location}</td>
							</tr>
							<tr>
								<td>Overall Rating:</td>
								<td>{overallRating} / 10</td>
							</tr>
							<tr>
								<td>Difficulty Rating:</td>
								<td>{difficultyRating} / 10</td>
							</tr>
							{userLocation ? (
								<tr />
							) : (
								<tr>
									<td colSpan="2">
										<button id="locationbutton" onClick={getLocation}>
											Get Location
										</button>
									</td>
								</tr>
							)}
							<tr>
								<td id="statussymbols" colSpan="2">
									{userRoadStatus.includes('favorite') ? (
										<span
											style={{ marginRight: '10px' }}
											id="favorite-item"
											className="icon icon-default"
										>
											<i id="favorite" onClick={removeItem} className="fas fa-star fa-fw fa-1x" />
										</span>
									) : (
										<span
											style={{ marginRight: '10px' }}
											id="favorite-item"
											className="icon icon-default"
										>
											<i id="favorite" onClick={addItem} className="far fa-star" />
										</span>
									)}
									{userRoadStatus.includes('planned') ? (
										<span
											style={{ marginRight: '10px' }}
											id="planned-item"
											className="icon icon-default"
										>
											<i id="planned" onClick={removeItem} className="fas fa-calendar-check" />
										</span>
									) : (
										<span
											style={{ marginRight: '10px' }}
											id="planned-item"
											className="icon icon-default"
										>
											<i id="planned" onClick={addItem} className="far fa-calendar" />
										</span>
									)}
									{userRoadStatus.includes('driven') ? (
										<span
											style={{ marginRight: '10px' }}
											id="driven-item"
											className="icon icon-default"
										>
											<i id="driven" onClick={removeItem} className="fas fa-check-circle" />
										</span>
									) : (
										<span
											style={{ marginRight: '10px' }}
											id="driven-item"
											className="icon icon-default"
										>
											<i id="driven" onClick={addItem} className="far fa-check-circle" />
										</span>
									)}
								</td>
							</tr>
						</tbody>
					</Table>
				</div>
				<div className="RoadDescription-map">
					<LoadScript googleMapsApiKey={`${process.env.REACT_APP_TEST_KEY}`}>
						<GoogleMap mapContainerStyle={mapStyles} zoom={15} center={defaultCenter}>
							<KmlLayer
								url="https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=17EJOcSANg7JpUX_qoPOhTdz0ATXCDY9F"
								options={{ preserveViewport: true }}
							/>
						</GoogleMap>
					</LoadScript>
				</div>
			</div>
			<div
				className="RoadDescription-description"
				style={{
					marginTop    : '30px',
					marginBottom : '50px',
					marginLeft   : '30px',
					marginRight  : '30px'
				}}
			>
				<h3 className="RoadDescription-description-h3">Description</h3>
				<p className="RoadDescription-description-p">{road.description}</p>
			</div>
			<div className="RoadDescription-RatingForm">{!alreadyRated ? <RatingForm road_id={id} /> : <div />}</div>
			<div className="RoadDescription-rating">
				{ratings['ratings'].length > 0 ? (
					<div>
						<h3>Reviews</h3>
						{renderRatingCards(ratings)}{' '}
					</div>
				) : (
					<div />
				)}
			</div>
		</div>
	);
}

export default RoadDescription;
