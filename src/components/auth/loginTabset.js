import React, { Fragment, useEffect, useState } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { User, Unlock } from "react-feather";

import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';
import { ModalHeader } from 'reactstrap'
import { Document, Page, pdfjs } from 'react-pdf';
import axios from "axios";
import baseurl from "../../assets/baseurl/baseurl";
import { ToastContainer, toast } from "react-toastify";
// import pdfFile from '../../assets/images/termsandconditions.pdf'

const LoginTabset = () => {
    const history = useNavigate();
    const [activeTab, setActiveTab] = useState(0); // Active tab state
    const [areas, setareas] = useState([]); // Active tab state
    const [markets, setMarkets] = useState([]); // Active tab state
    const [sellertype, SetSellertype] = useState([]); // Active tab state
    const [filteredMarkets, setFilteredMarkets] = useState([]); // Active tab state
    const [show, setShow] = useState(false);

    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [terms, setTerms] = useState(); // Active tab state
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        businessname: "",
        number: "",
        address: "",
        password: "",
        confirmPassword: "",
    });

    const pdfFile = 'https://raw.githubusercontent.com/RizanKhan837/13karachibackend/main/termsandconditions.pdf';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleChangeSelect = (e) => {
        console.log(typeof e.target.value, "eeeeeeee");

        // Convert e.target.value to a string if needed
        const selectedAreaId = String(e.target.value);

        const filteredMarkets = markets?.filter((market) => market?.area === selectedAreaId);

        console.log(filteredMarkets, "filteredMarkets");
        setFilteredMarkets(filteredMarkets)

    }
    const handleSubmit = async (e, type) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        formData.append('role', 'subadmin'); // Static role value
        // formData.append('sellerType', sellertype); // Static role value
        let response;
        try {
            if (type === "signup") {
                response = await axios.post(`${baseurl.url}signup`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Set the content type for FormData
                    },
                });

                if (response.data.message === "Signup successful") {
                    toast.success("Signup successful");
                    setTerms('')
                    setActiveTab(0); // Switch to the "Login" tab after successful signup
                }
            } else {
                response = await axios.post(`${baseurl.url}login`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Set the content type for FormData
                    },
                });

                if (response.data.message === "Login successful") {
                    toast.success("Login successful");
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('Userid', response.data.user._id);
                    localStorage.setItem('status', response.data.user.status);
                    localStorage.setItem('role', response.data.user.role);
                    if (response.data.user.status === "pending") {
                        history(`${process.env.PUBLIC_URL}/status`);
                    }
                    else {
                        history(`${process.env.PUBLIC_URL}/dashboard`);
                    }
                    setActiveTab(0); // Switch to the "Login" tab after successful login
                }

                else if (response.data.message === "Invalid username or password") {
                    console.log(response.data);

                    toast.error("Invalid username or password");
                    alert()
                }

            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
            // Handle the error (e.g., display an error message)
        }
    };

    const clickActive = (event) => {
        document.querySelector(".nav-link").classList.remove("show");
        event.target.classList.add("show");
    };

    const routeChange = () => {
        // history(`${process.env.PUBLIC_URL}/dashboard`);
    };
    const fetchDataFromServerArea = async () => {
        try {
            // Send a GET request to your API endpoint
            const response = await axios.get(`${baseurl.url}getArea`);

            // Handle the response data, e.g., set it in state
            setareas(response.data.areas);

            console.log(response.data);
        } catch (error) {
            // Handle errors, e.g., show an error message
            console.error("GET request failed", error);
        }
    };
    const fetchDataFromServerMarkets = async () => {
        try {
            // Send a GET request to your API endpoint
            const response = await axios.get(`${baseurl.url}getMarket`);

            // Handle the response data, e.g., set it in state
            setMarkets(response.data.market);

            console.log(response.data);
        } catch (error) {
            // Handle errors, e.g., show an error message
            console.error("GET request failed", error);
        }
    };

    useEffect(() => {
        // Fetch data from the server when the component mounts
        fetchDataFromServerMarkets();
        fetchDataFromServerArea();
    }, []);
    console.log(filteredMarkets, "filteredMarkets")
    return (
        <div>
            <Fragment>
                <Tabs selectedIndex={activeTab}>
                    <TabList className="nav nav-tabs tab-coupon">
                        <Tab className="nav-link" onClick={() => setActiveTab(0)}>
                            <User />
                            Login
                        </Tab>
                        <Tab className="nav-link" onClick={() => setActiveTab(1)}>
                            <Unlock />
                            Register
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <Form className="form-horizontal auth-form" onSubmit={(e) => handleSubmit(e, "login")}>
                            <FormGroup>
                                <Input
                                    required=""
                                    name="email"
                                    type="email"
                                    className="form-control"
                                    placeholder="Username"
                                    id="exampleInputEmail1"
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    required=""
                                    name="password"
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <div className="form-terms">
                                <div className="custom-control custom-checkbox me-sm-2">
                                    <Label className="d-block">
                                        <Input
                                            className="checkbox_animated"
                                            id="chk-ani2"
                                            type="checkbox"
                                        />
                                        Remember Me{" "}
                                        <span className="pull-right">
                                            {" "}
                                            <a href="/#" className="btn btn-default forgot-pass p-0">
                                                Lost your password
                                            </a>
                                        </span>
                                    </Label>
                                </div>
                            </div>
                            <div className="form-button">
                                <Button
                                    color="primary"
                                    type="submit"
                                    onClick={() => routeChange()}
                                >
                                    Login
                                </Button>
                            </div>
                            <div className="form-footer">
                                <span>Or Login with social platforms</span>
                                <ul className="social">
                                    <li>
                                        <a href="https://m.facebook.com/profile.php?id=100082254692576&locale2=hi_IN&_rdr" target="_blank">
                                            <i className="icon-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/#">
                                            <i className="icon-twitter-alt"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/#">
                                            <i className="icon-instagram"></i>
                                        </a>
                                    </li>
                                    {/* <li>
                                        <a href="/#">
                                            <i className="icon-pinterest-alt"></i>
                                        </a>
                                    </li> */}
                                </ul>
                            </div>
                        </Form>
                    </TabPanel>
                    <TabPanel>
                        <Form onSubmit={(e) => handleSubmit(e, "signup")} className="form-horizontal auth-form">
                            <FormGroup>
                                <div className="form-terms d-flex align-items-center">
                                    <div className="custom-control custom-radio me-sm-2">
                                        <label className="d-block">
                                            <input
                                                className=""
                                                name="sellerType"
                                                id="chk-ani2"
                                                type="radio"
                                                value="online"
                                                onChange={(e) => SetSellertype(e.target.value)}
                                            />
                                            {" "} Online Seller
                                        </label>
                                    </div>
                                    <div className="custom-control custom-radio me-sm-2">
                                        <label className="d-block">
                                            <input
                                                className=""
                                                name="sellerType"
                                                id="chk-ani1"
                                                type="radio"
                                                value="proper"
                                                onChange={(e) => SetSellertype(e.target.value)}
                                            />
                                            {" "} Have a Shop?
                                        </label>
                                    </div>
                                </div>
                            </FormGroup>
                            <FormGroup>

                                <Input
                                    required=""
                                    name="email"
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    id="exampleInputEmail12"
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    required=""
                                    name="name"
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    id="exampleInputEmail12"
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    required=""
                                    name="businessname"
                                    type="text"
                                    className="form-control"
                                    placeholder="Business Name"
                                    id="exampleInputEmail12"
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            {sellertype === "proper" ?
                                (<>
                                    <FormGroup>

                                        <Input
                                            type="select"
                                            className="form-control"
                                            id="validationCustom02"
                                            name="area"
                                            onChange={handleChangeSelect}
                                        // value={inputValue.size}
                                        >
                                            <option value="" >
                                                Select an Area
                                            </option>
                                            {areas?.map((e, i) => {
                                                return (
                                                    <option value={e?._id}>{e?.name}</option>
                                                )
                                            })}
                                        </Input>

                                    </FormGroup>
                                    <FormGroup>

                                        <Input
                                            type="select"
                                            className="form-control"
                                            id="validationCustom02"
                                            name="market"
                                        // onChange={handleChangeSelect}
                                        // value={inputValue.size}
                                        >
                                            <option value="" >
                                                Select an Market
                                            </option>
                                            {filteredMarkets?.map((e, i) => {
                                                return (
                                                    <option value={e?._id}>{e?.name}</option>
                                                )
                                            })}
                                        </Input>

                                    </FormGroup>
                                </>
                                ) : null}
                            {/* <FormGroup>
                  
                    <Input
    type="select"
    className="form-control"
    id="validationCustom02"
    name="size"
    onChange={handleChangeSelect}
    // value={inputValue.size}
  >
<option value="" >
Select an Area
</option>
{areas?.map((e,i)=>{
    return(
        <option value={e?._id}>{e?.name}</option>
    )
})}
                    </Input>
                    
                  </FormGroup>
                       */}
                            <FormGroup>
                                <Input
                                    required=""
                                    name="number"
                                    type="text"
                                    className="form-control"
                                    placeholder="Number"
                                    id="exampleInputEmail12"
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    required=""
                                    name="address"
                                    type="text"
                                    className="form-control"
                                    placeholder="Address"
                                    id="exampleInputEmail12"
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    required=""
                                    name="password"
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    onChange={handleChange}
                                />
                            </FormGroup>

                            <div className="form-terms">
                                <div className="custom-control custom-checkbox me-sm-2">
                                    <Label className="d-block">
                                        <Input
                                            className="checkbox_animated"
                                            id="chk-ani2"
                                            type="checkbox"
                                            value="accpted"
                                            onChange={(e) => setTerms(e.target.value)}
                                        />
                                        I agree to all statements in{" "}
                                        <span>
                                            <a href="/#" onClick={handleShow}>Terms &amp; Conditions</a>
                                        </span>
                                    </Label>
                                </div>
                            </div>
                            <div className="form-button">
                                <Button
                                    color="primary"
                                    type="submit"
                                    disabled={!terms}
                                    onClick={() => { routeChange() }}
                                >
                                    Register
                                </Button>
                            </div>
                        </Form>
                    </TabPanel>
                </Tabs>

                <Modal show={show} onHide={handleClose} centered size="lg">
                    <ModalHeader closeButton>
                        <Modal.Title>Terms and Conditions</Modal.Title>
                    </ModalHeader>
                    <ModalBody style={{ overflow: 'auto', maxHeight: '80vh' }}>
                        {/* <Document file={pdfFile}>
                            <Page pageNumber={1} style={{ width: '100%' }} />
                        </Document> */}
                        <p>﻿


Terms and Conditions

Welcome to 13karachi.com and/or terakarachi.com ("Site") and/or 13karachi (App). The owner and operator of the Site is 13Karachi.com ("we", "our" or "us").

These Terms of Use and all policies and additional terms (if applicable) posted on the Site set out the terms on which we offer you access to and use of our Site, services and applications including our mobile application (collectively, the "Services"). You can find all of our policies and additional terms here: 13karachi.com. These Legal Documents are incorporated by reference into these Terms of Use.

By accessing, registering and/or continuing to use or access our Services, you are agreeing to be bound by these Terms of Use and the Legal Documents with immediate effect. These Terms of Use and the Legal Documents are subject to change by us at any time. Your continued use of the Site following any such change constitutes your agreement to these Terms of Use and Legal Documents as so modified.

References in these Terms of Use to "you" (or similar) are references to you as an individual or legal entity as the case may be.

ABOUT OUR SITE

The Site is an e-commerce platform that allows enterprise users to offer and sell products, and individuals and enterprise entities to buy products.

We reserve the right to introduce new Services and update or withdraw any of the Services, in our sole discretion, and we will not be liable to you for exercising this discretion.

1. ELIGIBILITY AND REGISTRATION REQUIREMENTS

1. You are eligible to register as a buyer or seller and benefit from the Services if you meet the following eligibility criteria:

a.

for buyers:

i.

you are above the legal age for purchasing products in your country of residence; and

ii.

you are able to provide an address for delivery of products.

b.

for sellers:

i.

you provide proof of authorisation for the individual who will be registering and using the Site;

11. you provide identification for the authorised person;

you acknowledge and agree that for certain product categories, additional requirements might be applicable.

2. In order to register to the Site, you will need to provide us with certain information. Your registration to the Site may not be accepted if you do not provide us with the required information. We reserve the right to decline any registration without further explanation. We reserve the right to undertake such checks as are necessary to verify your identity.

3. Once you have successfully completed registration, your registration shall continue for an indefinite period, subject to suspension or termination in accordance with clause 6 of these Terms of Use.

2. YOUR OBLIGATIONS

1. When using or accessing the Services, you agree that you:

are responsible for maintaining the confidentiality of, and restricting access to and use of your account and password, and accept responsibility for all activities that occur under your account and password;

a. agree to immediately notify us of any unauthorised use of your password or account or any other breach of security;

b. will provide true, accurate, current and complete information about yourself and your use of the Services as required by us;

C.

will not disclose to any third party (except as required or requested by us) a user's information provided to you; and

d. will cooperate with our requests for additional information with respect to your eligibility and usage of our Services. 2. When using or accessing the Services, you agree that you will not:

post list or upload in any manner any information which is blasphemous, defamatory, obscene, libellous, invasive of another's privacy, hateful, or racially, ethnically objectionable, disparaging, relating or encouraging money laundering or gambling, or otherwise unlawful in any manner whatsoever.

2.

post, list or upload content or items in inappropriate or prohibited categories or areas on our Site, including:</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>

                <ToastContainer />
            </Fragment>
        </div>
    );
};

export default LoginTabset;
