const express = require('express');
const app = express();
const axios = require('axios');
const nodemon = require('nodemon');
const planetList = ["EARTH", "PLUTO", "SATURN", "MARS", "URANUS", "VENUS", "NEPTUNE", "JUPITER", "MERCURY"];
// Blast off!
app.use(express.static('public'));
​
// Parse the body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
​
// Bring in Handlebars
const exphbs = require('express-handlebars');
​
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
​
// Integrate routes
// const routes = require('/.js');
// app.use(routes);
​
// Allow server to grab any port, but set 7000 as standard default
const PORT = process.env.PORT ||8080;
​
function call_api(finishedAPI) {
    request('https://api.nasa.gov/planetary/apod?api_key=0uKX4xKAlZRAVq4uqHlrUTbiHmQ7et6zW7QvbAi6&hd=false', { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      if (res.statusCode === 200) {
        finishedAPI(body);
      };
    });
  };
​
  //multiple API calls
  const fetchApiInfo = async (url) => {
    console.log(`Fetching ${url}`)
    const astroInfo = await axios(url)
    return astroInfo;
  };
​
  const fetchAstroInfo = async (tickers) => {
    // const requests = tickers.map(() => {
      const url = `https://api.nasa.gov/planetary/apod?api_key=0uKX4xKAlZRAVq4uqHlrUTbiHmQ7et6zW7QvbAi6&hd=false`
      return fetchApiInfo(url)
        .then((res) => {
          return res
        })
    // })
    // return Promise.all(requests)
  };
​
  app.get('/astronomy', async function (req, res) {
      const data = await fetchAstroInfo();
      const results = {};
      results.response = data;
      console.log(results);
      res.render('astronomy', results);
    // }
  });
  
  // Create astro api/search
  app.post('/astronomy', async function (req, res) {
      var sp = await req.body.astroSearch.split(",");
      const data = await fetchAstroInfo(sp);
      const results = {};
      results.response = data;
      console.log(results);
      res.render('astronomy', results);
    // }
  });
​
​
  //Solar system API
​
  function solarSystem_api(solarApi) {
    request('https://api.le-systeme-solaire.net/rest/bodies?filter[]=id,eq,mars', { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      if (res.statusCode === 200) {
        solarSystem_api(body);
      };
    });
  };
​
  //multiple API calls
  const fetchSolarSystemInfo = async (url) => {
    console.log(`Fetching ${url}`)
    const solarInfo = await axios(url)
    return solarInfo;
  };
​
  const fetchSolarInfo = async (tickers) => {
    // const requests = tickers.map(() => {
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
        
  //   // })
  //   // return Promise.all(requests)
  // };
​
  app.get('/solar', async function (req, res) {
      const data = await fetchSolarInfo();
      const results = {};
​
      //it would still help us GREATLY if we could figure out how to use url parameters instead of .filter to only get planets
      results.bodies = data.data.bodies
      .filter(body => body.isPlanet && planetList.includes(body.englishName.toUpperCase()))
      .map(body => addImageURL(body));
​
      console.log(results.bodies);
​
      res.render('solar', results);
    // }
  });
  
  //eventually puth this in its own file
  function addImageURL(bodyObject) {
    let route;
    switch (bodyObject.englishName.toUpperCase()) {
      case "EARTH":
        route = "/images/earth.gif"
        break;
      case "MARS":
        route = "/images/mars.gif"
        break;
    }
    
    bodyObject.image_url = route;
​
    return bodyObject;
  }
​
​
  // Create astro api/search
  app.post('/solar', async function (req, res) {
      var sp = await req.body.solarSearch.split(",");
      const data = await fetchSolarInfo(sp);
      const results = {};
      results.response = data;
      console.log(results);
      res.render('solar', results);
    // }
  });
​
  // Start Server
app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost: ${PORT}`);
  });