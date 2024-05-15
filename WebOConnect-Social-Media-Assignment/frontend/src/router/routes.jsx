import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import Home from "../pages/Home";

const Routers = () => {
  return (
    <Routes>
      {/* <Switch> */}
      <Route path="/" Component={Login} />
      <Route Component={SignUp} path="/signup" />
      <Route Component={Home} path="/home" />
      {/* </Switch> */}
    </Routes>
  );
};

export default Routers;
