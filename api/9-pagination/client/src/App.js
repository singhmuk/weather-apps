import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [pagenumber, setPagenumber] = useState(0);
  const [pagesno, setPagesno] = useState(0);
  const [posts, setPosts] = useState([]);

  const pages = new Array(pagesno).fill(null).map((v, i) => i);

  useEffect(() => {
    fetchData();
  }, [pagenumber]);

  const fetchData = async () => {
      const res = await axios.get(`/api/items?page=${pagenumber}`);
      setPosts(res.data.posts);
      setPagesno(res.data.totalPages);
      console.log('res', res.data);
  };

  const gotoPrevious = () => {
    setPagenumber(Math.max(0, pagenumber - 1));
  };

  const gotoNext = () => {
    setPagenumber(Math.min(pagesno - 1, pagenumber + 1));
  };

  return (
    <div>
      <h3>Page of {pagenumber + 1}</h3>

      {posts.map((post) => (
        <div key={post._id}>
          <h4>{post.title}</h4>
          <p>{post.text}</p>
        </div>
      ))}

      <button onClick={gotoPrevious}>Previous</button>
      {pages.map((pageIndex) => (
        <button key={pageIndex} onClick={() => setPagenumber(pageIndex)}>
          {pageIndex + 1}
        </button>
      ))}
      <button onClick={gotoNext}>Next</button>
    </div>
  );
}

export default App;
