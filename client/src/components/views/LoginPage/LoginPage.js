import React, { useState } from "react";

function LoginPage() {
  const [Email, setEmail] = useState(""); // 처음의 값 정의
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault(); //  preventDefault 이벤트가 없으면 이 함수가 실행될때마다 페이지가 새로고침 된다 이를 방지하는 함수이다

    // 서버에 값을 보내기 전에 state에 저장된 값을 확인하고자 찍어봄
    // console.log("Email", Email);
    // console.log("Password", Password);
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
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
