import React from "react";

import { Container, Row, Col } from "reactstrap";
import Footer from "./footer";
import Header from "./header";

export default function Layout(Component) {
    class Layout extends React.Component {
        render() {
            return (
                <div>
                    <Header />
                    <Container>
                        <Row className="mt-5">
                            <Col sm="12">
                                <Component />
                            </Col>
                        </Row>
                    </Container>
                    <Footer />
                </div>
            );
        }
    }

    return Layout;
}
