import React from "react";
import { TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignUp = () => {
  const navigate = useNavigate();

  const handleData = (values) => {
    fetch("http://localhost:8080/sign-up", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data, "------------data");
        if (data.type == "success") {
          navigate("/");
          alert(data.message);
        }
      })
      .catch((err) => {
        console.log(err.message, "---------err");
      });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", fontSize: 30, marginTop: 50 }}>
        Sign Up
      </h2>
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          phone: "",
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          first_name: Yup.string().required("Username is required"),
          last_name: Yup.string().required("Username is required"),
          phone: Yup.string()
            .required("Mobile number is required")
            .matches(/^\d{10}$/, "Mobile number must be 10 digits"),
          email: Yup.string()
            .required("Email is required")
            .email("Invalid email address"),
          password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Form Data:", values);
          handleData(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div style={{ textAlign: "center" }}>
              <label style={{ fontSize: 20, marginLeft: -210 }}>
                First Name:
              </label>
              <br />
              <Field
                type="text"
                name="first_name"
                as={TextField}
                placeholder="Enter your username"
                sx={{ width: 300, marginTop: 2 }}
              />
              <ErrorMessage
                name="first_name"
                component="p"
                style={{ color: "red" }}
              />
            </div>
            <div style={{ textAlign: "center", marginTop: 10 }}>
              <label style={{ fontSize: 20, marginLeft: -210 }}>
                Last Name:
              </label>
              <br />
              <Field
                type="text"
                name="last_name"
                as={TextField}
                placeholder="Enter your username"
                sx={{ width: 300, marginTop: 2 }}
              />
              <ErrorMessage
                name="last_name"
                component="p"
                style={{ color: "red" }}
              />
            </div>
            <div style={{ textAlign: "center", marginTop: 10 }}>
              <label style={{ fontSize: 20, marginLeft: -230 }}>Mobile:</label>
              <br />
              <Field
                type="text"
                name="phone"
                as={TextField}
                placeholder="Enter your mobile"
                sx={{ width: 300, marginTop: 2 }}
              />
              <ErrorMessage
                name="phone"
                component="p"
                style={{ color: "red" }}
              />
            </div>
            <div style={{ textAlign: "center", marginTop: 10 }}>
              <label style={{ fontSize: 20, marginLeft: -240 }}>Email:</label>
              <br />
              <Field
                type="email"
                name="email"
                as={TextField}
                placeholder="Enter your email"
                sx={{ width: 300, marginTop: 2 }}
              />
              <ErrorMessage
                name="email"
                component="p"
                style={{ color: "red" }}
              />
            </div>
            <div style={{ textAlign: "center", marginTop: 10 }}>
              <label style={{ fontSize: 20, marginLeft: -210 }}>
                Password:
              </label>
              <br />
              <Field
                type="password"
                name="password"
                as={TextField}
                placeholder="Enter your password"
                sx={{ width: 300, marginTop: 2 }}
              />
              <ErrorMessage
                name="password"
                component="p"
                style={{ color: "red" }}
              />
            </div>
            <div style={{ marginTop: 20 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ display: "block", margin: "auto", width: 300 }}
                disabled={isSubmitting}
              >
                Sign Up
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p>Have an account ?</p>
        <Link to="/">
          <p style={{ color: "blue", marginLeft: 10 }}>Sign In</p>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;