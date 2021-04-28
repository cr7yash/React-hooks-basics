import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    console.log("RENDERING INGREDIENTS", ingredients);
  }, [ingredients]);

  const filterIngredientHandler = useCallback((filterIngredient) => {
    setIngredients(filterIngredient);
  }, []);

  const addIngredientHandler = (ingredient) => {
    axios
      .post(
        "https://react-hooks-1606c-default-rtdb.firebaseio.com/ingredients.json",
        { body: ingredient }
      )
      .then((response) => {
        setIngredients((prevState) => {
          return [
            ...prevState,
            {
              id: response.name,
              ...ingredient
            }
          ];
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredient={filterIngredientHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={() => {}} />
      </section>
    </div>
  );
}

export default Ingredients;
