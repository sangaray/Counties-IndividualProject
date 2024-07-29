import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../../redux/actions";
import s from "./SearchBar.module.css";

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const onHandleChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();
    dispatch(getCountriesByName(name));
    setCurrentPage(1);
    setName("");
  };

  return (
    <div className={s.group}>
      <input
        className={s.input}
        type="search"
        name="search"
        placeholder="by Country Name"
        onChange={onHandleChange}
      />

      <button className={s.btn} type="submit" onClick={onHandleSubmit}>
        Search
      </button>
    </div>
  );
}
