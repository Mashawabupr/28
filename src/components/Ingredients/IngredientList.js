import React, { useContext } from "react";

import "./IngredientList.css";
import Context from "../Context";

const IngredientList = () => {
  let contextData = useContext(Context);
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {contextData.ingredients.map((it) => (
          <li key={it.id} onClick={contextData.onRemoveItem.bind(this, it.id)}>
            <span>{it.name}</span>
            <span>{it.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
