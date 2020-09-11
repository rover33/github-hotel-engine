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


// const baseUrl = "https://api.github.com/search/repositories?q="
// const query = `${searchTerms}+language:${searchLang}&sort=${searchStars}+${searchScore}`

// //encode query string
// const encodedQuery = encodeURIComponent(query);
// const url = baseUrl + encodedQuery
// console.log(url)

//Middleware Function to Check Cache
const checkCache = (req, res, next) => {
  let { searchTerms, searchStars, searchLang, searchScore } = req.query
  console.log(`SearchTerms: ${searchTerms}`)
  console.log(`SearchStars: ${searchStars}`)
  console.log(`SearchLang: ${searchLang}`)
  console.log(`SearchScore: ${searchScore}`)
  // const { searchTerms, searchLang, searchStars, searchScore } = req.query
  // console.log(searchTerms)
  searchTerms = searchTerms.replace(/[^A-Z0-9]/ig, "_");
  searchStars = searchStars.replace(/[^A-Z0-9]/ig, "_");
  // searchLang = searchLang.replace(/[^A-Z0-9]/ig, "_");
  // searchScore = searchScore.replace(/[^A-Z0-9]/ig, "_");
  console.log("+++++++++++++Cleaned Params++++++++++++")
  console.log(`SearchTerms: ${searchTerms}`)
  console.log(`SearchStars: ${searchStars}`)
  console.log(`SearchLang: ${searchLang}`)
  console.log(`SearchScore: ${searchScore}`)
  let id = searchTerms+searchStars
  console.log(`ID: ${id}`)
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
    const { searchTerms, searchStars, searchLang, searchScore} = req.query

    const baseUrl = "https://api.github.com/search/repositories?q="
    const query = `${searchTerms}+language:${searchLang}&sort=${searchStars}+${searchScore}`
    //encode query string
    const encodedQuery = encodeURIComponent(query);
    const url = baseUrl + encodedQuery
    console.log(url)
    console.log(searchTerms)
    console.log(searchStars)

    const githubInfo = await axios.get(
      url
      // &sort=${searchStars}+${searchScore}
    );

    //get data from response
    const githubSearchData = githubInfo.data;
    
    let id = searchTerms.replace(/[^A-Z0-9]/ig, "_");
    let stard = searchStars.replace(/[^A-Z0-9]/ig, "_");
    // let lang = searchLang.replace(/[^A-Z0-9]/ig, "_");
    // let score = searchScore.replace(/[^A-Z0-9]/ig, "_");
    let  clean = id + stard
    console.log(clean)
    //add data to Redis
    redis_client.setex(clean, 3600, JSON.stringify(githubSearchData));

    return res.json(githubSearchData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.listen(port, () => console.log(`Server running on Port ${port}`));