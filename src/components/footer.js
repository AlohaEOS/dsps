import React from "react";
import { Container, Row, Col } from "reactstrap";

const Footer = () => {
    return (
        <Container className="footer mt-5 mb-5">
            <Row>
                <Col sm="12">
                    Powered By: 
                </Col>
                <Col sm="2">
                    <a rel="noopener noreferrer" target="_blank" href="https://www.liquidapps.io">
                        <img alt="" className="liquid-apps-logo" src="https://liquidapps.io/static/media/liquidapps_logo_white.3b1d829c.svg" />
                    </a>
                </Col>
            </Row>
        </Container>
    );
};

export default Footer;
