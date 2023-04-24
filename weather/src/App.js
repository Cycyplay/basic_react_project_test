import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
const WEATHER_API_KEY = "10e295f3e3f3b5cdde7ea86fc5c6d5b2";

function App() {
    const [lat, setLat] = useState(10);
    const [lon, setLon] = useState(40);
    const [weatherData, setWeatherData] = useState(null);
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.watchPosition(function (position) {
                setLat(position.coords.latitude);
                setLon(position.coords.longitude);
                getWeather(lat, lon);
            });
        } else {
            /* la géolocalisation n'est pas disponible */
        }
    }, [])


    const getWeather = async (lat, lon) => {
        const apiCallUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=fr`;
        try{
            const apiResponse = await axios.get(apiCallUrl);
            
            setWeatherData(apiResponse.data);
        } catch(error){
            console.error(error);
        }
    }
    // le but de l'exercice est d'afficher la météo du jour en fonction des coordonées GPS récuperées au dessus. 

    const capitalizeWord = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    return (
        <div className="App">
            <header className="Header">
                <p>Test Quos - Météo</p>
            </header>
            { weatherData &&
                <div className="Weather">
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                    <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}></img>
                    <p>{capitalizeWord(weatherData.weather[0].description)}</p>
                    <p>{weatherData.main.temp}°C</p>
                </div>
            }
        </div>
    );
}

export default App;
