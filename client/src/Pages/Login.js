import React from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const onFinishHandler = async (value) => {
    try {
      const res = await axios.post("/api/v1/login", value);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        navigate("/");
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Login Form</h3>
          <Form.Item label="Email" name={"email"}>
            <Input type="email" required></Input>
          </Form.Item>
          <Form.Item label="Password" name={"password"}>
            <Input type="password" required></Input>
          </Form.Item>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
          <Link to={"/register"} className="m-2">
            Not a User ? Register
          </Link>
        </Form>
      </div>
    </>
  );
};

export default Login;
