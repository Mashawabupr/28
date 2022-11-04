import React, { useState, useEffect } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  let [filter, setFilter] = useState("");
  let { onFilteredData } = props;
  let handleInput = (event) => {
    setFilter(event.target.value);
  };
  useEffect(() => {
    fetch("https://react1-9a97e-default-rtdb.firebaseio.com/ingredients.json")
      .then((response) => response.json())
      .then((fetchedData) => {
        let newData = [];
        for (let key in fetchedData) {
          newData.push({
            id: fetchedData[key].id,
            name: fetchedData[key].name,
            amount: fetchedData[key].amount,
          });
        }
        onFilteredData(newData.filter((el) => el.name === filter));
      });
    console.log(2);
  }, [filter, onFilteredData]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={filter} onChange={handleInput} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
