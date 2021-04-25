import React, { useEffect, useState } from "react";
import axios from "axios";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://react-hooks-1606c-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((res) => {
        // console.log(res);
        const loadedIngredients = [];
        for (const key in res.data) {
          console.log(res.data[key].body.title);
          loadedIngredients.push({
            id: key,
            title: res.data[key].body.title,
            amount: res.data[key].body.amount
          });
        }
        setIngredients(loadedIngredients);
      });
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
        <Search />
        <IngredientList ingredients={ingredients} onRemoveItem={() => {}} />
      </section>
    </div>
  );
}

export default Ingredients;
