import React, { useContext } from "react";
import { AuthContext } from "../context/context";

const Home = () => {
  const { userInfo } = useContext(AuthContext);
  return (
    <div>
      <h3>Hi {userInfo?.username}</h3>
    </div>
  );
};

export default Home;
