// //set up dependencies
// const express = require("express");
// const redis = require("redis");
// const axios = require("axios");
// const bodyParser = require("body-parser");

// //setup port constants
// const port_redis = process.env.PORT || 6379;
// const port = process.env.PORT || 5000;


// //configure redis client on port 6379
// const redis_client = redis.createClient(port_redis);


// //configure express server
// const app = express();


// //Body Parser middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());


// //Middleware Function to Check Cache
// const set = (key, value) => {
//     redis_client.setex(key, 3600, JSON.stringify(githubSearchData));
//  }

// const get = (req, res, next) => {
// 	let key = req.route.path;
//     redis_client.get(key, (error, data) => {
//       if (error) res.status(400).send(err);
//       if (data !== null) res.status(200).send(JSON.parse(data));
//       else next();
//  	});
// }



// app.get("/search/repositories", get, async (req, res) => {
//   try {
//     const { id, searchString } = req.params;
//     const githubInfo = await axios.get(
//       `https://api.github.com/search/repositories?q=${searchString}`
//     );

//     //get data from response
//     const githubSearchData = githubInfo.data;
//     console.log(githubSearchData)

//     //add data to Redis
//     //redis_client.setex(githubInfo.data.id, 3600, JSON.stringify(githubSearchData));
//     return res.json(githubSearchData);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json(error);
//   }
// });

// app.listen(port, () => console.log(`Server running on Port ${port}`));

"use strict";
const express = require("express");  
const fetch = require("node-fetch");
const redis = require("redis");
const PORT = process.env.PORT || 4000;
const PORT_REDIS = process.env.PORT || 6379;
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
app.get("/search/repositories", get, (req, res) => {
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