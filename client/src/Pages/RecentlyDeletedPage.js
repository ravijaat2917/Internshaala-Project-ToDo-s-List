import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Col, Row } from "antd";
import { Button, Modal } from "antd";

const RecentlyDeletedPage = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleRestore = () => {
    setOpen(false);
  };
  const deleteAll = async () => {
    const res = await axios.post("/api/v1/delete", {
      id: localStorage.getItem("token"),
    });
    if (res.data.success) {
      message.success("Deleted Successfully");
      window.location.reload();
    }
  };
  const handeDelete = async () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  var complete;

  const [lists, setLists] = useState();

  const getAllLists = async () => {
    try {
      const res = await axios.post("/api/v1/deleted-lists", {
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
              onClick={() => {
                navigate("/");
              }}
              type="button"
              className="btn btn-primary"
            >
              Back To Home
            </button>
            <button
              type="button"
              onClick={deleteAll}
              className="btn btn-danger"
            >
              Delete All
            </button>
          </div>

          {lists?.length === 0 ? (
            <div className="emptyRecycleBin">
              <h2>Your Recyclebin Is Empty...</h2>
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
                        type="button"
                        onClick={showModal}
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
                        <Modal
                          open={open}
                          title="Alert"
                          footer={[
                            <Button
                              key="back"
                              onClick={async () => {
                                try {
                                  const res = await axios.post(
                                    "/api/v1/restore",
                                    {
                                      id: list._id,
                                    }
                                  );
                                  if (res.data.success) {
                                    window.location.reload();
                                    message.success("Restored Successfully");
                                  } else {
                                    message.error("Error in Getting Restored");
                                  }
                                } catch (error) {
                                  message.error("Error in Restoring List");
                                  window.location.reload();
                                  console.log(error);
                                }
                              }}
                            >
                              Restore
                            </Button>,
                            <Button
                              key="submit"
                              type="primary"
                              loading={loading}
                              onClick={async () => {
                                try {
                                  const res = await axios.post(
                                    "/api/v1/delete-single",
                                    {
                                      id: list._id,
                                    }
                                  );
                                  if (res.data.success) {
                                    window.location.reload();
                                    message.success("Deleted Successfully");
                                  } else {
                                    message.error("Error in Getting Deleted");
                                  }
                                } catch (error) {
                                  message.error("Error in Deleting List");
                                  window.location.reload();
                                  console.log(error);
                                }
                              }}
                            >
                              Delete
                            </Button>,
                          ]}
                        >
                          <p>Take An Action</p>
                        </Modal>

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

  //   return (
  //     <LAYOUT>
  //       <div>Your Recently Deleted To Do's Lists Are Here</div>
  //       <div className="HomepageTopButtons">
  //         <button type="button" className="btn btn-success">
  //           Restore All
  //         </button>
  //         <button type="button" className="btn btn-danger">
  //           Delete All
  //         </button>
  //       </div>
  //       <div></div>
  //     </LAYOUT>
  //   );
};

export default RecentlyDeletedPage;
