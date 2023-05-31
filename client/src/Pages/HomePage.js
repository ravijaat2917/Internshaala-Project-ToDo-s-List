import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Col, Row } from "antd";
import "../index.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  var complete;

  const [lists, setLists] = useState();

  const handleCreateList = async () => {
    try {
      const res = await axios.post("/api/v1/create-list", {
        title: title,
        description: description,
        id: localStorage.getItem("token"),
      });
      if (res.data.success) {
        message.success("Task Created Successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      message.error(`Error in Creating New List`);
    }
  };

  const getAllLists = async () => {
    try {
      const res = await axios.post("/api/v1/all-lists", {
        userId: localStorage.getItem("token"),
      });
      setLists(res.data.lists);
    } catch (error) {
      console.log(error);
      message.error("Error IN Getting Lists");
    }
  };

  useEffect(() => {
    localStorage.getItem("token");
    getAllLists();
  }, []);

  if (localStorage.getItem("token")) {
    return (
      <>
        <Layout>
          <div className="HomepageTopButtons">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-bs-whatever="@mdo"
            >
              Add To Do's
            </button>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      New List
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label htmlFor="title" className="col-form-label">
                          Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          maxLength={50}
                          onChange={() => {
                            setTitle(document.getElementById("title").value);
                            if (title.length > 50) {
                              message.error(`Title Limit Exceed`);
                            }
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="description" className="col-form-label">
                          Description
                        </label>
                        <textarea
                          maxLength={120}
                          className="form-control"
                          id="description"
                          defaultValue={""}
                          onChange={() => {
                            setDescription(
                              document.getElementById("description").value
                            );
                            if (description.length > 120) {
                              message.error(`Description Limit Exceed`);
                            }
                          }}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleCreateList}
                      data-bs-dismiss="modal"
                    >
                      Save And Close
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                navigate("/recently-deleted");
              }}
            >
              Recently Deleted
            </button>
          </div>

          {lists?.length === 0 ? (
            <div className="emptyRecycleBin">
              <h2>Create a New To Do's to Get Started...</h2>
            </div>
          ) : (
            <Row gutter={16}>
              {lists &&
                lists.map((list) => (
                  <div>
                    {(complete = list.completed)}
                    <Col>
                      <Card
                        className="Card-view"
                        onClick={() => {
                          navigate(`/edit-list/${list._id}`);
                        }}
                        style={{ cursor: "pointer" }}
                        title={
                          complete === true ? (
                            <i class="fa-solid fa-circle-check titleText">
                              {
                                <span
                                  style={{
                                    marginLeft: "13px",
                                    fontSize: "medium",
                                    fontFamily: "sans-serif",
                                    fontWeight: "lighter",
                                  }}
                                  className="titleText"
                                >
                                  {list.title}
                                </span>
                              }
                            </i>
                          ) : (
                            <i class="fa-regular fa-circle-check titleText">
                              {
                                <span
                                  style={{
                                    marginLeft: "13px",
                                    fontSize: "medium",
                                    fontFamily: "sans-serif",
                                  }}
                                  className="titleText"
                                >
                                  {list.title}
                                </span>
                              }
                            </i>
                          )
                        }
                        bordered={false}
                      >
                        {list.description}
                        {/* <div className="taskStatus">
                            {complete === true ? (
                              <i class="fa-solid fa-circle-check"></i>
                            ) : (
                              <i class="fa-regular fa-circle-check"></i>
                            )}
                          </div> */}
                      </Card>
                    </Col>
                  </div>
                ))}
            </Row>
          )}
        </Layout>
      </>
    );
  } else {
    return (
      <>
        <div className="notLoggedIn">
          <h4>Not Logged In Please Login for Get Your Lists</h4>
          <button
            style={{
              marginTop: "60px",
              marginLeft: "180px",
              marginRight: "150px",
            }}
            onClick={() => {
              navigate("/login");
            }}
            className="btn btn-primary"
          >
            Login Here
          </button>
        </div>
      </>
    );
  }
};

export default HomePage;
