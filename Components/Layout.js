import React from "react";
import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";

const Layout = ({ children, title, user }) => {
  const logout = () => {
    axios
      .get("userApi/logout")
      .then((res) => {
        Router.push("/login");
      })
      .catch((error) => {
        toast.error("Network Error!");
      });
  };

  return (
    <div>
      <div className="dash">
        <img src="logo.png" className="logo"></img>
        <h2 className="dash-text">{title}</h2>
        <div className="dash-div"></div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">
                    Pass Manager
                  </a>
                </li>
              </ul>
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="bi bi-person-circle fa-lg"></i>
                    &nbsp;&nbsp;{user}&nbsp;&nbsp;
                  </a>
                  <ul
                    class="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdown"
                  >
                    <a
                      class="dropdown-item"
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Change Password
                    </a>
                    <hr class="dropdown-divider"></hr>
                    <button class="dropdown-item" onClick={logout}>
                      Logout
                    </button>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Change Password
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="mb-3">
                    <label for="formGroupExampleInput" class="form-label">
                      Old Password:
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      id="formGroupExampleInput"
                      placeholder="Enter old password"
                    ></input>
                  </div>
                  <div class="mb-3">
                    <label for="formGroupExampleInput2" class="form-label">
                      New Password:
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      id="formGroupExampleInput2"
                      placeholder="Enter new password"
                    ></input>
                  </div>
                  <div class="mb-3">
                    <label for="formGroupExampleInput2" class="form-label">
                      Renter New Password:
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      id="formGroupExampleInput2"
                      placeholder="Enter new password"
                    ></input>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-dark"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-danger">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <br />
        {children}
      </div>
    </div>
  );
};

export default Layout;
