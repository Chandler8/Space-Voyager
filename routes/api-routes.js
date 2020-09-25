// const { Model } = require("sequelize/types");
const express = require('express');
const app = express();
const axios = require('axios');
const nodemon = require('nodemon');
const { request } = require('express');
const planetList = ["EARTH", "SATURN", "MARS", "URANUS", "VENUS", "NEPTUNE", "JUPITER", "MERCURY"];
const api_key = process.env.api_key;
// const L = require('leaflet');
// console.log(L);
// Exporting of module to server //

module.exports = function(app) {


// Home Page

    //   Home GET route
    app.get('/', (req, res) => {
      res.redirect('/register');
    });
  
  app.get('/register', (req, res) => {
    res.render('register')
});

// Register Route
  
// Register GET route
  app.get('/home', (req, res) => {
    res.render('home')
});

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
      .map(body => addImageURL(body));
    //we can order our array (for example, by distance from the sun) any way we want before the below line of code
    results.bodies[0].active = true;
  
    console.log(results.bodies);
  
    res.render('solar', results);
  
  });

  // Solar switch case

function addImageURL(bodyObject) {
  let route;
  switch (bodyObject.englishName.toUpperCase()) {
    case "EARTH":
      route = "/images/earth.jpg"
      break;
    case "MARS":
      route = "/images/mars-1.jpg"
      break;
    case "SATURN":
      route = "/images/saturn.jpg"
      break;
    case "URANUS":
      route = "/images/uranus.webp"
      break;
    case "NEPTUNE":
      route = "/images/neptune.jpg"
      break;
    case "JUPITER":
      route = "/images/jupiter-1.jpg"
      break;
    case "VENUS":
      route = "/images/venus.jpg"
      break;
    case "MERCURY":
      route = "/images/mercury-1.jpg"
      break;
  }

  bodyObject.image_url = route;

  return bodyObject;
}

  
  
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


// ISS API
  
//   ISS GET route
  app.get('/iss', (req, res) => {
    // const data = fetchIntInfo();
    // results.response = data;
    // console.log(results);
    res.render('iss');
  });
  

// Mars Page

function mars_api(marsAPI) {
    request('https://api.nasa.gov/insight_weather/?api_key=0uKX4xKAlZRAVq4uqHlrUTbiHmQ7et6zW7QvbAi6&feedtype=json&ver=1.0', { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      if (res.statusCode === 200) {
        marsAPI(body);
      };
    });
  };
//   Grabbing parsed JSON
    const fetchMarsInfo = async (url) => {
    console.log(`Fetching ${url}`)
    const marsInfo = await axios(url)
    return marsInfo;
  };
  
  const fetchMartianInfo = async (tickers) => {
    const url = `https://api.nasa.gov/insight_weather/?api_key=0uKX4xKAlZRAVq4uqHlrUTbiHmQ7et6zW7QvbAi6&feedtype=json&ver=1.0`
    return fetchMarsInfo(url)
      .then((res) => {
        return res
      })
  };
  
//   Mars GET route
  app.get('/mars', async function (req, res) {
    const data = await fetchMartianInfo();
    const results = {};
    results.response = data;
    console.log(results);
    res.render('mars', results);
  });
  
  // Mars POST route
  app.post('/mars', async function (req, res) {
    var sp = await req.body.marsSearch.split(",");
    const data = await fetchMartianInfo(sp);
    const results = {};
    results.response = data;
    console.log(results);
    res.render('mars', results);
  });


// 5th feature page (Maybe NASA image gallery page, or the models page, TBD)
function photo_api(picAPI) {
    request('https://images-api.nasa.gov/search?q={q}', { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      if (res.statusCode === 200) {
        picAPI(body);
      };
    });
  };
//   Grabbing parsed JSON
    const fetchPhotographInfo = async (url) => {
    console.log(`Fetching ${url}`)
    const pngInfo = await axios(url)
    return pngInfo;
  };
  
  const fetchPicInfo = async (tickers) => {
    const url = `https://images-api.nasa.gov/search?q={q}`
    return fetchPhotographInfo(url)
      .then((res) => {
        return res
      })
  };
  
//   Gallery GET route
  app.get('/gallery', async function (req, res) {
    const data = await fetchPicInfo();
    const results = {};
    results.response = data;
    console.log(results);
    res.render('gallery', results);
  });
  
  // Gallery POST route
  app.post('/gallery', async function (req, res) {
    var sp = await req.body.marsSearch.split(",");
    const data = await fetchPicInfo(sp);
    const results = {};
    results.response = data;
    console.log(results);
    res.render('gallery', results);
  });


  // FOR THE LOVE OF GOD AND ALL THAT IS HOLY, DONT DO THIS!!!!!!

  // app.get('*', (req, res) => {
  //   //if the user types in a route that doesn't exist, send a 404 page
  //   //(we need to create a 404.handlebars file)
  //   res.render('404')
  // });

}

// "https://images-api.nasa.gov/search?q=apollo%2011&description=moon%20landing&media_type=image"
