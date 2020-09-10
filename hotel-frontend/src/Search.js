import React, { useState, useEffect } from "react";


const Search = () => {
  const [query, setQuery] = useState("");
  const [stars, setStars ] = useState();
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
        `http://localhost:5000/search/repositories?searchTerms=${query}&numStars=${stars}`
      );
      const items = await response.json();
      setItems(items.items);
      setStars(items.stars)
      console.log(items.langauge)
    };
    fetchData()
  }, [query, stars])




  const handleChange = (e) => {
      setItems([]);
      setStars(stars)
      setQuery(e.target.value);
    }
      
  const handleSubmit = (e) => {
      e.preventDefault();
      // fetch search results
    }

  const checkBoxTypeClick = e => {
    setStars(stars)
  }
  
  const checkBoxLanguageClick = e => {
    let tempLanguage = { ...languages };
    tempLanguage[e.target.language] != languages[e.target.langauge];
    setLanguages(tempLanguage);
  };

  const checkIfType = (arr1, arr2) => {
    return arr1.some(item => arr2.includes(item))
  }



  const renderItems = () => {
    let { Python, JavaScript, Ruby, Java, Swift} = languages;
    let tempArr = new Set();
    let langArr = [];
    if (Python) langArr.push("Python");
    if (JavaScript) langArr.push("JavaScript");
    if (Java) langArr.push("Java")
    if (Ruby) langArr.push("Ruby");
    if (Swift) langArr.push("Swift")
    if(langArr.length <= 0 && query.length <= 0 ){
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
      }
    }

    tempArr = Array.from(tempArr)

    return (
      <ul>
      {tempArr.map (el => (
        <div key={el.id}>
          <li>Name: {el.name}, Stars: {el.stargazers_count}, Language: {el.language}</li>
        </div>
      ))}
      </ul>
    )
  }



  return (
      <div>
        <h1 className="header">Github Search</h1>
        <form className="Form" onSubmit={handleSubmit}>
          <input
              type="text"
              autoFocus
              className="gitSearch"
              placeholder="search repo"
              onChange={handleChange}
              value={query}
            />
          <button>Search</button>
        </form>
        <div className="checkBoxes">
          <label>Sort by Stars</label>
          <input
            type="checkbox"
            id="stars"
            name="stars"
            onClick={e => checkBoxTypeClick(e)}
          >
          </input>
          <label>Sort by Score</label>
          <input
            type="checkbox"
            id="score"
            name="score"
            onClick={e => checkBoxTypeClick(e)}
          >
          </input>
          <label>Languages</label>
          <input
            type="checkbox"
            id="Python"
            name="Python"
            onClick={e => checkBoxLanguageClick(e)}
          >
          </input>

        </div>
        <ul>
          {renderItems()}
        </ul>
      </div>
    );
  };


export default Search;

