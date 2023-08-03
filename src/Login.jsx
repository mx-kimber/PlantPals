import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export function Login() {
  const [errors, setErrors] = useState([]);
  const { setCurrentUser } = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/sessions.json", params)
      .then((response) => {
        console.log(response.data);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        setCurrentUser(response.data.user);
        event.target.reset();
        window.location.href = "/plants";
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid email or password"]);
      });
  };

  return (
    <div id="login">
      <h1>Login</h1>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          Email: <input name="email" type="email" autoComplete="username" />
        </div>
        <div>
          Password: <input name="password" type="password" autoComplete="current-password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}