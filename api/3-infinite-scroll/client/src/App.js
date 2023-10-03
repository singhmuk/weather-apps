import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import {BASE_URL} from "./helper";

const LIMIT = 5;
const Add = () => {
  const [lists, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    // The query parameters should be passed as an object in the second argument, not directly as 
    // separate parameters. 
    const res = await axios.get(`${BASE_URL}/api/items`, { params: { page: activePage, size: LIMIT } });
    setList([...lists, ...res.data.users]);
    setActivePage(activePage + 1);
    setTotal(res.data.total);
  }

  return (
    <div className="app">
      <InfiniteScroll
        dataLength={lists.length}
        next={fetchData}
        hasMore={lists.length < total}
        loader={<h4>Loading...</h4>}
        endMessage={<b>Yay! You have seen it all</b>}
      >
        {lists.map((item) => (
          <div key={item._id}>
            <h1>{item.name + " " + item._id}</h1>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Add;
