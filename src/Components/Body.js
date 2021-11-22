import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import "../Styles/Body.css"
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@emotion/react";
var moment = require('moment'); // require
moment().format(); 

const Body = () => {
   const [cityName, setCityName] = useState("");
   const [cityInfo, setCityInfo] = useState("");
   const [input, setInput] = useState("");

   const getCityInfo = () => {
      console.log(cityName);
      axios.get("https://api.openweathermap.org/data/2.5/weather?q="+
         cityName+"&units=imperial&appid=9602f3c62c4c8d378cca9c712e07349f")
         .then(response => {
            setCityInfo(response);
            console.log(response);
         })
         .catch((err)=>console.log(err)); 
      setCityName("");
   }

   const theme = createTheme({
      palette: {
         primary: {
            main: '#FFB703',
         },
         neutral: {
            main: '#219EBC'
         }
      }
    });

    useEffect(() => {
      getCityInfo();
    }, [cityName])

   return (
      <div>
         <div class="input">
            <input value={input} onChange={e => setInput(e.target.value)} />
         </div>
         <h6>Enter a city name here to look up its current weather</h6>
         <div class="button">
         <ThemeProvider theme ={theme}>
            <Button onClick={() => {setCityName(input)}} variant="contained" color="primary"> Search! </Button> {/* intermediate state to prevent useEffect w dependency from running */}
         </ThemeProvider>         
         </div>
         <div class = "cities">
         <ThemeProvider theme ={theme}>
            <Button onClick={() => {setCityName('charlottesville')}} variant="contained" color="neutral"> Cville! </Button>
         </ThemeProvider> 
         <ThemeProvider theme ={theme}>
            <Button onClick={() => {setCityName('new york city')}} variant="contained" color="neutral"> NYC! </Button>
         </ThemeProvider> 
         <ThemeProvider theme ={theme}>
            <Button onClick={() => {setCityName('toronto')}} variant="contained" color="neutral"> Toronto! </Button>
         </ThemeProvider> 
         </div>
         {(typeof cityInfo.data != 'undefined') ? ( 
         <div class="cityData"> 
            <h3>City: {cityInfo.data.name}</h3>
            <p>Temprature: {cityInfo.data.main.temp} &deg;F</p>
            <p>Sunrise: {new Date(cityInfo.data.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
            <p>Sunset: {new Date(cityInfo.data.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
            <p>Description: {cityInfo.data.weather[0].main}</p>
            <p>Humidity: {cityInfo.data.main.humidity} %</p>
            <p>Day: {moment().format('dddd')}</p>
            <p>Date: {moment().format('LL')}</p>
         </div>
      ): (
        <div></div>
      )}
      </div>
   )
}

export default Body
