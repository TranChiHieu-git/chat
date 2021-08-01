import React, {useContext, useMemo} from 'react';
import styled from "styled-components";
import {Avatar, Button, Tooltip} from "antd";
import {UserAddOutlined} from "@ant-design/icons";
import {AppContext} from "../../context/AppProvider";

const HeaderStyled = styled.div`
    display:flex;
    justify-content:space-between;
    height:80px;
    padding: 0 20px;
    align-items: center;
    border-bottom:1px solid rgb(230,230,230);

    .header{
        &-info{
            display:flex;
            flex-direction:column;
            justify-content:center;
        }
        &-title{
            margin:0;
            font-weight:bold;
            font-size:28px;
        }
        &-description{
            font-size:16px;
            color:rgba(0,0,0,0.6);
        }
    }
`
const ButtonGroupStyled = styled.div`
    display:flex;
    aligh-items:center
`

function Header(props) {
    let {selectedRoom, member, setIsInviteMember} = useContext(AppContext);
    return (
        <HeaderStyled>
            <div className="header-info">
                <p className="header-title">{selectedRoom && selectedRoom.name}</p>
                <span className="header-description">{selectedRoom && selectedRoom.description}</span>
            </div>
            <ButtonGroupStyled>
                <Button icon={<UserAddOutlined/>} type="text" size="large"
                        onClick={() => setIsInviteMember(true)}>Mời</Button>
                <Avatar.Group size="medium" maxCount={2}>
                    {
                        (member || []).map(mem => <Tooltip key={mem.uid}
                                                           title={mem && mem.displayName ? mem.displayName : "A"}>
                            <Avatar src={mem.photoURL}>{mem && mem.photoURL ? mem.photoURL : "A"}</Avatar>
                        </Tooltip>)
                    }
                </Avatar.Group>
            </ButtonGroupStyled>
        </HeaderStyled>
    );
}

export default Header;
