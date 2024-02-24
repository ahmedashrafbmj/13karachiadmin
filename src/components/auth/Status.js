import React, { Fragment } from "react";
import LoginTabset from "./loginTabset";
import { ArrowLeft } from "react-feather";
import Slider from "react-slick";
import stats from "../../assets/images/dashboard/stats.png";
import logo from "../../assets/images/dashboard/logo.jpeg";

import "../../assets/scss/slick.scss";
import "../../assets/scss/slick-theme.scss";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

const Status = () => {
	var settings = {
		dots: true,
		infinite: true,
		speed: 500,
		arrows: false,
	};
	return (
		<Fragment>
			<div className="page-wrapper">
				<div className="authentication-box">
					<Container>
						<Row>
							<Col className="col-md-12 p-0 card-left">
								<Card className="bg-primary">
									<div className="svg-icon">
										<img alt="" src={logo} className="Img-fluid" />
									</div>
									<Slider className="single-item" {...settings}>
										<div>
											<div>
												<h3>Welcome to 13Karachi</h3>
												<p>
													You are not verified from admin when you're varified by admin you will able to work on 13karachi portal, wait for verification or contact to this number 03209248578
												</p>
											</div>
										</div>
										<div>
											<div>
												<h3>Welcome to 13karachi</h3>
												<p>
													You are not verified from admin when you're varified by admin you will able to work on 13karachi portal, wait for verification or contact to this number 03209248578

												</p>
											</div>
										</div>
										<div>
											<div>
												<h3>Welcome to 13karachi</h3>
												<p>
													You are not verified from admin when you're varified by admin you will able to work on 13karachi portal, wait for verification or contact to this number 03209248578

												</p>
											</div>
										</div>
									</Slider>
								</Card>
							</Col>

						</Row>
						<a
							href="/"
							className="btn btn-primary back-btn"
						>
							<ArrowLeft />
							back
						</a>
					</Container>
				</div>
			</div>
		</Fragment>
	);
};

export default Status;
