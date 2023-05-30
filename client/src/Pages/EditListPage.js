import React, { useEffect, useState } from "react";
import LAYOUT from "../Components/Layout";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditListPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const getList = async () => {
    try {
      const { data } = await axios.post(`/api/v1/list/${params.id}`);
      setList(data.list);
      setDescription(data.list.description);
      setTitle(data.list.title);
      setCompleted(data.list.completed);
    } catch (error) {
      console.log(error);
      message.error("List Not Getting Successfully");
    }
  };
  const onFinish = async (values) => {
    //   console.log("Success:", values.completed);
    const res = await axios.post("/api/v1/update-list", {
      id: params.id,
      title: values.title,
      description: values.description,
      completed: values.completed,
    });
    if (res?.data.success) {
      message.success(res.data.message);
      navigate("/");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.post("/api/v1/delete-list", {
        id: params.id,
      });
        if (res.data.success) {
            message.success(res.data.message);
            navigate('/')
            window.location.reload();
        }
    } catch (error) {
      console.log(error);
      message.error("Error in Deleting list");
    }
  };

  useEffect(() => {
    getList();
  }, [list?.title]);

  return (
    <LAYOUT>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
          height: "65vh",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please input Title!",
            },
          ]}
        >
          <Input defaultValue={title} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input Description!",
            },
          ]}
        >
          <Input defaultValue={description} />
        </Form.Item>

        <Form.Item
          name="completed"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox defaultChecked={completed === true ? true : false}>
            Completed
          </Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="Update">
            Update
          </Button>
          <Button
            className="btn btn-danger text-center"
            onClick={() => {
              handleDelete()
            }}
            style={{
              textAlign: "center",
              paddingTop: "1px",
              width: "80px",
              marginLeft: "200px",
            }}
            htmlType="delete"
          >
            Delete
          </Button>
        </Form.Item>
      </Form>
    </LAYOUT>
  );
};

export default EditListPage;
