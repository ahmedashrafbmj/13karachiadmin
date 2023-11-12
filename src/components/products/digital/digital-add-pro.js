import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../common/breadcrumb";
import MyDropzone from "../../common/dropzone";
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
  Select,
  Option
} from "reactstrap";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import baseurl from "../../../assets/baseurl/baseurl";
import { toast } from "react-toastify";

const Digital_add_pro = () => {
  // const [value, setValue] = useState('')
  const [cat, setResCategory] = useState();
  const [items, setItems] = useState([]);
  console.log(items,"items")
  // const [brands, setResBrands] = useState();
  // const [selectedBrands, setSelectedBrands] = useState([]);
  const [SelectedCategory, setSelectedCategory] = useState([]);
  const [file, setFile] = useState(null);
  console.log(typeof file, "fileeeeee");

  
  const handleFileChange = (e) => {
    console.log(e, "parameter");

    // const filesArray = Array.from(e.target.files);
    setFile(e.target.files);
    // if (file) {
    //   const reader = new FileReader();

    //   reader.onload = (e) => {
    // 	const binaryData = e.target.result; // Binary data as ArrayBuffer
    // 	// Do something with the binary data, for example, send it to a server or process it in your component
    //   };

    //   reader.readAsArrayBuffer(file); // Start reading the file as ArrayBuffer
    // }
  };
  const [inputValue, setInputValue] = useState({
    name: "",
    price: "",
    discountedPrice: "",
    menuProductNumber: "",
    totalUnits: "",
    shortDescription: "",
    longDescription: "",
    ProductLink: "",
  });
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  // const [selectedCategories, setSelectedCategories] = useState([]);

  console.log(inputValue, "inputValue");
  const handleFormSubmit = async () => {
    // Create a FormData object and append the file to it
    const formData = new FormData();
    // formData.append('images', file);

    formData.append("name", inputValue.name);
    formData.append("price", inputValue.price);
    formData.append("discountedPrice", inputValue.discountedPrice);
    formData.append("menuProductNumber", inputValue.menuProductNumber);
    formData.append("shortDescription", inputValue.shortDescription);
    formData.append("totalUnits", inputValue.totalUnits);
    formData.append("ProductLink", inputValue.ProductLink);
    formData.append("longDescription", inputValue.longDescription);
    SelectedCategory?.map((e, i) => formData.append(`category[${i}]`, e._id));
    // selectedSubcategories?.map((e, i) =>
    //   formData.append(`subcategories[${i}]`, e._id)
    // );
    console.log(SelectedCategory, "SelectedCategory");
    // formData.append(`images`, file);
    const filesArray = Array.from(file);
    filesArray.forEach((filess, index) => {
      formData.append(`images`, filess);
    });

    try {
      const token  = localStorage.getItem("token")
      // Send a POST request to your API endpoint
      const response = await axios.post(`${baseurl.url}addProduct`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for sending form data
          "Authorization": `Bearer ${token}`,
        },
      });
      console.log(response.data.status, "response response");
      // Handle the response, e.g., show a success message
      if (response.data.status === true) {
        alert(response.data.message);
        // window.location.reload();
        setInputValue({
          name: "",
          price: "",
          discountedPrice: "",
          menuProductNumber: "",
          totalUnits: "",
          shortDescription: "",
          longDescription: "",
          ProductLink: "",
        });
        setFile("")
        setSelectedSubcategories("")
        setSelectedCategory("")
        window.location.reload()
        toast.success("Successfully Added !");

        // fetchDataFromServer()
        // onCloseModal()
      }
      console.log("Upload successful", response);
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Upload failed", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value, // Use the input field's name as the key
    });
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
 
  const handleCheckboxChange = (e, type) => {
    const brandId = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      // If the checkbox is checked, add the brand to the selectedBrands array
    if (type === "selectedCategory" || "selectedSubcategory") {
        setSelectedCategory([...SelectedCategory, { _id: brandId }]);
      }
      
    } else {
      // If the checkbox is unchecked, remove the brand from the selectedBrands array
      if (type === "selectedCategory") {
        setSelectedCategory(
          SelectedCategory.filter((brand) => brand._id !== brandId)
        );
      }
      if (type === "selectedSubcategory") {
        setSelectedSubcategories(
          selectedSubcategories.filter((category) => category._id !== brandId)
        );
      }
    }
  };

  const GetSubcategories = async () => {
    try {
      // Send a GET request to your API endpoint
      const response = await axios.get(`${baseurl.url}getsubCategories`);
      // Handle the response data, e.g., set it in state
      // setResCategory(response.data.categories);
      setSubcategories(response.data.categories);
      console.log(response.data);
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("GET request failed", error);
    }
  };
  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetchDataFromServer();
    GetSubcategories();
  }, []);




  const handleAddButtonClick = () => {
    // Check if both size and quantity are selected before adding to the array
    if (inputValue.size && inputValue.QuantityForColor) {
      // Create a new object with size and quantity and add it to the array
      const newItem = {
        size: inputValue.size,
        quantity: inputValue.QuantityForColor,
      };
  
      // Assuming you have a state variable called 'items' to store the array
      setItems((prev)=>[...prev, newItem]);
  
      // Clear the input values after adding to the array
     
    }
  };
  const handleRemoveButtonClick = (sizeToRemove) => {
    // Filter out the item with the specified size
    const updatedItems = items.filter(item => item.size !== sizeToRemove);
  
    // Assuming you have a state variable called 'items' to store the array
    setItems(updatedItems);
  };
  
  return (
    <Fragment>
      <Breadcrumb title="Add Products" parent="Digital" />
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
                      onChange={handleInputChange}
                      name="name"
                      value={inputValue.name}
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
                      onChange={handleInputChange}
                      value={inputValue.price}
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
                      onChange={handleInputChange}
                      value={inputValue.discountedPrice}
                    />
                  </FormGroup>
                  <FormGroup>
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
                      value={inputValue.menuProductNumber}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label pt-0">
                      <span>*</span>Select Color 
                    </Label>
                    <Input
    type="select"
    className="form-control"
    id="validationCustom02"
    name="size"
    onChange={handleInputChange}
    value={inputValue.size}
  >
<option value="" disabled>
Select an option
</option>
<option value="Large">Large</option>
<option value="Extra Large">Extra Large</option>
    <option value="Medium">Medium</option>
    <option value="Small">Small</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label pt-0">
                      <span>*</span> Enter Quantity For Selected Color
                    </Label>
                    <Input
                      className="form-control"
                      id="validationCustom02"
                      type="number"
                      name="QuantityForColor"
                      required=""
                      onChange={handleInputChange}
                      value={inputValue.QuantityForColor}
                    />
                  </FormGroup>
               <Button onClick={handleAddButtonClick}>Add</Button>
               <br/>
               Selected Size and Colors:
               <br/>
               <br/>
               {items?.map((e,i)=>{
                return(
                  <>
                  <div key={i}>
                    <span>{e?.size}</span> : 
                    <span>{e?.quantity}</span>
                    <Label className="col-form-label pt-0">
                    &nbsp;&nbsp;   <span style={{color:"red",cursor:"pointer"}} onClick={() => handleRemoveButtonClick(e.size)}>Delete</span> 
                    </Label>
                  </div>
                  </>
                )
               })}
                  <p>Select Categories</p>
                  {cat?.map((e, i) => {
                    return (
                      <>
                        <FormGroup check>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="isChecked"
                              value={e?._id}
                              // checked={isChecked}
                              // onChange={handleCheckboxChange}

                              onChange={(e) =>
                                handleCheckboxChange(e, "selectedCategory")
                              }
                            />{" "}
                            {e?.name}
                          </Label>
                        </FormGroup>
                      </>
                    );
                  })}
                  <p className="mt-3">Select Subcategories </p>
                  {subcategories?.map((e, i) => {
                    return (
                      <>
                        <FormGroup check>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="isChecked"
                              value={e?._id}
                              // checked={isChecked}
                              // onChange={handleCheckboxChange}

                              onChange={(e) =>
                                handleCheckboxChange(e, "selectedSubcategory")
                              }
                            />{" "}
                            {e?.name}
                          </Label>
                        </FormGroup>
                      </>
                    );
                  })}
                 
                 

                 

                  <FormGroup>
                    <Label className="col-form-label">long Description</Label>
                    <textarea
                      rows="4"
                      name="longDescription"
                      onChange={handleInputChange}
                      cols="12"
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
                      onChange={handleInputChange}
                      name="shortDescription"
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
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="message-text" className="col-form-label">
                      Product Image :
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
                <div className="btn-popup pull-right">
                  <Button
                    type="button"
                    color="secondary"
                    onClick={() => handleFormSubmit()}
                    data-toggle="modal"
                    data-original-title="test"
                    data-target="#exampleModal"
                  >
                    Add Product
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
									value={value}
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
  );
};

export default Digital_add_pro;
