import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";


const Locations = withScriptjs(
    withGoogleMap(({ locations }) => {
        return (
            <GoogleMap defaultZoom={8} defaultCenter={{ lat: locations[0].latitude, lng: locations[0].longitude }}>
                {locations.map((loc, index) => {
                    return <Marker key={`map-${index}`} position={{ lat: loc.latitude, lng: loc.longitude }} />;
                })}
            </GoogleMap>
        );
    })
);


const Map = ({locations}) => {
    return <React.Fragment>
        {locations && <Locations locations={locations} googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCaDWprWjvMQj4_ovrYC1ugoe0OoG-OILI&v=3.exp&libraries=geometry,drawing,places" loadingElement={<div style={{ height: `100%` }} />} containerElement={<div style={{ height: `400px` }} />} mapElement={<div style={{ height: `100%` }} />} />}
    </React.Fragment>
}

export default Map;