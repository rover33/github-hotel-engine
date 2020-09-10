"use strict";
const express = require("express");  
const fetch = require("node-fetch");
const redis = require("redis");
const PORT = process.env.PORT || 5000;
const PORT_REDIS = process.env.PORT || 6379;
// const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const redisClient = redis.createClient(PORT_REDIS);

app.use(cors());


const set = (key, value) => {
   redisClient.setex(key, 3600, JSON.stringify(value));
}

//add data to Redis
 const get = (req, res, next) => {
	let key = req.route.path;
    redisClient.get(key, (error, data) => {
      if (error) res.status(400).send(err);
      if (data !== null) res.status(200).send(JSON.parse(data));
      else next();
 	});
}


// //  Endpoint:  GET /search/repositories
// //  @desc Return github data for particular search term
app.get('/search/repositories', get, (req, res) => {
  const { searchString } = req.query
  console.log(req.query.q)
  // console.log(req.query.searchString)
  // console.log(searchString)
  // console.log(page)
  fetch(`https://api.github.com/search/repositories?q=${searchString}`)
    .then(res => res.json())
    .then(json => {
    	set(req.route.path, json);
    	res.status(200).send(json);
    })
    .catch(error => {
      console.error(error);
      res.status(400).send(error);
    });
});


app.listen(PORT, () => console.log(`Server up and running on ${PORT}`));


