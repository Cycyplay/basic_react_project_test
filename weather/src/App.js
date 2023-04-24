import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
const WEATHER_API_KEY = "10e295f3e3f3b5cdde7ea86fc5c6d5b2";

function App() {
    const [lat, setLat] = useState(10);
    const [lon, setLon] = useState(40);
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.watchPosition(function (position) {
                setLat(position.coords.latitude);
                setLon(position.coords.longitude);
            });
        } else {
            /* la géolocalisation n'est pas disponible */
        }
    }, [])


    const getWeather = (lat, lon) => {
        // votre code
    }
    // le but de l'exercice est d'afficher la météo du jour en fonction des coordonées GPS récuperées au dessus. 

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
