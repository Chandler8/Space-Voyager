// const { Model } = require("sequelize/types");
const express = require('express');
const app = express();
const axios = require('axios');
const nodemon = require('nodemon');
const planetList = ["EARTH", "SATURN", "MARS", "URANUS", "VENUS", "NEPTUNE", "JUPITER", "MERCURY"];
const api_key = process.env.api_key;

// Exporting of module to server 
module.exports = function(app) {

    // Astronomy pic of the day API w/ GET and POST routes
function call_api(finishedAPI) {
    request('https://api.nasa.gov/planetary/apod?api_key=0uKX4xKAlZRAVq4uqHlrUTbiHmQ7et6zW7QvbAi6&hd=false', { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      if (res.statusCode === 200) {
        finishedAPI(body);
      };
    });
  };
//   Grabbing parsed JSON
    const fetchApiInfo = async (url) => {
    console.log(`Fetching ${url}`)
    const astroInfo = await axios(url)
    return astroInfo;
  };
  
  const fetchAstroInfo = async (tickers) => {
    const url = `https://api.nasa.gov/planetary/apod?api_key=0uKX4xKAlZRAVq4uqHlrUTbiHmQ7et6zW7QvbAi6&hd=false`
    return fetchApiInfo(url)
      .then((res) => {
        return res
      })
  };
  
//   Astro GET route
  app.get('/astronomy', async function (req, res) {
    const data = await fetchAstroInfo();
    const results = {};
    results.response = data;
    console.log(results);
    res.render('astronomy', results);
  });
  
  // Astro POST route
  app.post('/astronomy', async function (req, res) {
    var sp = await req.body.astroSearch.split(",");
    const data = await fetchAstroInfo(sp);
    const results = {};
    results.response = data;
    console.log(results);
    res.render('astronomy', results);
  });

  
  //Solar system API w/ GET and POST routes

function solarSystem_api(solarApi) {
    request('https://api.le-systeme-solaire.net/rest/bodies', { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      if (res.statusCode === 200) {
        solarSystem_api(body);
      };
    });
  };
  
//   Grabbing parsed JSON
  const fetchSolarSystemInfo = async (url) => {
    console.log(`Fetching ${url}`)
    const solarInfo = await axios(url)
    return solarInfo;
  };
  
  const fetchSolarInfo = async (tickers) => {
    const url = `https://api.le-systeme-solaire.net/rest/bodies`
    return fetchSolarSystemInfo(url)
      .then((res) => {
        return res
      })
      .catch(err => {
        console.log(err);
      }
      )
  }
  
//   Solar GET route
  app.get('/solar', async function (req, res) {
    const data = await fetchSolarInfo();
    const results = {};
  
    //it would still help us GREATLY if we could figure out how to use url parameters instead of .filter to only get planets
    results.bodies = data.data.bodies
      .filter(body => body.isPlanet && planetList.includes(body.englishName.toUpperCase()))
    // .map(body => addImageURL(body));
  
    console.log(results.bodies);
  
    res.render('solar', results);
  
  });
  
  
  // Solar POST route
  app.post('/solar', async function (req, res) {
    var sp = await req.body.solarSearch.split(",");
    const data = await fetchSolarInfo(sp);
    const results = {};
    results.response = data;
    console.log(results);
    res.render('solar', results);
    // }
  });
}

// ISS API
