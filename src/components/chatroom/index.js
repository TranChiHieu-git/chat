import React from 'react';
import Chatwindow from "./chatwindow";
import Siderbar from "./siderbar";
import {Col, Row} from "antd";

function ChatRoom(props) {
    return (
        <Row>
            <Col span={6}>
                <Siderbar/>
            </Col>
            <Col span={18}>
                <Chatwindow/>
            </Col>
        </Row>
    );
}

export default ChatRoom;
