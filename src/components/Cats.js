import axios from "axios";
import "../App.css";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import GetData from "./GetData";
import InfiniteScroll from "react-infinite-scroller";
import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
} from "react-query";

const queryClient = new QueryClient();

function Cats() {
  const [dataCats, setDataCats] = useState([]);
  const [search, setSearch] = useState("");

  const fetchPosts = async ({ pageParam = 1 }) => {
    const response = await fetch(
      `https://api.thecatapi.com/v1/breeds?limit=10&page=${pageParam}`
    );
    const results = await response.json();

    return { results, nextPage: pageParam + 1, totalPage: 100 };
  };

  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery("posts", fetchPosts, {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage < lastPage.totalPage) return lastPage.nextPage;
        return undefined;
      },
    });

  if (isLoading) {
    return "Loading";
  }

  if (isError) {
    return "Error occured, please try again...";
  }

  const onSubmit = (e) => {
    e.preventDefault();
    // getData()
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
          // value={dataCats}
        />
        <input type="submit" value="search" />
      </form>

      <div className="recipes">
        {/* <QueryClientProvider client={queryClient}>
          <InfiniteScroll
            //   next={fetchMoreData}
            hasMore={hasNextPage}
            loadMore={fetchNextPage}
            loader={<h4>Loading ...</h4>}
          > */}
        {data.pages
          .filter((dataCat) => {
            if (search === "") {
              return dataCat;
            } else if (
              dataCat.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return dataCat;
            } else if (
              dataCat.description.toLowerCase().includes(search.toLowerCase())
            ) {
              return dataCat;
            } else if (
              dataCat.temperament.toLowerCase().includes(search.toLowerCase())
            ) {
              return dataCat;
            }
          })
          .map((dataCat) =>
            dataCat.results.map((dataCat) => (
              <GetData key={uuidv4()} dataCat={dataCat} />
            ))
          )}
        {/* </InfiniteScroll>
        </QueryClientProvider> */}
      </div>
    </div>
  );
}

export default Cats;
