import React, { useState, useEffect } from "react";
import { useHistory, Route, Router, Link, NavLink } from "react-router-dom";
import Details from "./Details";


const Search = () => {
  const history = useHistory();
  const [query, setQuery] = useState("");
  const [starSort, setStarSort ] = useState({
    stars: false
  });
  const [score, setScore ] = useState("");
  const [items, setItems] = useState([]);
  const [languages, setLanguages] = useState({
    JavaScript: false,
    Python: false, 
    Ruby: false,
    Java: false,
    Swift: false
  });

  useEffect(() => {
    // console.log("hello")
    if (!query) return;

    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5000/search/repositories?searchTerms=${query}`
        // `http://localhost:5000/search/repositories?searchTerms=${query}+searchLang:${languages}&searchStars=${starSort}&searchScore=${score}`
      );
      const items = await response.json();
      setItems(items.items);
    };
    fetchData()
  }, [query, languages, starSort, score])




  const handleChange = (e) => {
      setItems([]);
      setQuery(e.target.value);
    }
  
  const checkBoxLanguageClick = e => {
    let tempLanguage = { ...languages };
    if (tempLanguage[e.target.name] !== languages[e.target.name]);
    setLanguages(tempLanguage);
  };

  const checkBoxStarClick = e => {
    let tempStars = {...starSort };
    if (tempStars[e.target.name] !== starSort[e.target.name]) return;
    setStarSort(tempStars);
  }

  const checkIfType = (arr1, arr2) => {
    return arr1.some(item => arr2.includes(item))
  }

  const handleClick = (e) => {
    history.push("/Details")
  }


  const renderItems = () => {
    let { Python, JavaScript, Ruby, Java, Swift} = languages;
    let { stars } = starSort;
    let tempArr = new Set();
    let langArr = [];
    let starArr = [];
    if (Python) langArr.push("Python");
    if (JavaScript) langArr.push("JavaScript");
    if (Java) langArr.push("Java")
    if (Ruby) langArr.push("Ruby");
    if (Swift) langArr.push("Swift")
    if ( stars ) starArr.push("stars")
    if(
      langArr.length <= 0 && starArr.length <= 0 && query.length <= 0){
      tempArr = items;
    } else {
      for (let i = 0; i < items.length; i++) {
        if (
          query.length > 0 && items[i].name.toLowerCase().includes(query)) {
            tempArr.add(items[i]);
          }
        if (langArr.length > 0 && checkIfType(langArr, items[i].language)){
          tempArr.add(items[i])
        }
        if (starArr.length > 0 && checkIfType(starArr, items[i].stargazers_count)){
          tempArr.add(items[i])
        }
      }
    }

    tempArr = Array.from(tempArr)

    return (
      <ul>
      {tempArr.map (el => (
        <div key={el.id}>
          <li>Name: {el.name}, Stars: {el.stargazers_count}, Language: {el.language}</li>
          {/* <button onClick={handleClick}>View Details</button> */}
          <NavLink exact to="/Details">
            Details
          </NavLink>
        </div>
      ))}
      </ul>
    )
  }


  return (
      <div>
        <h1 className="header">Github Search</h1>
        <form className="Form">
          <input
              type="text"
              autoFocus
              className="gitSearch"
              placeholder="search repo"
              onChange={handleChange}
              value={query}
            />
        </form>
        <div className="checkBoxes">
          <div>
            Sort By:
            <br/>
            <label>Stars:</label>
            <input
              type="checkbox"
              id="stars"
              name="stars"
              onClick={e => checkBoxStarClick(e)}
            >
            </input>
            <label>Score:</label>
            <input
              type="checkbox"
              id="score"
              name="score"
              // onClick={e => checkBoxTypeClick(e)}
            >
            </input>
          </div>
          <br/>
          <br/>
          <div className="langCheckBoxes">
            Languages: 
            <br />
            <label>Python</label>
            <input
              type="checkbox"
              id="Python"
              name="Python"
              onClick={e => checkBoxLanguageClick(e)}
            >
            </input>
            <label>JavaScript</label>
            <input
              type="checkbox"
              id="JavaScript"
              name="JavaScript"
              // onClick={e => checkBoxLanguageClick(e)}
            >
            </input>
            <label>Ruby</label>
            <input
              type="checkbox"
              id="Ruby"
              name="Ruby"
              // onClick={e => checkBoxLanguageClick(e)}
            >
            </input>
            <label>Swift</label>
            <input
              type="checkbox"
              id="Swift"
              name="Swift"
              // onClick={e => checkBoxLanguageClick(e)}
            >
            </input>
            <label>Java</label>
            <input
              type="checkbox"
              id="Java"
              name="Java"
              // onClick={e => checkBoxLanguageClick(e)}
            >
            </input>
          </div>

        </div>
        <ul>
          {renderItems()}
        </ul>
      </div>
    );
  };


export default Search;

