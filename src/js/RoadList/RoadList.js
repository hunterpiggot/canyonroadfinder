import React, { useEffect, useState } from 'react';
import axios from 'axios';

import BackEndUrl from '../RouteUrls';
import RoadCard from './RoadCard';

function RoadList () {
	const [ roads, setRoads ] = useState([]);
	const [ userRoadStatus, setUserRoadStatus ] = useState([]);
	useEffect(() => {
		const getRoads = async () => {
			const res = await axios(`${BackEndUrl}/roadlist`);
			setRoads(res.data.roads);
		};
		const getUsersTaggedRoads = async () => {
			const res = await axios(`${BackEndUrl}/users/${localStorage.getItem('user')}/roads`);
			setUserRoadStatus(res.data.roads);
		};
		getUsersTaggedRoads();
		getRoads();
	}, []);

	const renderRoadCards = (roads) => {
		const roadList = roads.map((r) => {
			let status = [];
			for (let road of userRoadStatus) {
				if (road['road_id'] === r.id) {
					status = road['status'].split(', ');
				}
			}
			return (
				<RoadCard
					key={r.id}
					id={r.id}
					name={r.name}
					location={r.location}
					elevation_change={r.elevation_change}
					length={r.length}
					image={r.image}
					status={status}
				/>
			);
		});
		return roadList;
	};
	return (
		<div className="RoadList">
			<h1>Road List</h1>
			<div className="cards">{renderRoadCards(roads)}</div>
		</div>
	);
}

export default RoadList;
