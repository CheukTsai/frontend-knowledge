import { useState, useEffect } from "react";

function Pagination() {
  const [items, setItems] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [recordsPerPage] = useState(10);

  async function fetchData() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=0&limit=100`
      );
      const res = await response.json();
      const data = res.results;

      setItems((prevItems) => [...prevItems, ...data]);
      setCurrentItems(data.slice(0, 10));
      setTotalPages(Math.ceil(data.length / recordsPerPage));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleClick(pageNum) {
    setCurrentPage(pageNum);
    let startIdx = (pageNum - 1) * recordsPerPage;
    let newItems = items.slice(startIdx, startIdx + recordsPerPage);
    setCurrentItems(newItems);
  }

  function createPagination() {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i == currentPage) {
        pages.push(<button disabled>{i}</button>);
      } else {
        pages.push(<button onClick={() => {handleClick(i)}}>{i}</button>);
      }
    }
    return pages;
  }

  return (
    <div className="page">
      <h2>Pagination</h2>
      <a href="/">home</a>
      <ul>
        {currentItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      {createPagination()}
    </div>
  );
}

export default Pagination;
