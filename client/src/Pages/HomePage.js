import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateList = async () => {
    try {
      const res = await axios.post("/api/v1/create-list", {
        title: title,
        description: description,
        id: localStorage.getItem("token"),
      });
    } catch (error) {
      console.log(error);
      message.error(`Error in Creating New List`);
    }
  };

  useEffect(() => {
    localStorage.getItem("token");
  }, []);

  if (localStorage.getItem("token")) {
    return (
      <>
        <Layout>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="@mdo"
          >
            Add List
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
                  >
                    Save And Close
                  </button>
                </div>
              </div>
            </div>
          </div>
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
