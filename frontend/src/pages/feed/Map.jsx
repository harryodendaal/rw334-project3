import { Link } from "react-router-dom";
import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "./map.css";

export const Map = (props) => {

    useEffect(() => {
        console.log('Map data');
        props.data.forEach(post => {
            console.log(post.location.coordinates);
        });
    
    }, [props.data]);

    return (
        <MapContainer center={[props.data[0].location.coordinates[0], props.data[0].location.coordinates[1]]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.data?.map((post) => (
            <>
            <Marker position={[post.location.coordinates[0], post.location.coordinates[1]]}>
                <Popup>
                <Link to={`/post/${post.id}`}>{post.title}</Link> <br />
                By: {post.user} <br />
                Group: {post.group} <br />
                Category: {post.category} <br />
                
                </Popup>
            </Marker>
            </>
        ))}
        
        </MapContainer>
    )
}

/* <Marker position={[51.505, -0.09]}>
    <Popup>
    A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
</Marker> */