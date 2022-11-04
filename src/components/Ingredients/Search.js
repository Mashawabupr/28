import React, { useState, useContext } from "react";

import Card from "../UI/Card";
import "./Search.css";
import Context from "../Context";
const Search = React.memo(() => {
  let { onFilteredData } = useContext(Context);
  let [filter, setFilter] = useState("");
  let handleInput = (event) => {
    setFilter(event.target.value);
  };
  let handleFilter = () => {
    if (filter.trim().length !== 0) {
      fetch("https://react1-9a97e-default-rtdb.firebaseio.com/ingredients.json")
        .then((response) => response.json())
        .then((fetchedData) => {
          let newData = [];
          for (let key in fetchedData) {
            newData.push({
              id: key,
              name: fetchedData[key].name,
              amount: fetchedData[key].amount,
            });
          }
          onFilteredData(newData.filter((el) => el.name === filter));
        });
    } else {
      alert("Please enter something to filter!");
    }
  };

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <input type="text" value={filter} onChange={handleInput} />
          <button onClick={handleFilter}>Filter by Title</button>
        </div>
      </Card>
    </section>
  );
});

export default Search;
