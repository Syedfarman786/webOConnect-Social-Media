import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


const GetPost = (props) => {
    const [like, setLike] = useState(false);
    const [follow, setFollow] = useState(false);

    const token = localStorage.getItem("token");

    const { items } = props;

    return (
        <>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ width: "40%", textAlign: "center" }}>
                    <div
                        style={{
                            border: "5px solid black",
                            padding: "10px",
                            margin: "10px 0",
                            borderRadius: 10
                        }}
                    >
                        <img src={`http://localhost:8080/images/post/${items.media_url}`} height={400} width="100%" />
                        <p style={{fontSize: 20, fontFamily: "monospace"}}>
                            {items.content}
                        </p>
                        <div style={{justifyContent:"space-around",display: 'flex'}}> 
                            <Button
                                disabled={like}
                                onClick={() => {
                                    setLike(!like);
                                    const post_id = items.user_id;
                                    fetch("http://localhost:8080/post-like", {
                                        method: 'POST',
                                        headers: {
                                            "Content-Type": "application/json",
                                            'Authorization': `Bearer ${token}`
                                        },
                                        body: JSON.stringify({
                                            "post_id": post_id,
                                        })
                                    }).then((res) => res.json()).then((data) => {
                                        console.log(data);
                                    }).catch((err) => {
                                        console.log(err.message, "=============err");
                                    })
                                }}
                            >
                                {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            </Button>
                            <Button
                                disabled={follow}
                                onClick={() => {
                                    setFollow(!follow)
                                    const post_id = items.user_id;
                                    fetch("http://localhost:8080/post-follow", {
                                        method: 'POST',
                                        headers: {
                                            "Content-Type": "application/json",
                                            'Authorization': `Bearer ${token}`
                                        },
                                        body: JSON.stringify({
                                            "post_id": post_id,
                                        })
                                    }).then((res) => res.json()).then((data) => {
                                        console.log(data);
                                    }).catch((err) => {
                                        console.log(err.message, "=============err");
                                    })
                                }}
                                sx={{ marginLeft: 2, width: 120 }}
                                variant="contained"
                            >
                                {follow ? "Following" : "Follow"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GetPost;