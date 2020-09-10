// //set up dependencies
const express = require("express");
const redis = require("redis");
const axios = require("axios");
const cors = require("cors");


//setup port constants
const port_redis = process.env.PORT || 6379;
const port = process.env.PORT || 5000;

//configure redis client on port 6379
const redis_client = redis.createClient(port_redis);

//configure express server
const app = express();

app.use(cors());


//Middleware Function to Check Cache
const checkCache = (req, res, next) => {
  const { searchTerms } = req.query
  // console.log(searchTerms)
  let id = searchTerms.replace(/[^A-Z0-9]/ig, "_");
  redis_client.get(id, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    //if no match found
    if (data != null) {
      res.send(data);
    } else {
      //proceed to next middleware function
      next();
    }
  });
};


//  Endpoint:  GET /search/repositories
//  @desc Return github data for particular search term
app.get("/search/repositories", checkCache, async (req, res) => {
  try {
    const { searchTerms, searchScore, searchStars, searchLang} = req.query
    console.log(searchTerms)
    const githubInfo = await axios.get(
      `https://api.github.com/search/repositories?q=${searchTerms}+language=${searchLang}&sort=${searchStars}&sort=${searchScore}`
    );

    //get data from response
    const githubSearchData = githubInfo.data;
    
    let id = searchTerms.replace(/[^A-Z0-9]/ig, "_");
    //add data to Redis
    redis_client.setex(id, 3600, JSON.stringify(githubSearchData));

    return res.json(githubSearchData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.listen(port, () => console.log(`Server running on Port ${port}`));