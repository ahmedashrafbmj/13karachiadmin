// import React, { Fragment, useEffect, useState } from "react";
// import Breadcrumb from "../../breadcrumb";
// import MyDropzone from "../../dropzone";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardHeader,
//   Col,
//   Container,
//   FormGroup,
//   Input,
//   Label,
//   Row,
// } from "reactstrap";
// import MDEditor from "@uiw/react-md-editor";
// import axios from "axios";
// import baseurl from "../../../../assets/baseurl/baseurl";
// import { toast } from "react-toastify";

// function DigitalAddOrder() {
//   const [inputValue, setInputValue] = useState({
//     name: "",
//     price: "",
//     discountedPrice: "",
//     menuProductNumber: "",
//     totalUnits: "",
//     shortDescription: "",
//     longDescription: "",
//     ProductLink: "",
//   });
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setInputValue({
//       ...inputValue,
//       [name]: value, // Use the input field's name as the key
//     });
//   };
//   return (
//     <div>
//       <Fragment>
//         <Breadcrumb title="Add Orders" parent="Digital" />
//         <Container fluid={true}>
//           <Row className="product-adding">
//             <Col xl="8">
//               <Card>
//                 <CardHeader>
//                   <h5>General</h5>
//                 </CardHeader>
//                 <CardBody>
//                   <div className="digital-add needs-validation">
//                     <FormGroup>
//                       <Label className="col-form-label pt-0">
//                         <span>*</span> Name
//                       </Label>
//                       <Input
//                         className="form-control"
//                         id="validationCustom01"
//                         type="text"
//                         required=""
//                         onChange={(e) =>
//                           setInputValue({ ...inputValue, name: e.target.value })
//                         }
//                         name="name"
//                       />
//                     </FormGroup>
//                     <FormGroup>
//                       <Label className="col-form-label pt-0">
//                         <span>*</span> Last Name
//                       </Label>
//                       <Input
//                         className="form-control"
//                         id="validationCustom02"
//                         type="number"
//                         name="price"
//                         required=""
//                         onChange={(e) =>
//                           setInputValue({
//                             ...inputValue,
//                             lastName: e.target.value,
//                           })
//                         }
//                       />
//                     </FormGroup>
//                     <FormGroup>
//                       <Label className="col-form-label pt-0">
//                         <span>*</span> Email
//                       </Label>
//                       <Input
//                         className="form-control"
//                         id="validationCustom02"
//                         type="number"
//                         name="email"
//                         required=""
//                         onChange={(e) =>
//                           setInputValue({
//                             ...inputValue,
//                             email: e.target.value,
//                           })
//                         }
//                       />
//                     </FormGroup>
//                     <FormGroup>
//                       <Label className="col-form-label pt-0">
//                         <span>*</span> Contact
//                       </Label>
//                       <Input
//                         className="form-control"
//                         id="validationCustom02"
//                         type="number"
//                         name="menuProductNumber"
//                         required=""
//                         onChange={(e) => {
//                           setinpdata({
//                             ...inpdata,
//                             number: [e.target.value],
//                           });
//                         }}
//                       />
//                     </FormGroup>
//                     <FormGroup>
//                       <Label className="col-form-label pt-0">
//                         <span>*</span> Contact
//                       </Label>
//                       <Input
//                         className="form-control"
//                         id="validationCustom02"
//                         type="number"
//                         name="menuProductNumber"
//                         required=""
//                         onChange={(e) => {
//                           setinpdata({
//                             ...inpdata,
//                             number: [e.target.value],
//                           });
//                         }}
//                       />
//                     </FormGroup>

//                     <FormGroup>
//                       <Label className="col-form-label pt-0">
//                         <span>*</span> Units Sold
//                       </Label>
//                       <Input
//                         className="form-control"
//                         id="validationCustom02"
//                         type="number"
//                         name="totalUnits"
//                         required=""
//                         onChange={handleInputChange}
//                         value={inputValue.totalUnits}
//                       />
//                     </FormGroup>

//                     <FormGroup>
//                       <Label className="col-form-label">long Description</Label>
//                       <textarea
//                         rows="4"
//                         name="longDescription"
//                         onChange={handleInputChange}
//                         cols="12"
//                       ></textarea>
//                     </FormGroup>
//                     <FormGroup>
//                       <Label className="col-form-label">
//                         <span>*</span> Short Description
//                       </Label>
//                       <Input
//                         className="form-control"
//                         id="validationCustom02"
//                         type="text"
//                         required=""
//                         onChange={handleInputChange}
//                         name="shortDescription"
//                       />
//                     </FormGroup>
//                     <FormGroup>
//                       <Label className="col-form-label">
//                         <span>*</span> Product Link
//                       </Label>
//                       <Input
//                         className="form-control"
//                         id="validationCustom02"
//                         type="text"
//                         required=""
//                         name="ProductLink"
//                         onChange={handleInputChange}
//                       />
//                     </FormGroup>

//                     {/* <Label className="col-form-label pt-0"> Product Upload</Label> */}
//                     {/* <MyDropzone /> */}
//                   </div>
//                   <div className="btn-popup pull-right">
//                     <Button
//                       type="button"
//                       color="secondary"
//                       //   onClick={() => handleFormSubmit()}
//                       data-toggle="modal"
//                       data-original-title="test"
//                       data-target="#exampleModal"
//                     >
//                       Add Product
//                     </Button>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>

//             {/* <Col xl="6">
// 						<Card>
// 							<CardHeader>
// 								<h5>Add Description</h5>
// 							</CardHeader>
// 							<CardBody>
// 								<div className="digital-add needs-validation">
// 									<FormGroup className=" mb-0">
// 										<div className="description-sm">
// 										<MDEditor
// 									value={value}
// 									onChange={onChange}
// 								/>
// 										</div>
// 									</FormGroup>
// 								</div>
// 							</CardBody>
// 						</Card>
// 						<Card>
// 							<CardHeader>
// 								<h5>Meta Data</h5>
// 							</CardHeader>
// 							<CardBody>
// 								<div className="digital-add needs-validation">
// 									<FormGroup>
// 										<Label className="col-form-label pt-0"> Meta Title</Label>
// 										<Input
// 											className="form-control"
// 											id="validationCustom05"
// 											type="text"
// 											required=""
// 										/>
// 									</FormGroup>
// 									<FormGroup>
// 										<Label className="col-form-label">Meta Description</Label>
// 										<textarea rows="4" cols="12"></textarea>
// 									</FormGroup>
// 									<FormGroup className="mb-0">
// 										<div className="product-buttons text-center">
// 											<Button type="button" color="primary">
// 												Add
// 											</Button>
// 											<Button type="button" color="light">
// 												Discard
// 											</Button>
// 										</div>
// 									</FormGroup>
// 								</div>
// 							</CardBody>
// 						</Card>
// 					</Col> */}
//           </Row>
//         </Container>
//       </Fragment>
//     </div>
//   );
// }

// export default DigitalAddOrder;
