import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, updateLng, updateLat } from './counterSlice'

export const Map = (props) => {

    function LocationMarker(props) {
        const [position, setPosition] = useState(null);
        const positionlng = useSelector((state) => state.counter.lng);
        const positionlat = useSelector((state) => state.counter.lat);
        const dispatch = useDispatch();

        const map = useMapEvents({
            click(e) {
                if(props.locationSelect === 'custom-location') {
                    setPosition(e.latlng);
                    dispatch(updateLng(e.latlng.lng));
                    dispatch(updateLat(e.latlng.lat));
                }
            },
            locationfound(e) {
                if(props.locationSelect === 'current-location') {
                    setPosition(e.latlng);
                    map.flyTo(e.latlng, map.getZoom())
                    dispatch(updateLng(e.latlng.lng));
                    dispatch(updateLat(e.latlng.lat));
                }
                
            },
        });

        useEffect(() => {
            if(props.locationSelect === 'current-location') {
                map.locate();
            }
        }, [props.locationSelect]);

        return {'lat': positionlat, 'lng': positionlng} === null ? null : (
            <Marker position={{'lat': positionlat, 'lng': positionlng}}>
            <Popup>Post location</Popup>
            </Marker>
        )
    }

    return (
        <div >
        <MapContainer center={[-33, 18]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker locationSelect={props.locationSelect}/>
        </MapContainer >
        </div>
    )
}

/* <Marker position={[51.505, -0.09]}>
    <Popup>
    A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
</Marker> */