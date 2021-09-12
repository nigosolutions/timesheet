import styles from "../styles/timesheet.module.css";
import { useState, useRef } from "react";
import Head from "next/head";
import Layout from "../Components/Layout";
import ImageCapture from "../Components/ImageCapture";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import { toast } from "react-toastify";
import Router from "next/router";
import { authenticate } from "../hoc/auth";

export const getServerSideProps = authenticate();

export default function Timesheet(props) {
  return (
    <Layout title="Time Sheet" user={props.name}>
      <div className={styles.container}>
        <h5>Search Timesheet</h5>
        <br />
        <div
          class="row justify-content-md-center"
          style={{ textAlign: "left" }}
        >
          <div class="col-md-3">
            <label for="sdate" class="form-label">
              Filter by Date:
            </label>
            <input type="date" class="form-control" id="sdate"></input>
          </div>
          <div class="col-md-3">
            <label for="ssite" class="form-label">
              Filter by Site:
            </label>
            <select id="ssite" class="form-select">
              <option selected>Select the site</option>
              <option>...</option>
            </select>
          </div>
          <div class="col-md-3">
            <label for="spfid" class="form-label">
              Filter by PFID:
            </label>
            <input
              type="number"
              class="form-control"
              id="spfid"
              placeholder="Enter PFID"
            ></input>
          </div>

          <button
            type="button"
            class="btn btn-danger col-auto"
            style={{ marginTop: "auto" }}
          >
            <i class="bi bi-search"></i>&nbsp;&nbsp;Search
          </button>
        </div>
      </div>
    </Layout>
  );
}
