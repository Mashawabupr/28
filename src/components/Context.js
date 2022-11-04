import React from "react";
let Context = React.createContext({
  onFilteredData: () => {},
  ingredients: [],
  onRemoveItem: () => {},
  onData: () => {},
});
export default Context;
