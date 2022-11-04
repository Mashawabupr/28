import React from "react";
import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import { useState, useEffect, useCallback } from "react";
function Ingredients() {
  let [data, setData] = useState([]);
  let [click, setClick] = useState(false);

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
        setData(newData);
      });
  }, [click]);
  let filterData = useCallback((e) => {
    setData(e);
  }, []);
  let handleData = () => {
    setClick(!click);
  };
  let handleRemove = (el) => {
    setData((prev) => prev.filter((item) => item.id !== el));
  };

  return (
    <div className="App">
      <IngredientForm onData={handleData} />

      <section>
        <Search onFilteredData={filterData} />
        <IngredientList ingredients={data} onRemoveItem={handleRemove} />
      </section>
    </div>
  );
}

export default Ingredients;
