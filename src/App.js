import React from "react";
import './App.css';
import Login from "./components/login";
import {BrowserRouter, Route, Switch} from "react-router-dom"
import ChatRoom from "./components/chatroom";
import AuthProvider from "./context/AuthProvider";
import AppProvider from "./context/AppProvider";
import AddRoomModal from "./components/modal/addRoomModal";
import InviteMemberModal from "./components/modal/inviteMemberModal";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppProvider>
                    <Switch>
                        <Route component={Login} path="/login"/>
                        <Route component={ChatRoom} path="/"/>
                    </Switch>
                    <AddRoomModal/>
                    <InviteMemberModal/>
                </AppProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
