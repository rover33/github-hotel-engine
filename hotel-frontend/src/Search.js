import React, { useState } from "react";
import useInfiniteScroll from 'react-infinite-scroll-hook';


const Search = () => {
  const [searchString, setSearchString] = useState("");
  const [items, setItems] = useState([]);
  const [hasNextPage, setHasNextPage] = useState();
  const [page, setPage] = useState();
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);
    fetch(
      `http://localhost:4000/search/repositories?q=${searchString}&pages=${page}`,
    )
    .then(res => res.json())
    .then(res => {
       console.log(res)
       setLoading(false);
       let total = res.total_count
       let current = page * 30
       let hasNextPage = (current <= total)
       setHasNextPage(hasNextPage);
       setItems([...items, res.items]);
       setPage(page+1)
    })
    .catch(() => {
      console.log("stop it");
      setLoading(false);
    });
  }

  const infiniteRef = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: handleLoadMore,
    scrollContainer,
  });


  let onChange = e => setSearchString(e.target.value);

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
       <ul ref={infiniteRef}>
          {items.map((item) => (
            <li key={item.id}>{item.full_name}</li>
          ))}
        {loading && <li>Loading...</li>}
      </ul>
    </div>
  );
};
export default Search;