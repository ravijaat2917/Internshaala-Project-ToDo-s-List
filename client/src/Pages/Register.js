import React from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const onFinishHandler = async (values) => {
      const password = values.password;
      if (password.length < 6) {
        message.error("Password must be at least 6 characters");
      } else if (password.search(/[a-z]/) < 0) {
        message.error("Password must contain at least one lowercase letter");
      } else if (password.search(/[A-Z]/) < 0) {
        message.error("Password must contain at least one uppercase letter");
      } else if (password.search(/[0-9]/) < 0) {
        message.error("Password must contain at least one number");
      }
    try {
      const res = await axios.post("/api/v1/register", values);
      if (res.data.success) {
        message.success("Register Successfully");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
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
          <h3 className="text-center">Register Form</h3>
          <Form.Item label="Name" name={"name"}>
            <Input type="text" required></Input>
          </Form.Item>
          <Form.Item label="Email" name={"email"}>
            <Input type="email" required></Input>
          </Form.Item>
          <Form.Item label="Password" name={"password"}>
            <Input type="password" required></Input>
          </Form.Item>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
          <Link to={"/login"} className="m-2">
            Already User ? Login
          </Link>
        </Form>
      </div>
    </>
  );
};

export default Register;
