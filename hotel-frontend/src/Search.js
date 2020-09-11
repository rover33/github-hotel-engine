import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Search.css";


const Search = () => {
  const [query, setQuery] = useState("");
  const [starSort, setStarSort ] = useState("");
  const [score, setScore ] = useState("");
  const [items, setItems] = useState([]);
  const [languages, setLanguages] = useState("");


  useEffect(() => {
    let isCancelled = true;
    if (!query) return;
    
    console.log(starSort)

    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5000/search/repositories?searchTerms=${query}&searchLang=${languages}&searchStars=${starSort}&searchScore=${score}&order=desc`
        
      );
      const items = await response.json();
      if (isCancelled) setItems(items.items);

      console.log(starSort)
    };
    fetchData();

    return () => {
      isCancelled = false;
    };
  }, [query, languages, starSort, score])




  const handleChange = (e) => {
      setItems([]);
      setStarSort("")
      setLanguages("")
      setScore("")
      setQuery(e.target.value);
    }
  

    const checkBoxStarClick = (e) => {
      setStarSort("stars");
    }

    const checkSearchScoreClick = () => {
      setScore("1")
    }

    const checkBoxLanguageClick = (e) => {
      setLanguages("python")
    }

    const checkBoxLanguageJSClick = () => {
      setLanguages("javascript")
    }

  const renderItems = () => {
    if (!items || items.length <= 0 ) return
      return items.map((item) => {
        // console.log(item.name)
        return (
        <div key={item.id} className="searchList">
          <li className="listResults">
            Name: {item.name}
            <br />
            <br />
            Language: {item.language}
            <br /> 
            <br />
            Stars: {item.stargazers_count}
            <br />
            <br />
            Score: {item.score}
            <br />
            <br />
            Forks: {item.forks}
            <br />
            <br />
            <NavLink to="/Details">
              Details
            </NavLink>
          </li>
        </div>
        )
    })
  }


  return (
      <div>
        <h1 className="header">Github Search</h1>
        <div className="gitSearchDiv"> 
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
        </div>
        <div className="checkBoxes">
          <div className="starsContainer">
            Sort By:
            <br/>
            <br/>
            <label>Stars:</label>
            <input
              className="starbox"
              type="checkbox"
              id="stars"
              name="stars"
              onClick={checkBoxStarClick}
            >
            </input>
            <label>Score:</label>
            <input
              className="starbox"
              type="checkbox"
              id="score"
              name="score"
              onClick={checkSearchScoreClick}
            >
            </input>
          </div>
          <br/>
          <br/>
          <div className="langCheckBoxes">
            Languages: 
            <br/>
            <br/>
            <label>Python</label>
            <input
              className="langCheck"
              type="checkbox"
              id="Python"
              name="Python"
              onClick={checkBoxLanguageClick}
            >
            </input>
            <label>JavaScript</label>
            <input
              className="langCheck"
              type="checkbox"
              id="JavaScript"
              name="JavaScript"
              onClick={checkBoxLanguageJSClick}
            >
            </input>
          </div>
        </div>
        <div className="gitList">
          {renderItems()}
        </div>
      </div>
    );
  };


export default Search;

