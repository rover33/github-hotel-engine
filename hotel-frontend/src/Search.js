import React, { useState, useEffect } from "react";


const Search = () => {
  // const [status, setStatus] = useState('idle')
  const [query, setQuery] = useState("")
  const [items, setItems] = useState([]);

  useEffect(() => {
    // console.log("hello")
    // if (!query) return console.log("no query");

    const fetchData = async () => {
      // setStatus('fetching');
      const response = await fetch(
        `http://localhost:5000/search/repositories?q=${query}`
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
  //     setQuery(query);
  //     e.target.value = ""
  //   }

  // }

  // const onChange = e => {
  //   console.log(e.target.value)
  //       setItems([])
  //       setQuery(e.target.value)
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

// import useInfiniteScroll from 'react-infinite-scroll-hook';


// const Search = () => {
//   const [searchString, setSearchString] = useState("");
//   const [items, setItems] = useState([]);
//   const [hasNextPage, setHasNextPage] = useState(false);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [star, setStar] = useState()


//   const handleLoadMore = () => {

//     setLoading(true);
//     fetch(
//       `http://localhost:5000/search/repositories?q=${searchString}`
//       // `https://api.github.com/search/repositories?q=${searchString}`
//     )
//     .then(res => res.json())
//     .then(res => {
//       //  console.log(res)
//        setLoading(false);
//        let total = res.total_count
//        let current = page * 30;
//        let hasNextPage = (current <= total);
//        setHasNextPage(hasNextPage);
//       //  setHasNextPage(false)
//        setItems([...items, res.items]);
//       //  console.log(items)
//        setStar(star)
//        setPage(page+1)
//     })
//     .catch(() => {
//       console.log("stop it");
//       setLoading(false);
//     });
//   }

//   const infiniteRef = useInfiniteScroll({
//     loading,
//     hasNextPage,
//     onLoadMore: handleLoadMore,
//     // scrollContainer,
//   });

//   const renderItems = () => {
//     if (!items || items.length <= 0 ) return
//     return items[0].map((item) => {
//       // console.log(item.name)
//       return <li key={item.id}>Name: {item.name}, Stars: {item.stargazers_count}</li>
//   })
// }

//   let onChange = e => {
//     setItems([])
//     setPage(0)
//     setHasNextPage(true)
//     setSearchString(e.target.value)
//   }

//   let handleSort = () => {
//     // fetch(`http://localhost:4000/search/repositories?&sort=stars&order=desc`)
//   }

//   let handleClick = () => {
//     alert("clicked")
//   }

//   return (
//     <div>
//       <h1 className="header">Github Search</h1>
//       <div className="gitSearchDiv">
//         <input
//           type="search"
//           className="gitSearch"
//           placeholder="search repo"
//           onChange={e => onChange(e)}
//         />
//         {/* <button onClick={handleSort()}>Sort</button> */}
//       </div>
//        <ul ref={infiniteRef} onClick={handleClick}>
//         {renderItems()}
//         {/* {loading && <li>Loading...</li>} */}
//       </ul>
//     </div>
//   );
// };
