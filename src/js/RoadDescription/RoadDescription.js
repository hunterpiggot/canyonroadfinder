import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GoogleMap, KmlLayer, LoadScript } from '@react-google-maps/api';
import '../../css/RoadDescription.css';
import BackEndUrl from '../RouteUrls';
import RatingCard from '../Ratings/RatingCard';
import RatingForm from '../Ratings/RatingForm';

function RoadDescription () {
	let { id } = useParams();

	const [ road, setRoad ] = useState({});
	const [ ratings, setRatings ] = useState({ ratings: [] });
	const [ ovarallRating, setOverallRating ] = useState('-');
	const [ difficultyRating, setDifficultyRating ] = useState('-');
	const [ alreadyRated, setAlreadyRated ] = useState(false);

	useEffect(
		() => {
			const getRoad = async () => {
				const res = await axios(`${BackEndUrl}/road/${id}`);
				setRoad(res.data);
			};
			const getRatings = async () => {
				const res = await axios(`${BackEndUrl}/road/${id}/rating`);
				setRatings(res.data);
				let overallRatingSum = 0;
				let difficultyRatingSum = 0;
				for (let rating of res.data['ratings']) {
					if (rating['user_email'] === localStorage.getItem('user')) {
						setAlreadyRated(true);
					}
					overallRatingSum += rating.overall;
					difficultyRatingSum += rating.difficulty;
				}
				setOverallRating(Math.round(overallRatingSum / res.data['ratings'].length * 100) / 100);
				setDifficultyRating(Math.round(difficultyRatingSum / res.data['ratings'].length * 100) / 100);
			};
			getRoad();
			getRatings();
		},
		[ id ]
	);

	const renderRatingCards = (ratings) => {
		const ratingList = ratings['ratings'].map((r) => (
			<RatingCard
				key={r.id}
				overall={r.overall}
				difficulty={r.difficulty}
				user_email={r.user_email}
				description={r.description}
				road_id={r.road_id}
			/>
		));
		return ratingList;
	};

	const mapStyles = {
		height : '100%',
		width  : '100%'
	};
	const loop = road.loop ? road.loop.toString() : 'false';
	const latlng = road.latLong ? road.latLong.split(', ') : [ '38.8320083404165', '-104.8422776269326' ];
	const defaultCenter = {
		lat : Number(latlng[0]),
		lng : Number(latlng[1])
	};

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
					let data = {
						lat : crd.latitude.toString(),
						lng : crd.longitude.toString()
					};
					await axios
						.post(`${BackEndUrl}/users/location/${localStorage.getItem('user')}`, data)
						.then((res) => res.data)
						.then((data) => console.log(data));
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

	return (
		<div className="RoadDescription">
			<h1>{road.name}</h1>
			<button onClick={getLocation}>Get Location</button>
			<div className="RoadDescription-map-and-details">
				<div className="RoadDescription-details">
					<table>
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
								<td>{ovarallRating} / 10</td>
							</tr>
							<tr>
								<td>Difficulty Rating:</td>
								<td>{difficultyRating} / 10</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="RoadDescription-map">
					<LoadScript googleMapsApiKey="AIzaSyC6fJWNJtLwVCChnqRDrhCmPeLtOn5-wMk">
						<GoogleMap mapContainerStyle={mapStyles} zoom={15} center={defaultCenter}>
							<KmlLayer
								url="https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=17EJOcSANg7JpUX_qoPOhTdz0ATXCDY9F"
								options={{ preserveViewport: true }}
							/>
						</GoogleMap>
					</LoadScript>
				</div>
			</div>
			<div className="RoadDescription-description">
				<h3 className="RoadDescription-description-h3">Description</h3>
				<p className="RoadDescription-description-p">{road.description}</p>
			</div>
			<div className="RoadDescription-RatingForm">{!alreadyRated ? <RatingForm road_id={id} /> : <div />}</div>
			<div className="RoadDescription-rating">
				<h3>Ratings</h3>
				{renderRatingCards(ratings)}
			</div>
		</div>
	);
}

export default RoadDescription;
