import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Breadcrumb from "../../common/breadcrumb";
import Breadcrumb from "../breadcrumb";
// import MyDropzone from "../../common/dropzone";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import // Button,
// Form,
// FormGroup,
// Input,
// Label,
// Modal,
// ModalBody,
// ModalFooter,
// ModalHeader,
"reactstrap";
import { Delete, Get, Put } from "../../../Config/apibasemethod";
import baseurl from "../../../assets/baseurl/baseurl";
import { Modal } from "react-bootstrap";
// import { Label } from "reactstrap";
// import axios from "axios";

const OrderData = ({ myData, myClass, multiSelectOption, pagination }) => {
  console.log(myData, "propdata");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [SelectedCategory, setSelectedCategory] = useState([]);
  const [editingSelectedBrands, setEditingSelectedBrands] = useState([]);

  const [open, setOpen] = useState(false);
  const [checkedValues, setCheckedValues] = useState([]);
  const [inpdata, setinpData] = useState({
    name: "", // Add default values for other fields as well
    price: "",
    discountedPrice: "",
    shortDescription: "",
    totalUnits: "",
    ProductLink: "",
    longDescription: "",

    // Add default values for other fields
  });
  const [brands, setResBrands] = useState();
  const [editingRow, setEditingRow] = useState(null);

  const [data, setData] = useState(myData);
  const [InputValue, setInputValue] = useState([]);

  const [show, setShow] = useState(false);
  const [apidata, setapidata] = useState([]);
  const [cat, setResCategory] = useState();
  //   const [brands, setResBrands] = useState();
  //   const [selectedBrands, setSelectedBrands] = useState([]);
  //   const [SelectedCategory, setSelectedCategory] = useState([]);
  const [file, setFile] = useState([]);
  console.log(typeof file, "fileeeeee");
  // const selectRow = (e, i) => {
  // 	if (!e.target.checked) {
  // 		setCheckedValues(checkedValues.filter((item, j) => i !== item));
  // 	} else {
  // 		checkedValues.push(i);
  // 		setCheckedValues(checkedValues);
  // 	}
  // };
  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    const filesArray = Array.from(selectedFiles);
    setFile(filesArray);

    // Update the file state with the selected files

    // if (file) {
    //   const reader = new FileReader();

    //   reader.onload = (e) => {
    // 	const binaryData = e.target.result; // Binary data as ArrayBuffer
    // 	// Do something with the binary data, for example, send it to a server or process it in your component
    //   };

    //   reader.readAsArrayBuffer(file); // Start reading the file as ArrayBuffer
    // }
  };
  const fetchDataFromServerBrands = async () => {
    try {
      // Send a GET request to your API endpoint
      const response = await axios.get(`${baseurl.url}getBrand`);

      // Handle the response data, e.g., set it in state
      setResBrands(response.data.brands);

      console.log(response.data, "response.data");
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("GET request failed", error);
    }
  };
  const fetchDataFromServer = async () => {
    try {
      // Send a GET request to your API endpoint
      const response = await axios.get(`${baseurl.url}getCategories`);
      // Handle the response data, e.g., set it in state
      setResCategory(response.data.categories);
      console.log(response.data);
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("GET request failed", error);
    }
  };
  console.log(inpdata, "inpdata");
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(
  //     setInputValue({
  //       ...inputValue,
  //       [name]: value, // Update the specific field in the state based on the input name
  //     })
  //   );
  // };

  // const handleEditFormSubmit = async () => {
  //   const formData = new FormData();

  //   formData.append("name", inpdata.name);
  //   formData.append("price", inpdata.price);
  //   formData.append("discountedPrice", inpdata.discountedPrice);
  //   formData.append("shortDescription", inpdata.shortDescription);
  //   formData.append("totalUnits", inpdata.totalUnits);
  //   formData.append("ProductLink", inpdata.ProductLink);
  //   formData.append("longDescription", inpdata.longDescription);

  //   SelectedCategory.map((e, i) => formData.append(`category[${i}]`, e._id));
  //   selectedBrands.map((e, i) => formData.append(`brand[${i}]`, e._id));

  //   const filesArray = Array.from(file);
  //   filesArray.forEach((filess, index) => {
  //     formData.append(`images`, filess.originFileObj);
  //   });

  //   Put("updateProduct", editingRow._id, formData)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  //   console.log(formData, "formData");
  // };
  //   const handleEditFormSubmit = async () => {
  //     const formData = new FormData();

  //     // Append the fields you want to update
  //     formData.append("name", inpdata.name);
  //     formData.append("price", inpdata.price);
  //     formData.append("discountedPrice", inpdata.discountedPrice);
  //     formData.append("shortDescription", inpdata.shortDescription);
  //     formData.append("totalUnits", inpdata.totalUnits);
  //     formData.append("ProductLink", inpdata.ProductLink);
  //     formData.append("longDescription", inpdata.longDescription);

  //     // Append selected categories and brands
  //     SelectedCategory.map((e, i) => formData.append(`category[${i}]`, e?._id));
  //     selectedBrands.map((e, i) => formData.append(`brand[${i}]`, e?._id));
  //     console.log(selectedBrands, "selectedBrands");
  //     // Append the updated images
  //     if (Array.isArray(file) && file.length > 0) {
  //       // Only proceed if 'file' is an array and not empty
  //       file.forEach((filess, index) => {
  //         formData.append(`images`, filess.name);
  //       });
  //     }

  //     try {
  //       // Send a PUT request to update the product
  //       const response = await axios.put(
  //         `${baseurl.url}updateProduct/${editingRow._id}`,
  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data", // Important for sending form data
  //           },
  //         }
  //       );

  //       if (response.status === 200) {
  //         // Handle success
  //         console.log("Product updated successfully");

  //         setShow(false);
  //         toast.success("Product updated successfully");
  //         setSelectedBrands("");
  //         setSelectedCategory("");
  //         getData();

  //         // const updatedData1 = apidata?.filter(
  //         //   (item) => item?._id !== editingRow?._id
  //         // );
  //         // console.log("updatedData:", editingRow?._id);

  //         // setapidata(updatedData1);
  //         // console.log("apidata after update:", apidata);
  //         // // Close the modal or perform any other action you want.
  //       } else {
  //         // Handle errors
  //         console.error("Failed to update product");
  //       }
  //     } catch (error) {
  //       // Handle errors, e.g., show an error message
  //       console.error("Update failed", error);
  //     }
  //   };
  //   // Create a FormData object and append the file to it
  //   const formData = new FormData();
  //   // formData.append('images', file);

  //   formData.append("name", inputValue.name);
  //   formData.append("price", inputValue.price);
  //   formData.append("discountedPrice", inputValue.discountedPrice);
  //   // formData.append("menuProductNumber", inputValue.menuProductNumber);
  //   formData.append("shortDescription", inputValue.shortDescription);
  //   formData.append("totalUnits", inputValue.totalUnits);
  //   formData.append("ProductLink", inputValue.ProductLink);
  //   formData.append("longDescription", inputValue.longDescription);
  //   SelectedCategory.map((e, i) => formData.append(`category[${i}]`, e._id));
  //   selectedBrands.map((e, i) => formData.append(`brand[${i}]`, e._id));
  //   // formData.append(`images`, file);
  //   const filesArray = Array.from(file);
  //   filesArray.forEach((filess, index) => {
  //     formData.append(`images`, filess);
  //   });

  //   try {
  //     // Send a POST request to your API endpoint
  //     const response = await axios.post(`${baseurl.url}addProduct`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data", // Important for sending form data
  //       },
  //     });
  //     console.log(response.data.status, "response response");
  //     // Handle the response, e.g., show a success message
  //     if (response.data.status === true) {
  //       alert(response.data.message);
  //       window.location.reload();
  //       setInputValue({
  //         name: "",
  //         price: "",
  //         discountedPrice: "",
  //         // menuProductNumber: "",
  //         totalUnits: "",
  //         shortDescription: "",
  //         longDescription: "",
  //         ProductLink: "",
  //       });
  //       toast.success("Successfully Added !");

  //       // fetchDataFromServer()
  //       // onCloseModal()
  //     }
  //     console.log("Upload successful", response);
  //   } catch (error) {
  //     // Handle errors, e.g., show an error message
  //     console.error("Upload failed", error);
  //   }
  // };

  //   const handleRemoveRow = () => {
  //     const updatedData = myData.filter(function (el) {
  //       return checkedValues.indexOf(el.id) < 0;
  //     });
  //     setData([...updatedData]);
  //     toast.success("Successfully Deleted !");
  //   };
  const handleClose = () => {
    // SubmitReviews();
    setShow(false);
  };
  // const renderEditable = (cellInfo) => {
  // 	return (
  // 		<div
  // 			style={{ backgroundColor: "#fafafa" }}
  // 			contentEditable
  // 			suppressContentEditableWarning
  // 			onBlur={(e) => {
  // 				data[cellInfo.index][cellInfo.index.id] = e.target.innerHTML;
  // 				setData({ myData: data });
  // 			}}
  // 			dangerouslySetInnerHTML={{
  // 				__html: myData[cellInfo.index][cellInfo.index.id],
  // 			}}
  // 		/>
  // 	);
  // };
  const handleCheckboxChange = (e, type) => {
    const brandId = e.target.value;
    const isChecked = e.target.checked;
    console.log(brandId, "eeeeeeeee", type, "type");

    if (isChecked) {
      // If the checkbox is checked, add the brand to the selectedBrands array
      if (type === "selectedBrand") {
        setSelectedBrands([...selectedBrands, { _id: brandId }]);
      } else {
        setSelectedCategory([...SelectedCategory, { _id: brandId }]);
      }
    } else {
      if (type === "selectedBrand") {
        setSelectedBrands(
          selectedBrands.filter((brand) => brand._id !== brandId)
        );
      } else {
        setSelectedCategory(
          SelectedCategory.filter((brand) => brand._id !== brandId)
        );
      }
      // If the checkbox is unchecked, remove the brand from the selectedBrands array
    }
  };
  console.log(selectedBrands, "selectedBrands");
  console.log(SelectedCategory, "SelectedCategory");
  // const handleDelete = (index) => {
  //   if (window.confirm("Are you sure you wish to delete this item?")) {
  //     const del = data;
  //     del.splice(index, 1);
  //     setData([...del]);
  //   }
  //   toast.success("Successfully Deleted !");
  // };
  // const onOpenModal = () => {
  // 	setOpen(true);
  // };

  // const onCloseModal = () => {
  // 	setOpen(false);
  // };

  // const Capitalize = (str) => {
  // 	return str.charAt(0).toUpperCase() + str.slice(1);
  // };

  const getData = () => {
    Get("GetAllOrders")
      .then((res) => {
        console.log(res.data, "resss");
        setapidata(res.data.posts);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getData();
    fetchDataFromServerBrands();
    fetchDataFromServer();
  }, []);

  const deleteRow = (rowId) => {
    Delete("deleteProduct", rowId)
      .then((response) => {
        if (response.status === 200) {
          // If the delete operation is successful on the server, update the UI
          const updatedData = apidata.filter((item) => item._id !== rowId);
          setapidata(updatedData);
          toast.success("Successfully Deleted !");
        } else {
          console.error("Failed to delete the item.");
        }
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };
  let abcd;
  const editRow = (row) => {
    console.log(row.brand[0], "rooww");
    abcd = row.brand[0];
    setEditingRow(row);
    setinpData(row);

    setShow(true);
  };
  console.log(editingRow, "abcd");

  const columns = [
    {
      name: " First Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Last Name",
      selector: "lastName",
      sortable: true,
    },
    {
      name: "Number",
      selector: "contact[0]",
      sortable: true,
    },
    {
      name: "Number 2 ",
      selector: "contact[1]",
      sortable: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Order Id",
      selector: "_id",
      sortable: true,
    },

    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <div className="d-flex">
    //       <button
    //         onClick={() => editRow(row)}
    //         className="btn btn-success ms-3 shadow btn-xs sharp me-1"
    //       >
    //         <i className="fa fa-check"></i>
    //       </button>
    //       <button
    //         onClick={() => deleteRow(row?._id)} // Pass the entire row
    //         className="btn btn-primary ms-3 shadow btn-xs sharp me-1"
    //       >
    //         <i className="fa fa-xmark"></i>
    //       </button>
    //     </div>
    //   ),
    //   disableFilters: true,
    // },
  ];
  //   	for (const key in myData[0]) {
  // 	let editable = renderEditable;
  // 	if (key === "image") {
  // 		editable = null;
  // 	}
  // 	if (key === "status") {
  // 		editable = null;
  // 	}
  // 	if (key === "avtar") {
  // 		editable = null;
  // 	}
  // 	if (key === "vendor") {
  // 		editable = null;
  // 	}
  // 	if (key === "order_status") {
  // 		editable = null;
  // 	}

  // 	columns.push({
  // 		name: <b>{Capitalize(key.toString())}</b>,
  // 		header: <b>{Capitalize(key.toString())}</b>,
  // 		selector: row => row[key],
  // 		Cell: editable,
  // 		style: {
  // 			textAlign: "center",
  // 		},
  // 	});
  // }

  // if (multiSelectOption === true) {
  // 	columns.push({
  // 		name: (
  // 			<button
  // 				className="btn btn-danger btn-sm btn-delete mb-0 b-r-4"
  // 				onClick={(e) => {
  // 					if (window.confirm("Are you sure you wish to delete this item?"))
  // 						handleRemoveRow();
  // 				}}
  // 			>
  // 				Delete
  // 			</button>
  // 		),
  // 		id: "delete",
  // 		accessor: (str) => "delete",
  // 		cell: (row) => (
  // 			<div>
  // 				<span>
  // 					<input
  // 						type="checkbox"
  // 						name={row.id}
  // 						defaultChecked={checkedValues.includes(row.id)}
  // 						onChange={(e) => selectRow(e, row.id)}
  // 					/>
  // 				</span>
  // 			</div>
  // 		),
  // 		style: {
  // 			textAlign: "center",
  // 		},
  // 		sortable: false,
  // 	});
  // } else {
  // 	columns.push({
  // 		name: <b>Action</b>,
  // 		id: "delete",
  // 		accessor: (str) => "delete",
  // 		cell: (row, index) => (
  // 			<div>
  // 				<span onClick={() => handleDelete(index)}>
  // 					<i
  // 						className="fa fa-trash"
  // 						style={{
  // 							width: 35,
  // 							fontSize: 20,
  // 							padding: 11,
  // 							color: "#e4566e",
  // 						}}
  // 					></i>
  // 				</span>

  // 				<span>
  // 					<i
  // 						onClick={onOpenModal}
  // 						className="fa fa-pencil"
  // 						style={{
  // 							width: 35,
  // 							fontSize: 20,
  // 							padding: 11,
  // 							color: "rgb(40, 167, 69)",
  // 						}}
  // 					></i>
  // 					<Modal
  // 						isOpen={open}
  // 						toggle={onCloseModal}
  // 						style={{ overlay: { opacity: 0.1 } }}
  // 					>
  // 						<ModalHeader toggle={onCloseModal}>
  // 							<h5 className="modal-title f-w-600" id="exampleModalLabel2">
  // 								Edit Product
  // 							</h5>
  // 						</ModalHeader>
  // 						<ModalBody>
  // 							<Form>
  // 								<FormGroup>
  // 									<Label htmlFor="recipient-name" className="col-form-label">
  // 										Category Name :
  // 									</Label>
  // 									<Input type="text" className="form-control" />
  // 								</FormGroup>
  // 								<FormGroup>
  // 									<Label htmlFor="message-text" className="col-form-label">
  // 										Category Image :
  // 									</Label>
  // 									<Input
  // 										className="form-control"
  // 										id="validationCustom02"
  // 										type="file"
  // 									/>
  // 								</FormGroup>
  // 							</Form>
  // 						</ModalBody>
  // 						<ModalFooter>
  // 							<Button
  // 								type="button"
  // 								color="primary"
  // 								onClick={() => onCloseModal("VaryingMdo")}
  // 							>
  // 								Update
  // 							</Button>
  // 							<Button
  // 								type="button"
  // 								color="secondary"
  // 								onClick={() => onCloseModal("VaryingMdo")}
  // 							>
  // 								Close
  // 							</Button>
  // 						</ModalFooter>
  // 					</Modal>
  // 				</span>
  // 			</div>
  // 		),
  // 		style: {
  // 			textAlign: "center",
  // 		},
  // 		sortable: false,
  // 	});
  // }
  console.log(editingSelectedBrands, "editingSelectedBrands");
  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Fragment>
            {/* <Breadcrumb title="Add Products" parent="Digital" /> */}
            <Container fluid={true}>
              <Row className="product-adding">
                <Col xl="8">
                  <Card>
                    <CardHeader>
                      <h5>General</h5>
                    </CardHeader>
                    <CardBody>
                      <div className="digital-add needs-validation">
                        <FormGroup>
                          <Label className="col-form-label pt-0">
                            <span>*</span> Name
                          </Label>
                          <Input
                            className="form-control"
                            id="validationCustom01"
                            type="text"
                            required=""
                            onChange={(e) =>
                              setinpData({
                                ...inpdata,
                                name: e.target.value,
                              })
                            }
                            name="name"
                            defaultValue={
                              editingRow ? editingRow.name : inpdata.name
                            }
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="col-form-label pt-0">
                            <span>*</span> price
                          </Label>
                          <Input
                            className="form-control"
                            id="validationCustom02"
                            type="number"
                            name="price"
                            required=""
                            onChange={(e) =>
                              setinpData({
                                ...inpdata,
                                price: e.target.value,
                              })
                            }
                            defaultValue={
                              editingRow ? editingRow.price : inpdata.price
                            }
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="col-form-label pt-0">
                            <span>*</span> discountedPrice
                          </Label>
                          <Input
                            className="form-control"
                            id="validationCustom02"
                            type="number"
                            name="discountedPrice"
                            required=""
                            onChange={(e) =>
                              setinpData({
                                ...inpdata,
                                discountedPrice: e.target.value,
                              })
                            }
                            defaultValue={
                              editingRow
                                ? editingRow.discountedPrice
                                : inpdata.discountedPrice
                            }
                          />
                        </FormGroup>
                        {/* <FormGroup>
                            <Label className="col-form-label pt-0">
                              <span>*</span> menuProductNumber
                            </Label>
                            <Input
                              className="form-control"
                              id="validationCustom02"
                              type="number"
                              name="menuProductNumber"
                              required=""
                              onChange={handleInputChange}
                              defaultValue={
                                editingRow
                                  ? editingRow.menuProductNumber
                                  : inpdata.menuProductNumber
                              }
                            />
                          </FormGroup> */}

                        <FormGroup>
                          <Label className="col-form-label pt-0">
                            <span>*</span> Units Sold
                          </Label>
                          <Input
                            className="form-control"
                            id="validationCustom02"
                            type="number"
                            name="totalUnits"
                            required=""
                            onChange={(e) =>
                              setinpData({
                                ...inpdata,
                                totalUnits: e.target.value,
                              })
                            }
                            defaultValue={
                              editingRow
                                ? editingRow.totalUnits
                                : inpdata.totalUnits
                            }
                          />
                        </FormGroup>
                        <p>Select Categories</p>
                        {cat?.map((e, i) => {
                          const isChecked = editingRow?.category?.includes(
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

                        <p className="mt-3">Select Brands</p>
                        {brands?.map((e, i) => {
                          const isChecked = editingRow?.brand?.includes(
                            e?.name
                          );
                          console.log(`${editingRow?.brand} IsChecked: `);

                          return (
                            <FormGroup key={i} check>
                              <Label check>
                                <Input
                                  type="checkbox"
                                  name="isChecked"
                                  value={e?._id}
                                  defaultChecked={isChecked} // Use defaultChecked for checkboxes
                                  onChange={(event) =>
                                    handleCheckboxChange(event, "selectedBrand")
                                  }
                                />{" "}
                                {e?.name}
                              </Label>
                            </FormGroup>
                          );
                        })}

                        {/* <FormGroup>
                      <Label className="col-form-label">
                        <span>*</span> Categories
                      </Label>
                      <select className="form-select" required=""
                      onChange={handleInputChange}>
                        <option defaultValue="">--Select--</option>
                        <option defaultValue="1">eBooks</option>
                        <option defaultValue="2">Graphic Design</option>
                        <option defaultValue="3">3D Impact</option>
                        <option defaultValue="4">Application</option>
                        <option defaultValue="5">Websites</option>
                      </select>
                    </FormGroup> */}

                        <FormGroup>
                          <Label className="col-form-label">
                            long Description
                          </Label>
                          <textarea
                            rows="4"
                            name="longDescription"
                            onChange={(e) =>
                              setinpData({
                                ...inpdata,
                                longDescription: e.target.value,
                              })
                            }
                            cols="12"
                            defaultValue={
                              editingRow
                                ? editingRow.longDescription
                                : inpdata.longDescription
                            }
                          ></textarea>
                        </FormGroup>
                        <FormGroup>
                          <Label className="col-form-label">
                            <span>*</span> Short Description
                          </Label>
                          <Input
                            className="form-control"
                            id="validationCustom02"
                            type="text"
                            required=""
                            onChange={(e) =>
                              setinpData({
                                ...inpdata,
                                shortDescription: e.target.value,
                              })
                            }
                            name="shortDescription"
                            defaultValue={
                              editingRow
                                ? editingRow.shortDescription
                                : inpdata.shortDescription
                            }
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="col-form-label">
                            <span>*</span> Product Link
                          </Label>
                          <Input
                            className="form-control"
                            id="validationCustom02"
                            type="text"
                            required=""
                            name="ProductLink"
                            onChange={(e) =>
                              setinpData({
                                ...inpdata,
                                ProductLink: e.target.value,
                              })
                            }
                            defaultValue={
                              editingRow
                                ? editingRow.ProductLink
                                : inpdata.ProductLink
                            }
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label
                            htmlFor="message-text"
                            className="col-form-label"
                          >
                            Product Image : {editingRow?.images?.length}
                          </Label>
                          <Input
                            className="form-control"
                            id="validationCustom02"
                            type="file"
                            onChange={handleFileChange}
                            multiple
                          />
                        </FormGroup>
                        {/* <Label className="col-form-label pt-0"> Product Upload</Label> */}
                        {/* <MyDropzone /> */}
                      </div>
                      <div className="btn-popup  mt-5 ">
                        <Button
                          type="button"
                          color="secondary"
                          //   onClick={handleEditFormSubmit}
                          data-toggle="modal"
                          data-original-title="test"
                          data-target="#exampleModal"
                        >
                          Edit Product
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>

                {/* <Col xl="6">
              <Card>
                <CardHeader>
                  <h5>Add Description</h5>
                </CardHeader>
                <CardBody>
                  <div className="digital-add needs-validation">
                    <FormGroup className=" mb-0">
                      <div className="description-sm">
                      <MDEditor
                    defaultValue={value}
                    onChange={onChange}
                  />
                      </div>
                    </FormGroup>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <h5>Meta Data</h5>
                </CardHeader>
                <CardBody>
                  <div className="digital-add needs-validation">
                    <FormGroup>
                      <Label className="col-form-label pt-0"> Meta Title</Label>
                      <Input
                        className="form-control"
                        id="validationCustom05"
                        type="text"
                        required=""
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="col-form-label">Meta Description</Label>
                      <textarea rows="4" cols="12"></textarea>
                    </FormGroup>
                    <FormGroup className="mb-0">
                      <div className="product-buttons text-center">
                        <Button type="button" color="primary">
                          Add
                        </Button>
                        <Button type="button" color="light">
                          Discard
                        </Button>
                      </div>
                    </FormGroup>
                  </div>
                </CardBody>
              </Card>
            </Col> */}
              </Row>
            </Container>
          </Fragment>
        </Modal.Body>
      </Modal>
      <Fragment>
        <DataTable
          data={apidata}
          columns={columns}
          className={myClass}
          pagination={pagination}
          striped={true}
          center={true}
        />

        <ToastContainer />
      </Fragment>
    </div>
  );
};

export default OrderData;
