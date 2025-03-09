import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    // Fetch camera data from the backend
    axios.get('http://127.0.0.1:5001/cameras')
      .then(response => {
        setCameras(response.data);
      })
      .catch(error => {
        console.error('Error fetching camera data:', error);
      });
  }, []);

  return (
    <div>
      <h1>VisionX Cameras</h1>
      <ul>
        {cameras.map(camera => (
          <li key={camera.id}>
            <strong>{camera.name}</strong> - {camera.ip_address} ({camera.status})
          </li>
        ))}
      </ul>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-hls';

function App() {
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    // Fetch camera data from the backend
    axios.get('http://127.0.0.1:5001/cameras')
      .then(response => {
        setCameras(response.data);
      })
      .catch(error => {
        console.error('Error fetching camera data:', error);
      });
  }, []);

  // Initialize video player for each camera
  useEffect(() => {
    cameras.forEach(camera => {
      const player = videojs(`video-${camera.id}`, {
        controls: true,
        autoplay: true,
        preload: 'auto',
      });
      player.src({
        src: camera.rtsp_url, // Replace with the actual HLS stream URL
        type: 'application/x-mpegURL',
      });
    });
  }, [cameras]);

  return (
    <div>
      <h1>VisionX Cameras</h1>
      <ul>
        {cameras.map(camera => (
          <li key={camera.id}>
            <strong>{camera.name}</strong> - {camera.ip_address} ({camera.status})
            <video
              id={`video-${camera.id}`}
              className="video-js vjs-default-skin"
              controls
              preload="auto"
              width="640"
              height="360"
            ></video>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function App() {
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    // Fetch camera data from the backend
    axios.get('http://127.0.0.1:5001/cameras')
      .then(response => {
        setCameras(response.data);
      })
      .catch(error => {
        console.error('Error fetching camera data:', error);
      });
  }, []);

  return (
    <div>
      <h1>VisionX Cameras</h1>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {cameras.map(camera => (
          <Marker key={camera.id} position={[camera.latitude, camera.longitude]}>
            <Popup>
              <strong>{camera.name}</strong> - {camera.ip_address} ({camera.status})
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;