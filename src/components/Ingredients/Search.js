import axios from "axios";
import React, { useEffect, useState } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { onLoadIngredient } = props;
  const [enteredFilter, setEnteredFilter] = useState("");
  useEffect(() => {
    const query =
      enteredFilter.length === 0
        ? ""
        : `?orderBy="title"&equalTo="${enteredFilter}"`;
    axios
      .get(
        "https://react-hooks-1606c-default-rtdb.firebaseio.com/ingredients.json" +
          query
      )
      .then((res) => {
        // console.log(res);
        const loadedIngredients = [];
        for (const key in res.data) {
          console.log("Rendering in search");
          loadedIngredients.push({
            id: key,
            title: res.data[key].body.title,
            amount: res.data[key].body.amount
          });
        }
        onLoadIngredient(loadedIngredients);
      })
      .catch((err) => console.log(err));
  }, [enteredFilter, onLoadIngredient]);
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
