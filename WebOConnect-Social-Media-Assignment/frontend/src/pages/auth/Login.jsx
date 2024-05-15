import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!mobile.trim()) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mobile.trim())) {
      errors.mobile = "Mobile number must be 10 digits";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    let formData = new FormData();
    formData.append("phone", mobile);
    formData.append("password", password);

    fetch("http://localhost:8080/login", {
      method: "POST",
      body: formData
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "-------data");
        if (data.type == "success") {
          alert(data.message);
          navigate("/home");
          localStorage.setItem("token", data.token.token);
        }
      })
      .catch((err) => {
        console.log(err.message, "---------err");
      });
  };
  return (
    <>
      <div>
        <h2 style={{ textAlign: "center", fontSize: 30, marginTop: 50 }}>
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ textAlign: "center" }}>
            <label htmlFor="mobile" style={{ fontSize: 20, marginLeft: -160 }}>
              Mobile Number:
            </label>
            <br />
            <TextField
              name="phone"
              placeholder="Enter Mobile"
              onChange={(e) => setMobile(e.target.value)}
              type="text"
              value={mobile}
              sx={{ width: 300, marginTop: 2 }}
            />
            {errors.mobile && <p style={{ color: "red" }}>{errors.mobile}</p>}
          </div>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <label
              htmlFor="password"
              style={{ fontSize: 20, marginLeft: -210 }}
            >
              Password:
            </label>
            <br />
            <TextField
              name="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              sx={{ width: 300, marginTop: 2 }}
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}
          </div>
          <div style={{ marginTop: 20 }}>
            <Button
              variant="contained"
              type="submit"
              sx={{ display: "block", margin: "auto", width: 300 }}
            >
              SUBMIT
            </Button>
          </div>
        </form>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p>Don't have an account ?</p>
          <Link to="/signup">
            <p style={{ color: "blue", marginLeft: 10 }}>Sign Up</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
