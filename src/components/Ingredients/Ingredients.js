import React from "react";
import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import { useState, useEffect } from "react";
function Ingredients() {
  let [data, setData] = useState([]);
  let [click, setClick] = useState(false);

  useEffect(() => {
    console.log(2);
    fetch("https://react1-9a97e-default-rtdb.firebaseio.com/ingredients.json")
      .then((response) => response.json())
      .then((fetchedData) => setData(fetchedData));
  }, [click]);
  let newData = [];
  for (let key in data) {
    newData.push({
      id: data[key].id,
      name: data[key].name,
      amount: data[key].amount,
    });
  }
  let handleData = () => {
    setData(newData);
    setClick(!click);
  };
  /*let handleRemove = (el) => {
    setData((prev) => prev.filter((item) => item.id !== el));
    console.log(el);
  };*/

  return (
    <div className="App">
      <IngredientForm onData={handleData} />

      <section>
        <Search />
        <IngredientList ingredients={newData} onRemoveItem={1} />
      </section>
    </div>
  );
}

export default Ingredients;
