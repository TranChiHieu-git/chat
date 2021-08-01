import React, {useContext} from 'react';
import {Avatar, Button, Typography, Row, Col} from "antd";
import styled from "styled-components";
import {auth, db} from "../../firebase/config";
import {AuthContext} from "../../context/AuthProvider";

const WrapperStyled = styled.div`
    
`

function UserInfo(props) {
    let data = useContext(AuthContext);

    const handleLogout = () => {
        auth().signOut().then(res => {
        });
    }
    return (
        <WrapperStyled>
            <Row style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "24px 16px",
                borderBottom: "1px solid rgb(230,230,230)",
                height: "80px"
            }}>
                <Col span={16}>
                    <Avatar
                        src={data.photoURL}>{!data.photoURL && data.displayName ? data.displayName?.charAt(0)?.toUpperCase() : "A"}</Avatar>
                    <Typography.Text style={{color: "white", fontSize: "20px"}}> {data.displayName} </Typography.Text>
                </Col>
                <Col span={8}>
                    <Button ghost onClick={handleLogout}>Đăng xuất</Button>
                </Col>
            </Row>
        </WrapperStyled>

    );
}

export default UserInfo;
