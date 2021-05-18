import { GoogleMap, KmlLayer, LoadScript } from '@react-google-maps/api';

function Map () {
	const mapStyles = {
		height : '100vh',
		width  : '100%'
	};
	const defaultCenter = {
		lat : 38.8320083404165,
		lng : -104.8422776269326
	};
	return (
		<LoadScript googleMapsApiKey="AIzaSyC6fJWNJtLwVCChnqRDrhCmPeLtOn5-wMk">
			<GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
				<KmlLayer
					url="https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=17EJOcSANg7JpUX_qoPOhTdz0ATXCDY9F"
					options={{ preserveViewport: true }}
				/>
			</GoogleMap>
		</LoadScript>
	);
}

export default Map;
