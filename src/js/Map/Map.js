import { GoogleMap, KmlLayer, LoadScript } from '@react-google-maps/api';
import React, { useState } from 'react';
import { useEffect } from 'react';

function Map () {
	const [ location, setLocation ] = useState({
		lat : 38.8320083404165,
		lng : -104.8422776269326
	});

	useEffect(() => {
		const getLocation = () => {
			if (localStorage.getItem('location')) {
				const userLocation = localStorage.getItem('location').split(', ');
				const locationDic = {
					lat : Number(userLocation[0]),
					lng : Number(userLocation[1])
				};
				console.log(locationDic);
				setLocation(locationDic);
			}
		};
		getLocation();
	}, []);

	const mapStyles = {
		height : '100vh',
		width  : '100%'
	};
	return (
		<LoadScript googleMapsApiKey="AIzaSyC6fJWNJtLwVCChnqRDrhCmPeLtOn5-wMk">
			<GoogleMap mapContainerStyle={mapStyles} zoom={13} center={location}>
				<KmlLayer
					url="https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=17EJOcSANg7JpUX_qoPOhTdz0ATXCDY9F"
					options={{ preserveViewport: true }}
				/>
			</GoogleMap>
		</LoadScript>
	);
}

export default Map;
