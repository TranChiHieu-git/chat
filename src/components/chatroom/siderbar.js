import React from 'react';
import {Row, Col} from "antd";
import UserInfo from "./userInfo";
import Roomlist from "./roomlist";

function Siderbar(props) {
    return (
        <Row style={{background: "#33b348", color: "white", height: "100vh"}}>
            <Col span={24}>
                <UserInfo/>
                <Roomlist/>
            </Col>
            <Col span={24}>

            </Col>
        </Row>
    );
}

export default Siderbar;
