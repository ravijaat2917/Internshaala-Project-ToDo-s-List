import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import "./../index.css";
import axios from "axios";

const { Header, Content, Footer } = Layout;

const LAYOUT = ({ children }) => {
  const [user, setUser] = useState();
  const getUSer = async () => {
    const id = localStorage.getItem("token");
    const res = await axios.post("/api/v1/get-user", {
      id: id,
    });
    if (res.data.success) {
      setUser(res.data.user.name);
    }
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  useEffect(() => {
    getUSer();
  }, []);
  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu theme="dark" mode="horizontal" />
        <h4 className="headerHeading">ZedBlock ToDo Lists Assignment</h4>
        <button
          className="btn btn-secondary"
          style={{ width: "110px" }}
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Log Out
        </button>
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: "0 50px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Hello {user}</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            background: colorBgContainer,
            // height: "73vh",
          }}
        >
          {children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Copyrights reserved @ ravijaat2917@gmail.com
      </Footer>
    </Layout>
  );
};

export default LAYOUT;
