import { useState, useEffect } from "react";

function InfiniteScroll() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  async function fetchData() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${count}&limit=20`
      );
      const data = await response.json();

      setItems((prevItems) => [...prevItems, ...data.results]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
      setCount((count) => count + 20);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    fetchData();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <div>
      <h2>InfiniteScroll</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      {isLoading && <p>isLoading...</p>}
      {error && <p>Error: {error.message} </p>}
    </div>
  );
}

export default InfiniteScroll;
