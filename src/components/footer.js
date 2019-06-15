import React from "react";
import { Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import appConfig from "../config/app";

const Footer = () => {
    return (
        <Container className="footer mt-5 mb-5 text-center">
            <Row>
                <Col sm="12" md="4">
                    <h5>Contact</h5>
                    <div className="contact">
                        <a href="https://t.me/AlohaEOS"><FontAwesomeIcon icon={appConfig.SOCIAL_MEDIA.telegram.icon} color="#FCC615" /></a>
                        <a href="https://twitter.com/eosaloha"><FontAwesomeIcon icon={appConfig.SOCIAL_MEDIA.twitter.icon} color="#FCC615" /></a>
                        <a href="https://github.com/AlohaEOS"><FontAwesomeIcon icon={appConfig.SOCIAL_MEDIA.github.icon} color="#FCC615" /></a>
                        <a href="https://www.reddit.com/user/alohaeos"><FontAwesomeIcon icon={appConfig.SOCIAL_MEDIA.reddit.icon} color="#FCC615" /></a>
                        <a href="https://keybase.io/alohaeo"><FontAwesomeIcon icon={appConfig.SOCIAL_MEDIA.keybase.icon} color="#FCC615" /></a>
                    </div>
                </Col>
                <Col sm="12" md="4">
                    <a href="https://www.alohaeos.com"><img className="logo" src="/img/aloha-eos.png" /></a>
                    <br/>
                    <p className="copyright">&copy; 2019 Aloha EOS, LLC</p>
                </Col>
                <Col sm="12" md="4">
                    <h5>DAPP Network by</h5>
                    <a target="_blank" href="https://www.liquidapps.io"><img alt="LiquidApps" className="liquid-apps-logo" src="https://liquidapps.io/static/media/liquidapps_logo_white.3b1d829c.svg" /></a>
                </Col>
            </Row>
        </Container>
    );
};

export default Footer;
