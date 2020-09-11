import React, { useState, useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";


const Search = () => {
  const history = useHistory();
  const [query, setQuery] = useState("");
  const [starSort, setStarSort ] = useState("");
  const [score, setScore ] = useState("");
  const [items, setItems] = useState([]);
  const [languages, setLanguages] = useState("");

  useEffect(() => {
    // console.log("hello")
    if (!query) return;

    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5000/search/repositories?searchTerms=${query}+searchLang:${languages}&searchStars=${starSort}+${score}&order=desc`
        
      );
      const items = await response.json();
      setItems(items.items);
    };
    fetchData()
  }, [query, languages, starSort])




  const handleChange = (e) => {
      setItems([]);
      setQuery(e.target.value);
    }
  

    // const checkBoxLanguageClick = e => {  
    //   setLanguages(languages)
    // }

    const checkBoxStarClick = e => {
      setStarSort("stars");
    }
  // const checkBoxLanguageClick = e => {
  //   let tempLanguage = { ...languages };
  //   if (tempLanguage[e.target.name] !== languages[e.target.name]);
  //   setLanguages(tempLanguage);
  // };

  // const checkBoxStarClick = e => {
  //   let tempStars = {...starSort };
  //   if (tempStars[e.target.name] !== starSort[e.target.name]) return;
  //   setStarSort(tempStars);
  // }


  const renderItems = () => {
    if (!items || items.length <= 0 ) return
      return items.map((item) => {
        // console.log(item.name)
        return (
        <div key={item.id}>
          <li>Name: {item.name}, Stars: {item.stargazers_count}, Language: {item.language}</li>
            <NavLink to="/Details">
              Details
            </NavLink>
        </div>
        )
    })
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
              onClick={checkBoxStarClick}
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
              // onClick={e => checkBoxLanguageClick(e)}
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

