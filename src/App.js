import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import GetData from "./components/GetData";
import Cats from "./components/Cats";

import InfiniteScroll from "react-infinite-scroller";

function App() {
  const [dataCats, setDataCats] = useState([]);
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const loadData = () => {
    return axios
      .get(`https://api.thecatapi.com/v1/breeds?limit=5&page=${page}`)
      .then((res) => {
        setDataCats((prev) => [...prev, ...res.data]);
        setPage((prev) => prev + 1);
      });
  };

  return (
    <div className="App">
      <h1>Search and Cat Lists</h1>
      <form className="search-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search"
          autoComplete="off"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <input type="submit" value="search" />
      </form>
      <div className="recipes">
        <InfiniteScroll
          hasMore={hasMore}
          loadMore={loadData}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {dataCats ? (
            dataCats
              .filter((dataCat) => {
                if (search === "") {
                  return dataCat;
                } else if (
                  dataCat.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return dataCat;
                } else if (
                  dataCat.description
                    .toLowerCase()
                    .includes(search.toLowerCase())
                ) {
                  return dataCat;
                } else if (
                  dataCat.temperament
                    .toLowerCase()
                    .includes(search.toLowerCase())
                ) {
                  return dataCat;
                }
              })
              .map((dataCat) => {
                // console.log(dataCat);
                return <GetData key={uuidv4()} dataCat={dataCat} />;
              })
          ) : (
            <>kosong</>
          )}
          {/* <Cats /> */}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default App;
