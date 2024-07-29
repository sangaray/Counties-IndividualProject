import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  postActivity,
  getActivities,
  getAllCountries,
} from "../../redux/actions";
import a from "./CreateActivity.module.css";

const validate = (input) => {
  let errors = {};
  if (!input.name) errors.name = "Name is required";
  if (input.name.length < 3 || input.name.length > 20)
    errors.name = "Name must contain between 3 and 20 characters";
  if (!/^[a-zA-Z ]*$/.test(input.name))
    errors.name = "Invalid name: must only contain letters";

  if (!input.difficulty) errors.difficulty = "Choose a difficulty";

  if (!input.duration) errors.duration = "Duration is required";

  if (input.duration < 30 || input.duration > 300)
    errors.duration =
      "Should last at least 30 minutes and no more than 300 minutes";
  if (/^\d+$^\d+$/.test(input.duration))
    errors.duration = "The duration must be in integers";

  if (!input.season) errors.season = "Choose a season";

  if (!input.countries.length)
    errors.countries = "Select one countrie at least";

  return errors;
};

export default function CreateActivity() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.allCountries);
  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  const onHandleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value.toLowerCase().trim(),
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const onHandleDifficulty = (e) => {
    e.preventDefault();
    if (e.target.checked) {
      setInput({
        ...input,
        difficulty: e.target.value,
      });
    }
    setErrors(
      validate({
        ...input,
        difficulty: e.target.value,
      })
    );
  };

  const onHandleSeason = (e) => {
    e.preventDefault();
    if (e.target.checked) {
      setInput({
        ...input,
        season: e.target.value,
      });
    }
    setErrors(
      validate({
        ...input,
        season: e.target.value,
      })
    );
  };

  const onHandleCountries = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      countries: input.countries.includes(e.target.value)
        ? input.countries
        : [...input.countries, e.target.value],
    });
    setErrors(
      validate({
        ...input,
        countries: [...input.countries, e.target.value],
      })
    );
  };

  const onHandleDelete = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      countries: input.countries.filter((c) => c !== e.target.value),
    });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    dispatch(postActivity(input));
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });
    alert("Activity created successfully");
    history.push("/home");
  };

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  return (
    <div className={a.container}>
      <div className={a.btnContainer}>
        <Link to="/home">
          <button className={a.btnGoBack}>{"<"} Go Back</button>
        </Link>
      </div>

      <form className={a.formu} onSubmit={onHandleSubmit}>
        <div className={a.area}>
          <div className={a.act}>
            <label className={a.dif}>
              <legend>Activity Name</legend>
            </label>
            <input
              className={a.input}
              type="text"
              placeholder="Enter the activity name"
              autoCapitalize="sentences"
              name="name"
              value={input.name}
              autoFocus
              onChange={onHandleChange}
            />
          </div>
          <div className={a.errors}>
            {errors.name && <p style={{ margin: "10px" }}>{errors.name}</p>}
          </div>

          <div className={a.act}>
            <label className={a.dif}>
              <legend>Difficulty Level </legend>
            </label>
            <label className={a.check}>
              1.{" "}
              <input
                type="radio"
                id="onedif"
                name="difficulty"
                value="1"
                onChange={onHandleDifficulty}
              />{" "}
            </label>
            <label className={a.check}>
              2.{" "}
              <input
                type="radio"
                id="twodif"
                name="difficulty"
                value="2"
                onChange={onHandleDifficulty}
              />{" "}
            </label>
            <label className={a.check}>
              3.{" "}
              <input
                type="radio"
                id="threedif"
                name="difficulty"
                value="3"
                onChange={onHandleDifficulty}
              />{" "}
            </label>
            <label className={a.check}>
              4.{" "}
              <input
                type="radio"
                id="fourdif"
                name="difficulty"
                value="4"
                onChange={onHandleDifficulty}
              />{" "}
            </label>
            <label className={a.check}>
              5.{" "}
              <input
                type="radio"
                id="fivedif"
                name="difficulty"
                value="5"
                onChange={onHandleDifficulty}
              />{" "}
            </label>
          </div>
          <div className={a.errors}>
            {errors.difficulty && (
              <p style={{ margin: "4px" }}>{errors.difficulty}</p>
            )}
          </div>

          <div className={a.act}>
            <label className={a.dif}>
              <legend>Duration </legend>
            </label>
            <label>
              <input
                className={a.inputDos}
                type="number"
                name="duration"
                min="30"
                max="300"
                step={30}
                value={input.duration}
                onChange={onHandleChange}
              />{" "}
            </label>
            <label className={a.dif}>minutes</label>
          </div>
          <div className={a.errors}>
            {errors.duration && (
              <p style={{ marginBottom: "10px" }}>{errors.duration}</p>
            )}
          </div>

          <div className={a.act}>
            <label className={a.dif}>
              <legend>Season </legend>
            </label>
            <label className={a.check}>
              <input
                type="radio"
                id="onesea"
                name="season"
                value="Summer"
                onChange={onHandleSeason}
              />{" "}
              Summer
            </label>
            <label className={a.check}>
              <input
                type="radio"
                id="twosea"
                name="season"
                value="Autumn"
                onChange={onHandleSeason}
              />{" "}
              Autumn
            </label>
            <label className={a.check}>
              <input
                type="radio"
                id="threesea"
                name="season"
                value="Winter"
                onChange={onHandleSeason}
              />{" "}
              Winter
            </label>
            <label className={a.check}>
              <input
                type="radio"
                id="foursea"
                name="season"
                value="Winter"
                onChange={onHandleSeason}
              />{" "}
              Spring
            </label>
          </div>
          <div className={a.errors}>
            {errors.season && <p style={{ margin: "4px" }}>{errors.season}</p>}
          </div>

          <div className={a.act}>
            <label className={a.dif}>
              <legend>Countries </legend>
            </label>
            <select className={a.sel} onChange={onHandleCountries}>
              <option hidden selected>
                Select countries
              </option>
              {countries
                ?.sort((a, b) => {
                  if (a.name > b.name) return 1;
                  if (a.name < b.name) return -1;
                  return 0;
                })
                .map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <div className={a.errors}>
            {errors.countries && (
              <p style={{ marginBottom: "10px" }}>{errors.countries}</p>
            )}
          </div>

          <ul className={a.punto}>
            {input.countries.map((c) => (
              <li className={a.lista} key={c}>
                {c}
                <button
                  className={a.btnDelete}
                  value={c}
                  onClick={onHandleDelete}
                >
                  x
                </button>
              </li>
            ))}
          </ul>

          {!input.name ||
          !input.difficulty ||
          !input.duration ||
          !input.season ||
          input.countries.length === 0 ||
          Object.keys(errors).length ? (
            <button className={a.btnSend} disabled type="submit">
              Send
            </button>
          ) : (
            <button className={a.btnSend2} type="submit">
              Send{" "}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
