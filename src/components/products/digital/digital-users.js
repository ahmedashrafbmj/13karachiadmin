import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../common/breadcrumb";
import data from "../../../assets/data/digital-category";
// import Datatable from "../../common/datatable";
import DataTable from "react-data-table-component";

// import Modal from "react-responsive-modal";
import {
  Modal,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import baseurl from "../../../assets/baseurl/baseurl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Delete, Put } from "../../../Config/apibasemethod";

const Digital_Users = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  const [editingRow, setEditingRow] = useState(null);
  console.log(file, "file cat");
  const [res, setRes] = useState();

  const [image, setimage] = useState();

  const columns = [
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Name",
      selector: "name",

      sortable: true,
    },
    {
      name: "Number",
      selector: "number",

      sortable: true,
    },
    {
      name: "Address",
      selector: "address",

      sortable: true,
    },
    
    {
      name: "Status",
      selector: "status",

      sortable: true,
    },
    {
      name: "Number",
      selector: "number",

      sortable: true,
    },
    {
      name: "Business Name",
      selector: "businessname",

      sortable: true,
    },
    {
      name: "images",
      cell: (row) => (
        //   console.log(row,"row")
        <img
          src={`${row.images[0]}`} // Assuming "image" is an array and you want the first element
          alt={`Image for ${row.name}`}
          width="50"
          height="50"
        />
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="text-center">
          <button
            onClick={() => deleteRow(row?._id,"true")}
            className="btn btn-success p-2 shadow btn-xs sharp me-1"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i className="fa fa-check"></i>
            </div>
          </button>
          <button
            onClick={() => deleteRow(row?._id,"false")} // Pass the entire row
            className="btn btn-primary p-2 ms-3 shadow btn-xs sharp me-1"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i className="fa fa-xmark"></i>
            </div>
          </button>
        </div>
      ),
      disableFilters: true,
    },
  ];

  const onOpenModal = () => {
    setOpen(true);
    editRow(null);
  };
  const editRow = (row) => {
    if (row) {
      setEditingRow(row);
    //   setInputValue(row);
    } else {
      setEditingRow(null);

    //   setInputValue({ name: "", link: "" });
    }

    setOpen(true);
  };

  
  const deleteRow = (rowId,rejectorApp) => {
    const formData = new FormData()
    if(rejectorApp === "true"){
        formData.append("status","approved")


    }
    else{
        formData.append("status","rejected")

    }
    Put("updateUserStatus", rowId,formData)
      .then((response) => {
        if (response.status === 200) {
            console.log(response.data.message,"response.data.message")
          // If the delete operation is successful on the server, update the UI
        //   const updatedData = res.filter((item) => item._id !== rowId);
        //   setRes(updatedData);
        fetchDataFromServer();
          toast.success(response.data.message);
        } else {
          console.error("Failed to update the status.");
        }
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });
  };
 

  
  
 
  const fetchDataFromServer = async () => {
    try {
      // Send a GET request to your API endpoint
      const response = await axios.get(`${baseurl.url}GetAllUsers`);

      // Handle the response data, e.g., set it in state
      setRes(response.data.users);
    //   setimage(
    //     response.data.categories.map((e, i) => `${e.image[0]}`)
    //   );
      console.log(response.data);
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("GET request failed", error);
    }
  };
  console.log(image, "image");

  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetchDataFromServer();
  }, []);

  return (
    <Fragment>
      <Breadcrumb title="Users" parent="Digital" />
      {/* <!-- Container-fluid starts--> */}
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Digital Users</h5>
              </CardHeader>
              <CardBody>
                {/* <div className="btn-popup pull-right">
                  <Button
                    type="button"
                    color="secondary"
                    onClick={onOpenModal}
                    data-toggle="modal"
                    data-original-title="test"
                    data-target="#exampleModal"
                  >
                    Add Category
                  </Button>
                  <Modal isOpen={open} toggle={onCloseModal}>
                    <ModalHeader toggle={onCloseModal}>
                      <h5
                        className="modal-title f-w-600"
                        id="exampleModalLabel2"
                      >
                        Add Digital Product
                      </h5>
                    </ModalHeader>
                    <ModalBody>
                      <Form>
                        <FormGroup>
                          <Label
                            htmlFor="recipient-name"
                            className="col-form-label"
                          >
                            Name :
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            name="name"
                            defaultValue={
                              editingRow?._id ? editingRow?.name : null
                            }
                            onChange={(e) =>
                              setInputValue({
                                ...inputValue,
                                name: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label
                            htmlFor="recipient-name"
                            className="col-form-label"
                          >
                            Slug :
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            name="link"
                            defaultValue={
                              editingRow?._id ? editingRow?.link : null
                            }
                            onChange={(e) =>
                              setInputValue({
                                ...inputValue,
                                link: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label
                            htmlFor="message-text"
                            className="col-form-label"
                          >
                            Category Image : {editingRow?.images?.length}
                          </Label>
                          <Input
                            className="form-control"
                            id="validationCustom02"
                            type="file"
                            multiple
                            onChange={handleFileChange}
                          />
                        </FormGroup>
                      </Form>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        type="button"
                        color="primary"
                        onClick={() => handleFormSubmit()}
                      >
                        Save
                      </Button>
                      <Button
                        type="button"
                        color="secondary"
                        onClick={onCloseModal}
                      >
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div> */}
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  {/* <Datatable
										multiSelectOption={false}
										myData={res}
										pageSize={5}
										pagination={false}
										class="-striped -highlight"
									/> */}
                  <DataTable
                    data={res}
                    columns={columns}
                    pagination={false}
                    striped={true}
                    center={true}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <!-- Container-fluid Ends--> */}
      <ToastContainer />
    </Fragment>
  );
};

export default Digital_Users;
