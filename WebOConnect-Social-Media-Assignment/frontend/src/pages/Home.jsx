import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import ModelComp from "../components/ModelComp";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { useNavigate } from "react-router-dom";
import GetPost from "../components/GetPost";

const Home = () => {

  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/")
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    fetch("http://localhost:8080/get-posts", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "---------fdatafghjkl")
        setPosts(data.posts);
      })
      .catch((err) => {
        console.log(err, "---------err")
      })
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ textAlign: "center", fontSize: 45, fontFamily: "sans-serif" }}>Posts</h1>
        <ModelComp />
      </div>
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <Button
          variant="contained"
          type="submit"
          sx={{ display: "block", margin: "auto", width: 300 }}
          onClick={() => {
            localStorage.removeItem("token");
            alert("Logout successfully")
            navigate("/home");
          }}
        >
          LOGOUT
        </Button>
      </div>
      {
        posts && posts?.map((items) => {
          return (
            <GetPost items={items} key={items.id} />
          )
        })
      }
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <Stack spacing={2}>
          <Pagination count={10} color="primary" />
        </Stack>
      </div>
    </>
  );
};

export default Home;
