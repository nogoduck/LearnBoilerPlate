import React, { useEffect } from "react";
import axios from "axios";

function LandingPage(props) {
  useEffect(() => {
    axios.get("/api/hello").then((response) => console.log(response.data));
  }, []);

  const onClickHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      // console.log(response.data); //로그아웃 성공시 콘솔에 출력
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("Failed to Logout ...");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>Start Page</h2>
      <br></br>
      <button onClick={onClickHandler}>LOGOUT</button>
    </div>
  );
}

export default LandingPage;
