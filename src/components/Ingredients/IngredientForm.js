import React from "react";
import { useState } from "react";
import Card from "../UI/Card";
import "./IngredientForm.css";

const IngredientForm = React.memo((props) => {
  let [name, setName] = useState("");
  let [amount, setAmount] = useState("");
  const submitHandler = (event) => {
    let data = { id: Math.random(), name, amount };
    event.preventDefault();
    if (data.name.trim().length > 0 && data.amount.trim().length > 0) {
      props.onData();

      fetch(
        "https://react1-9a97e-default-rtdb.firebaseio.com/ingredients.json",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      setAmount("");
      setName("");
    } else {
      alert("please enter something!");
    }

    // ...
  };

  let handleName = (event) => {
    setName(event.target.value);
  };
  let handleAmount = (event) => {
    setAmount(event.target.value);
  };
  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" onChange={handleName} value={name} />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              onChange={handleAmount}
              value={amount}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
