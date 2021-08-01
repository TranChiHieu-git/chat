import {auth} from "../firebase/config";
import {useHistory} from "react-router-dom";
import React, {createContext, useEffect, useState} from 'react';
import {Spin} from "antd";
import {LoadingOutlined} from '@ant-design/icons';

export const AuthContext = createContext(undefined, undefined);

function AuthProvider(props) {
    const history = useHistory();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubcribed = auth().onAuthStateChanged((User) => {
            if (User) {
                const {displayName, email, uid, photoURL} = User;
                setUser({displayName, email, uid, photoURL});
                if (history) {
                    history.push("/");
                }
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            } else {
                if (history) {
                    history.push("/login");
                }
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            }
        });
        return () => {
            unsubcribed();
        }
    }, [history]);

    return (
        <AuthContext.Provider value={user}>
            {isLoading ? <div style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Spin style={{zoom: "600%"}} size="large" indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/>
            </div> : <React.Fragment>{props.children}</React.Fragment>}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
