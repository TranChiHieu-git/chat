import React from 'react';
import {Row, Col, Button} from "antd";
import Title from "antd/lib/typography/Title";
import firebase, {auth} from "../../firebase/config";
import {addDocument} from "../../firebase/service";

const fbProvider = new firebase.auth.FacebookAuthProvider();
const ggProvider = new firebase.auth.GoogleAuthProvider();

function Login(props) {
    const handleFBLogin = async () => {
        let data = await auth().signInWithPopup(fbProvider);
        if (data?.additionalUserInfo?.isNewUser) {
            addDocument("users", {
                displayName: data.user.displayName,
                email: data.user.email,
                photoURL: data.user.photoURL,
                uid: data.user.uid,
                providerId: data.additionalUserInfo.providerId
            });
        }
    }
    const handleGGLogin = async () => {
        let data = await auth().signInWithPopup(ggProvider);
        if (data?.additionalUserInfo?.isNewUser) {
            addDocument("users", {
                displayName: data.user.displayName,
                email: data.user.email,
                photoURL: data.user.photoURL,
                uid: data.user.uid,
                providerId: data.additionalUserInfo.providerId
            });
        }
    }

    return (
        <React.Fragment>
            <Row justify="center" style={{height: "800px"}}>
                <Col span={8}>
                    <Title style={{textAlign: "center", marginBottom: "10vh", marginTop: "30vh"}} level={1}>
                        <b>Chat Room</b>
                    </Title>
                    <Button style={{width: "100%", marginBottom: "25px"}} size="large" onClick={handleGGLogin}>
                        Đăng nhập bằng Google
                    </Button>
                    <Button style={{width: "100%", marginBottom: "25px"}} size="large" onClick={handleFBLogin}>
                        Đăng nhập bằng Facebook
                    </Button>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default Login;
