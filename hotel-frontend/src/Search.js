import React, { useState, useEffect } from "react";

let Search = () => {
  let [github, setGithub] = useState([]);
  let [searchString, setSearchString] = useState("");


  useEffect(() => {
    fetch(
      `http://localhost:4000/search/repositories?q=${searchString}`,
    )
      .then(res => res.json())
      .then(res => {
         setGithub(res);
      })
      .catch(() => {
        console.log("stop it");
      });
  }, [searchString]);

  
  let onChange = e => setSearchString(e.target.value);

  let renderSearch = (res) => {
    console.log("calling render github");

  };


  return (
    <div>
      <h1 className="header">Github Search</h1>
      <div className="gitSearchDiv">
        <input
          type="search"
          className="gitSearch"
          placeholder="search repo"
          onChange={e => onChange(e)}
        />
      </div>
      <div className="githubSearchList">{renderSearch()}</div>
    </div>
  );
};

export default Search;