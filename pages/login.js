import styles from "../styles/Home.module.css";
import Head from "next/head";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Router from "next/router";

export default function Home() {
  const pfid = useRef("");
  const password = useRef("");
  const [enablebtn, setbtn] = useState(true);

  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  };

  const enableLogin = () => {
    if (pfid.current.value != "" && password.current.value != "") setbtn(false);
    else setbtn(true);
  };

  const login = () => {
    event.preventDefault();
    let data = {
      pfid: pfid.current.value,
      password: password.current.value,
    };
    axios
      .post("userApi/login", data)
      .then((res) => {
        console.log(res);
        toast.success(res.data.mssg);
        Router.push("/");
      })
      .catch((error) => {
        if (error.response) toast.error(error.response.data.mssg);
        else toast.error("Network Error!");
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Timesheet</title>
      </Head>

      <div className={styles.Login}>
        <form onSubmit={login}>
          <img src="logo.png" className={styles.logo}></img>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">
              <i class="fas fa-user"></i>
            </span>
            <input
              type="number"
              class={`form-control ${styles.numberInput}`}
              onChange={enableLogin}
              onKeyDown={handleEnter}
              id="pfid"
              placeholder="PFID"
              ref={pfid}
            />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">
              <i class="fas fa-lock"></i>
            </span>
            <input
              type="password"
              class="form-control"
              onChange={enableLogin}
              id="password"
              placeholder="Password"
              ref={password}
            />
          </div>
          <br />
          <button type="submit" class="btn btn-danger" disabled={enablebtn}>
            Login
          </button>
          <br /> <br />
          <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Forgot Credntials?
          </a>
        </form>
      </div>
      <br />
      <div>© 2021 NIGO Solutions</div>
      <br />
    </div>
  );
}
