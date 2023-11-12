import React, { Fragment } from "react";
import Breadcrumb from "../../breadcrumb";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Datatable from "../../datatable";
import OrderData from "../../sidebar_components/rderdata";

function DigitalgetOrder() {
  return (
    <Fragment>
      <Breadcrumb title="Order List" parent="Digital" />
      {/* <!-- Container-fluid starts--> */}
      <Container fluid="true">
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Product Lists</h5>
              </CardHeader>
              <CardBody>
                <div className="clearfix"></div>
                <div
                  id="basicScenario"
                  className="product-physical products-list"
                >
                  <OrderData
                    multiSelectOption={false}
                    // myData={data}
                    pageSize={9}
                    pagination={false}
                    class="-striped -highlight"
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
}

export default DigitalgetOrder;
