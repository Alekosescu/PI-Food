import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../../actions";
import './SearchBar.css';

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getRecipesByName(name));
    setSearch(name);
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          className='boxy'
          type="text"
          placeholder="Search..."
          value={name}
          onChange={(e) => handleInputChange(e)}
        />
        <button className='battonix' type="Submit" onClick={(e) => handleSubmit(e)}>
          Search
        </button>
      </form>
    </div>
  );
}
