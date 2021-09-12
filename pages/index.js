import styles from "../styles/dashboard.module.css";
import { useState, useRef } from "react";
import Layout from "../Components/Layout";
import ImageCapture from "../Components/ImageCapture";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import { toast } from "react-toastify";
import Router from "next/router";
import { authenticate } from "../hoc/auth";

export const getServerSideProps = authenticate();

export default function Dashboard(props) {
  const [addPass_Sites_SelectedValues, set_AddPass_Sites_SelectedValues] =
    useState([]);
  const [tableRowsMultipleSites, set_tableRowsMultipleSites] = useState([]);
  const newRow_pfid = useRef("");
  const newRow_referenceNo = useRef("");
  const newRow_upload = useRef(null);
  const [startCamera, setstartCamera] = useState(false);
  const PFID = useRef("");
  const REF = useRef("");
  const DI = useRef("");
  const DE = useRef("");

  const clearFieldsforEntry = () => {
    PFID.current.value = "";
    REF.current.value = "";
    DI.current.value = "";
    DE.current.value = "";
    set_AddPass_Sites_SelectedValues([]);
  };

  const SingleEntry = () => {
    event.preventDefault();
    let data = {
      PFID: PFID.current.value,
      REF: REF.current.value,
      DI: DI.current.value,
      DE: DE.current.value,
      SITE: addPass_Sites_SelectedValues,
    };
    axios
      .post("passApi/addPass", data)
      .then((res) => {
        console.log(res);
        toast.success(res.data.mssg);
        document.getElementById("singleEntryClose").click();
      })
      .catch((error) => {
        if (error.response) toast.error(error.response.data.mssg);
        else toast.error("Network Error!");
      });
  };

  const onSelect_addPass_Sites = (item) => {
    let sites = [...addPass_Sites_SelectedValues];
    sites.push(item);
    set_AddPass_Sites_SelectedValues(sites);
  };

  const onRemove_addPass_Sites = (list) => {
    set_AddPass_Sites_SelectedValues(list);
  };

  const addTableRowMultipleSites = (pfid, refernceNo, upload = null) => {
    if (pfid) {
      let tableRows = [...tableRowsMultipleSites];
      let row = {
        pfid: pfid,
        refernceNo: refernceNo,
        upload: upload,
      };
      tableRows.push(row);
      set_tableRowsMultipleSites(tableRows);
      newRow_pfid.current.value = newRow_referenceNo.current.value = "";
    } else {
      toast.error("Please enter a PFID");
    }
  };

  return (
    <Layout title="Pass Manager" user={props.name}>
      <div className={styles.container}>
        <div class="row">
          <div class="col-sm-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Add Passes</h5>
                <p class="card-text">You can add gate passes here!</p>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end ">
                  <a
                    class="btn btn-dark"
                    role="button"
                    data-bs-toggle="modal"
                    href="#sentry"
                  >
                    Single Entry
                  </a>
                  <div
                    class="modal fade"
                    id="sentry"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    data-bs-backdrop="static"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">
                            Single Entry
                          </h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={clearFieldsforEntry}
                          ></button>
                        </div>
                        <div class="modal-body">
                          <div class="mb-3">
                            <label
                              for="formGroupExampleInput"
                              class="form-label"
                            >
                              PFID:
                            </label>
                            <input
                              type="number"
                              class="form-control"
                              id="PFID"
                              placeholder="Enter PFID No."
                              ref={PFID}
                            ></input>
                          </div>
                          <div class="mb-3">
                            <label
                              for="formGroupExampleInput"
                              class="form-label"
                            >
                              Select Site(s):
                            </label>
                            <Multiselect
                              options={[
                                { name: "Site 1", id: 1 },
                                { name: "Site 2", id: 2 },
                                { name: "Site 3", id: 3 },
                              ]} // Options to display in the dropdown
                              selectedValues={addPass_Sites_SelectedValues}
                              onSelect={(selectedList, selectedItem) =>
                                onSelect_addPass_Sites(selectedItem)
                              }
                              onRemove={(selectedList, removedItem) =>
                                onRemove_addPass_Sites(selectedList)
                              }
                              displayValue="name"
                              avoidHighlightFirstOption={true}
                              showArrow={true}
                            />
                          </div>
                          <div class="mb-3">
                            <label
                              for="formGroupExampleInput"
                              class="form-label"
                            >
                              Pass Reference No:
                            </label>
                            <input
                              type="number"
                              class="form-control"
                              id="REF"
                              placeholder="Enter Pass Reference No."
                              ref={REF}
                            ></input>
                          </div>
                          <div class="row g-3">
                            <div class="col-md-6">
                              <label
                                for="formGroupExampleInput2"
                                class="form-label"
                              >
                                Date of Issue:
                              </label>
                              <input
                                type="date"
                                class="form-control"
                                id="DI"
                                placeholder="Select IssueDate"
                                ref={DI}
                              ></input>
                            </div>
                            <div class="col-md-6">
                              <label
                                for="formGroupExampleInput2"
                                class="form-label"
                              >
                                Date of Expiry:
                              </label>
                              <input
                                type="date"
                                class="form-control"
                                id="formGroupExampleInput2"
                                placeholder="Select Expiry Date"
                                ref={DE}
                              ></input>
                            </div>
                          </div>
                          <br />
                          <div class="mb-3">
                            <label
                              for="formGroupExampleInput2"
                              class="form-label"
                            >
                              Upload Pass:
                            </label>
                            <div class="row g-3">
                              <div class="col-md-6">
                                <input
                                  type="file"
                                  class="form-control"
                                  id="formGroupExampleInput2"
                                  placeholder="Upload file"
                                ></input>
                              </div>
                              <div class="col-md-6">
                                OR &nbsp;&nbsp;
                                <button
                                  type="button"
                                  class="btn btn-dark"
                                  data-bs-dismiss="modal"
                                  data-bs-target="#captureImage"
                                  data-bs-toggle="modal"
                                  onClick={() => setstartCamera(true)}
                                >
                                  Capture Image
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-dark"
                            data-bs-dismiss="modal"
                            id="singleEntryClose"
                            onClick={clearFieldsforEntry}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={SingleEntry}
                            type="button"
                            class="btn btn-danger"
                          >
                            Add Pass
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ====== IMAGE CAPTURE MODAL START ====== */}
                  <div
                    class="modal fade"
                    id="captureImage"
                    aria-hidden="true"
                    aria-labelledby="captureImage"
                    tabindex="-1"
                  >
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="captureImage">
                            Capture Pass Image
                          </h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          {startCamera ? <ImageCapture /> : null}
                        </div>
                        <div class="modal-footer">
                          <button
                            class="btn btn-dark"
                            data-bs-target="#sentry"
                            data-bs-toggle="modal"
                            onClick={() => setstartCamera(false)}
                          >
                            Cancel
                          </button>
                          <button
                            class="btn btn-danger"
                            data-bs-target="#sentry"
                            data-bs-toggle="modal"
                            onClick={() => setstartCamera(false)}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ====== IMAGE CAPTURE MODAL END ====== */}

                  <button
                    type="button"
                    class="btn btn-dark"
                    data-bs-toggle="modal"
                    data-bs-target="#mentry"
                  >
                    Multiple Entries
                  </button>

                  {/* ====== MULTIPLE ENTRY MODAL START ====== */}
                  <div
                    class="modal fade"
                    id="mentry"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">
                            Multiple Entries
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
                            <label
                              for="formGroupExampleInput"
                              class="form-label"
                            >
                              Select Site(s):
                            </label>
                            <Multiselect
                              options={[
                                { name: "Site 1", id: 1 },
                                { name: "Site 2", id: 2 },
                                { name: "Site 3", id: 3 },
                              ]} // Options to display in the dropdown
                              selectedValues={addPass_Sites_SelectedValues}
                              onSelect={(selectedList, selectedItem) =>
                                onSelect_addPass_Sites(selectedItem)
                              }
                              onRemove={(selectedList, removedItem) =>
                                onRemove_addPass_Sites(selectedList)
                              }
                              displayValue="name"
                              avoidHighlightFirstOption={true}
                              showArrow={true}
                            />
                          </div>
                          <div class="row g-3">
                            <div class="col-md-6">
                              <label
                                for="formGroupExampleInput2"
                                class="form-label"
                              >
                                Date of Issue:
                              </label>
                              <input
                                type="date"
                                class="form-control"
                                id="formGroupExampleInput2"
                                placeholder="Date of Issue"
                                ref={DI}
                              ></input>
                            </div>
                            <div class="col-md-6">
                              <label
                                for="formGroupExampleInput2"
                                class="form-label"
                              >
                                Date of Expiry:
                              </label>
                              <input
                                type="date"
                                class="form-control"
                                id="formGroupExampleInput2"
                                placeholder="Date of Expiry"
                                ref={DE}
                              ></input>
                            </div>
                            <table class="table table-hover" id="tablee">
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">PFID</th>
                                  <th scope="col">Pass No.</th>
                                  <th scope="col">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {tableRowsMultipleSites
                                  ? tableRowsMultipleSites.map((row, index) => (
                                      <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{row.pfid}</td>
                                        <td>{row.refernceNo}</td>
                                        <td>
                                          <i
                                            class={`${styles.clickableGreen} fas fa-eye`}
                                          ></i>
                                          &nbsp;&nbsp;
                                          <i
                                            class={`${styles.clickableRed} fas fa-trash`}
                                          ></i>
                                        </td>
                                      </tr>
                                    ))
                                  : null}
                                <tr>
                                  <th scope="row">New</th>
                                  <td>
                                    <input
                                      type="number"
                                      class="form-control form-control-sm"
                                      id="exampleFormControlInput1"
                                      placeholder="Enter PFID"
                                      ref={newRow_pfid}
                                    ></input>
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      class="form-control form-control-sm"
                                      id="exampleFormControlInput1"
                                      placeholder="Ente Ref No."
                                      ref={newRow_referenceNo}
                                    ></input>
                                  </td>
                                  <td>
                                    <button
                                      class="btn btn-dark btn-sm"
                                      type="button"
                                    >
                                      Upload Pass
                                    </button>
                                    <button
                                      class="btn btn-danger btn-sm ms-1"
                                      type="button"
                                      onClick={() =>
                                        addTableRowMultipleSites(
                                          newRow_pfid.current.value,
                                          newRow_referenceNo.current.value
                                        )
                                      }
                                    >
                                      <i class="fas fa-save"></i>
                                    </button>
                                    {/* <input
                                      type="file"
                                      class="form-control"
                                      id="formGroupExampleInput2"
                                      placeholder="Upload file"
                                    ></input> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
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
                            Add Passes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ====== MULTIPLE ENTRY MODAL END ====== */}
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Update Passes</h5>
                <p class="card-text">
                  You can update the stored gate passes here!
                </p>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end ">
                  <a
                    href="#"
                    class="btn btn-dark"
                    data-bs-toggle="modal"
                    data-bs-target="#upass"
                  >
                    Update
                  </a>
                </div>
                <div
                  class="modal fade"
                  id="upass"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Modify Pass
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <h6>Search Pass:</h6>
                        <div class="row g-3">
                          <div class="col-md-6">
                            <label
                              for="formGroupExampleInput2"
                              class="form-label"
                            >
                              PFID:
                            </label>
                            <input
                              type="number"
                              class="form-control"
                              id="formGroupExampleInput2"
                              placeholder="Enter PFID"
                            ></input>
                          </div>
                          <div class="col-md-6">
                            <label
                              for="formGroupExampleInput2"
                              class="form-label"
                            >
                              Gate Pass Reference No.:
                            </label>
                            <input
                              type="number"
                              class="form-control"
                              id="formGroupExampleInput2"
                              placeholder="Enter Reference No."
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-dark"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button type="button" class="btn btn-danger">
                          Search
                        </button>

                        <table class="table table-hover">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Site(s)</th>
                              <th scope="col">Date of Expiry</th>
                              <th scope="col">Actions</th>
                              <th scope="col">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">1</th>
                              <td>Mark</td>
                              <td>Otto</td>
                              <td>
                                <a class="me-1" href="">
                                  <span class="badge bg-dark">
                                    {" "}
                                    <i class="fas fa-edit"> </i> Modify
                                  </span>
                                </a>

                                <a href="">
                                  <span class="badge bg-danger">
                                    {" "}
                                    <i class="fas fa-ban"> </i> Cancel
                                  </span>
                                </a>
                              </td>
                              <td>Cancelled</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">View/Download Passes</h5>
                <p class="card-text">
                  You can view and download the stored gate passes here!
                </p>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end ">
                  <a
                    href="#"
                    class="btn btn-dark"
                    data-bs-toggle="modal"
                    data-bs-target="#vpass"
                  >
                    View/Download
                  </a>
                </div>
                <div
                  class="modal fade"
                  id="vpass"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          View/Download Pass
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <h6>Search Pass:</h6>
                        <div class="row g-3">
                          <div class="col-md-6">
                            <label
                              for="formGroupExampleInput2"
                              class="form-label"
                            >
                              PFID:
                            </label>
                            <input
                              type="number"
                              class="form-control"
                              id="formGroupExampleInput2"
                              placeholder="Enter PFID"
                            ></input>
                          </div>
                          <div class="col-md-6">
                            <label
                              for="formGroupExampleInput2"
                              class="form-label"
                            >
                              Gate Pass Reference No.:
                            </label>
                            <input
                              type="number"
                              class="form-control"
                              id="formGroupExampleInput2"
                              placeholder="Enter Reference No."
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-dark"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button type="button" class="btn btn-danger">
                          Search
                        </button>

                        <table class="table table-hover">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Site(s)</th>
                              <th scope="col">Date of Expiry</th>
                              <th scope="col">Actions</th>
                              <th scope="col">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">1</th>
                              <td>Mark</td>
                              <td>Otto</td>
                              <td>
                                <a class="me-1" href="">
                                  <span class="badge bg-dark">
                                    {" "}
                                    <i class="fas fa-edit"> </i> View
                                  </span>
                                </a>

                                <a href="">
                                  <span class="badge bg-danger">
                                    {" "}
                                    <i class="fas fa-ban"> </i> Download
                                  </span>
                                </a>
                              </td>
                              <td>Cancelled</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <h4>Expiring Passes : </h4>
        <table class="table">
          <thead class="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">PFID</th>
              <th scope="col">Name</th>
              <th scope="col">Site</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>
                <button type="button" class="btn btn-danger btn-sm">
                  <i class="fas fa-sync"></i> Update
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
