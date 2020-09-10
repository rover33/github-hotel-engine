import React, { useState, useEffect } from "react";


const Search = () => {
  // const [status, setStatus] = useState('idle')
  const [query, setQuery] = useState("")
  const [items, setItems] = useState([]);

  useEffect(() => {
    // console.log("hello")
    if (!query) return console.log("no query");

    const fetchData = async () => {
      // setStatus('fetching');
      const response = await fetch(
        `http://localhost:5000/search/repositories?searchTerms=${query}`
      );
      const items = await response.json();
      console.log(items)
      setItems(items.items);
      console.log("hello")
      console.log(items.items)
      // setStatus('fetched')
    };
    fetchData()
  }, [query])




  // const handleSubmit = (e) => {

  //   console.log(e.currentTarget.value)
    
  //   e.preventDefault();

  //   console.log(e.target.value)

  //   const query = e.target.value;

  //   if(query) {
  //     setItems([])
  //     setSearchString(query);
  //     e.target.value = ""
  //   }

  // }

  // const onChange = e => {
  //   console.log(e.target.value)
  //       setItems([])
  //       setSearchString(e.target.value)
  //     }

    const handleChange = (e) => {
        setItems([]);
        setQuery(e.target.value);
      }
      
      const handleSubmit = (e) => {
        e.preventDefault();
        // fetch search results
      }



  const renderItems = () => {
    // console.log(items)
    if (!items || items.length <= 0 ) return
    return items.map((item) => {
      // console.log(item.name)
      return <li key={item.id}>Name: {item.name}, Stars: {item.stargazers_count}</li>
  })
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
          <ul>
            {renderItems()}
          </ul>
        </div>
      );
  };


export default Search;

