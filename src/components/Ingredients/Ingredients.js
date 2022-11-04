import React from "react";
import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import Context from "../Context";
import { useState, useEffect, useCallback, useReducer } from "react";
import LoadingIndicator from "../UI/LoadingIndicator";
let reducer = (state, action) => {
  if (action.type === "loading") {
    return {
      data: state.data,
      loading: !state.loading,
    };
  }
  if (action.type === "loaded") {
    return {
      data: action.val,
      loading: action.loading,
    };
  }
  if (action.type === "filter") {
    return {
      data: state.data.filter((item) => item.id !== action.filter),
      loading: state.loading,
    };
  }
  return {
    data: [],

    loading: false,
  };
};
function Ingredients() {
  let [click, setClick] = useState(false);
  let [initialStates, dispatch] = useReducer(reducer, {
    data: [],
    loading: false,
  });

  useEffect(() => {
    dispatch({ type: "loading" });
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
        dispatch({ type: "loading" });
        dispatch({ type: "loaded", val: newData });
      });
  }, [click]);
  let filterData = useCallback((e) => {
    dispatch({ type: "loaded", val: e });
  }, []);
  let handleData = () => {
    console.log(33);
    setClick(!click);
  };
  let handleRemove = (el) => {
    fetch(
      `https://react1-9a97e-default-rtdb.firebaseio.com/ingredients/${el}.json`,
      {
        method: "DELETE",
      }
    ).then((response) => {
      dispatch({ type: "filter", filter: el });
    });
  };
  return (
    <Context.Provider
      value={{
        onFilteredData: filterData,
        ingredients: initialStates.data,
        onRemoveItem: handleRemove,
        onData: handleData,
      }}
    >
      <div className="App">
        <IngredientForm />
        <section>
          <Search />
          {!initialStates.loading && <IngredientList />}
          {initialStates.loading && <LoadingIndicator />}
        </section>
      </div>
    </Context.Provider>
  );
}

export default Ingredients;
