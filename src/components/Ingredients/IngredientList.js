import React from "react";

import "./IngredientList.css";

const IngredientList = (props) => {
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredients.map((it) => (
          <li key={it.id} onClick={props.onRemoveItem.bind(this, it.id)}>
            <span>{it.name}</span>
            <span>{it.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
