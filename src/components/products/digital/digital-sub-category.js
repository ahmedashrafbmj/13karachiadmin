import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../common/breadcrumb";
import data from "../../../assets/data/digital-sub-category";
// import Datatable from "../../common/datatable";
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
import axios from "axios";
import DataTable from "react-data-table-component";
import baseurl from "../../../assets/baseurl/baseurl";
import { toast } from "react-toastify";
import { Delete } from "../../../Config/apibasemethod";

const Digital_sub_category = () => {
  const [open, setOpen] = useState(false);
  const [res, setRes] = useState();
  const [file, setFile] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [cat, setResCategory] = useState();
  const [image, setimage] = useState();
  const [SelectedCategory, setSelectedCategory] = useState([]);
  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },

    {
      name: "Category",
      selector: "categories",
      sortable: true,
    },
    // {
    //   name: "Brands",
    //   selector: "brand",
    //   sortable: true,
    // },
    {
      name: "images",
      cell: (row) => (
        //   console.log(row,"row")
        <img
          src={`${baseurl.image + row.images[0]}`} // Assuming "image" is an array and you want the first element
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
            onClick={() => editRow(row)}
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
            onClick={() => deleteRow(row?._id)} // Pass the entire row
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
  const deleteRow = (rowId) => {
    Delete("deletesubCategories", rowId)
      .then((response) => {
        if (response.status === 200) {
          // If the delete operation is successful on the server, update the UI
          const updatedData = res.filter((item) => item._id !== rowId);
          setRes(updatedData);
          toast.success("Successfully Deleted !");
        } else {
          console.error("Failed to delete the item.");
        }
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };
  const onOpenModal = () => {
    setOpen(true);
    editRow(null);
  };
  const editRow = (row) => {
    // console.log(row, "rooww");
    setOpen(true);
    if (row) {
      setEditingRow(row);
      setInputValue(row);
    } else {
      setEditingRow(null);

      setInputValue({ name: "", link: "" });
    }
  };

  const onCloseModal = () => {
    setOpen(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value, // Use the input field's name as the key
    });
  };
  const [inputValue, setInputValue] = useState({ name: "" });
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    console.log(file);
    setFile(e.target.files);
  };

  const handleFormSubmit = async () => {
    // Create a FormData object and append the file to it
    const formData = new FormData();
    const filesArray = Array.from(file);
    filesArray.map((file, i) => formData.append("images", file));
    formData.append("name", inputValue.name);

    SelectedCategory.map((e, i) => formData.append(`categories[${i}]`, e?._id));
    // selectedBrands.map((e, i) => formData.append(`brand[${i}]`, e?._id));

    if (editingRow?._id) {
      try {
        // Send a PUT request to update the product
        const response = await axios.put(
          `${baseurl.url}updatesubCategories/${editingRow?._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Important for sending form data
            },
          }
        );

        if (response.status === 200) {
          // Handle success
          console.log("subCategories updated successfully");
          setOpen(false);

          window.location.reload();

          toast.success("brand updated successfully");
        } else {
          // Handle errors
          console.error("Failed to update product");
        }
      } catch (error) {
        // Handle errors, e.g., show an error message
        console.error("Update failed", error);
      }
    } else {
      try {
        // Send a POST request to your API endpoint
        const response = await axios.post(
          `${baseurl.url}addsubCategory`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Important for sending form data
            },
          }
        );

        // Handle the response, e.g., show a success message
        if (response.data.status) {
          console.log(response.data.message, "response.data.message");
          toast.success("Successfully added !");
          const updatedData = res.filter(
            (item) => item._id !== editingRow?._id
          );
          setRes(updatedData);
        }
        window.location.reload();
        setOpen(false);
        console.log("Upload successful", response);
      } catch (error) {
        // Handle errors, e.g., show an error message
        console.error("Upload failed", error);
      }
    }
  };
  const fetchDataFromServer = async () => {
    try {
      // Send a GET request to your API endpoint
      const response = await axios.get(`${baseurl.url}getsubCategories`);

      // Handle the response data, e.g., set it in state
      setRes(response.data.categories);
      setimage(
        response.data.brands.map((e, i) => `${baseurl.image + e.image[0]}`)
      );
      handleFormSubmit();
      fetchDataFromServer();
      console.log(response.data, "response.data");
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("GET request failed", error);
    }
  };

  const fetchDataFromServercat = async () => {
    try {
      // Send a GET request to your API endpoint
      const response = await axios.get(`${baseurl.url}getCategories`);
      // Handle the response data, e.g., set it in state
      setResCategory(response.data.categories);
      console.log(response.data, "response.da");
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("GET request failed", error);
    }
  };

  const handleCheckboxChange = (e, type) => {
    const brandId = e.target.value;
    const isChecked = e.target.checked;
    console.log(isChecked, "eeeeeeeee", type, "type");

    if (isChecked) {
      // If the checkbox is checked, add the brand to the selectedBrands array

      setSelectedCategory([...SelectedCategory, { _id: brandId }]);
    } else {
      setSelectedCategory(
        SelectedCategory.filter((brand) => brand._id !== brandId)
      );

      // If the checkbox is unchecked, remove the brand from the selectedBrands array
    }
  };
  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetchDataFromServer();
    fetchDataFromServercat();
  }, []);
  return (
    <Fragment>
      <Breadcrumb title="Sub Category" parent="Digital" />
      {/* <!-- Container-fluid starts--> */}
      <Container fluid="true">
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Digital Sub Category</h5>
              </CardHeader>
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button
                    type="button"
                    color="secondary"
                    onClick={onOpenModal}
                    data-toggle="modal"
                    data-original-title="test"
                    data-target="#exampleModal"
                  >
                    Add Sub Category
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
                            Sub Category Name :
                          </Label>
                          <Input
                            onChange={(e) =>
                              setInputValue({
                                ...inputValue,
                                name: e.target.value,
                              })
                            }
                            type="text"
                            className="form-control"
                            defaultValue={
                              editingRow?._id ? editingRow?.name : null
                            }
                          />
                        </FormGroup>
                        <p>Select Categories</p>
                        {cat?.map((e, i) => {
                          const isChecked = editingRow?.categories?.includes(
                            e?.name
                          ); // Invert the value

                          return (
                            <FormGroup check key={i}>
                              <Label check>
                                <Input
                                  type="checkbox"
                                  name="isChecked"
                                  value={e?._id}
                                  defaultChecked={isChecked} // Use defaultChecked for checkboxes
                                  onChange={(event) =>
                                    handleCheckboxChange(
                                      event,
                                      "selectedCategory"
                                    )
                                  }
                                />{" "}
                                {e?.name}
                              </Label>
                            </FormGroup>
                          );
                        })}
                        <FormGroup>
                          <Label
                            htmlFor="message-text"
                            className="col-form-label"
                          >
                            Sub Category Image : {editingRow?.images?.length}
                          </Label>
                          <Input
                            className="form-control"
                            id="validationCustom02"
                            type="file"
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
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
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
    </Fragment>
  );
};

export default Digital_sub_category;
