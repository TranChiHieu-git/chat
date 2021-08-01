import React, {useContext} from 'react';
import Header from "./header";
import Content from "./content";
import styled from "styled-components";
import {AppContext} from "../../context/AppProvider";
import {Alert} from "antd";

const WrapperStyled = styled.div`
   height:100vh;
`

function Chatwindow(props) {
    let {selectedRoom} = useContext(AppContext);

    return (
        <WrapperStyled>
            {selectedRoom.id ?
                <React.Fragment>
                    <Header/>
                    <Content/>
                </React.Fragment>
                : <Alert message="Hãy chọn phòng" type="info"/>}
        </WrapperStyled>
    );
}

export default Chatwindow;
