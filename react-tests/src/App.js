import "./App.css";
import FakeA from "./FakeA";
import InfiniteScroll from "./InfiniteScroll";

function App() {
  return (
    <div className="App">
      <div className="box">
        <InfiniteScroll></InfiniteScroll>
      </div>
      <div className="box">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea, sit sunt
          animi unde magnam minus cumque culpa eveniet ipsa voluptates
          cupiditate alias, rem quasi optio dicta eaque similique consequatur
          officiis!
        </p>
      </div>
      <div className="box">
        <div>
          <FakeA href={"/pagination"}>pagination</FakeA>
          <FakeA href={"/css"}>css</FakeA>
        </div>
        <a href="/pagination">pagination</a>
        <a href="/countdown"> countdown </a>
        <a href="/tzfe"> 2048 </a>
      </div>
    </div>
  );
}

export default App;
