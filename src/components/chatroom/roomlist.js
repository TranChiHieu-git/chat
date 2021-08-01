import React, {useContext, useEffect, useMemo} from 'react';
import {Button, Collapse, Typography} from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import styled from "styled-components";
import {PlusSquareOutlined} from "@ant-design/icons";
import UseFileStore from "../../hook/useFileStore";
import {AuthContext} from "../../context/AuthProvider";
import {AppContext} from "../../context/AppProvider";

const PanelStyled = styled(CollapsePanel)`
    &&&{
        .ant-collapse-header span{
            color:white;
            font-size:26px;
            font-weight:bold;
        }
        .ant-collapse-header svg{
            color:white;
            font-size:26px;
            font-weight:bold;
        }
        .ant-collapse-content-box{
            padding:0 54px
        }
        .add-room{
            color:white;
            padding:0;
            font-size:26px;
        }
    }
`

const LinkStyled = styled(Typography.Link)`
    display:block;
    margin-bottom:5px;
    color:white !important;
    font-size:20px;
`

function Roomlist(props) {
    let {room, setIsAddRoom, setSelectedRoomId} = useContext(AppContext);
    const handleAddRoom = () => {
        setIsAddRoom(true);
    }
    const handleSelectRoom = (id) => {
        setSelectedRoomId(id);
    }
    return (
        <React.Fragment>
            <Collapse ghost defaultActiveKey="1">
                <PanelStyled header={<span>Danh sách các phòng</span>} key="1">
                    {
                        room && room.map(item => <LinkStyled key={item.id}
                                                             onClick={() => handleSelectRoom(item.id)}>{item.name}</LinkStyled>)
                    }
                    <Button type="text" icon={<PlusSquareOutlined/>} className="add-room" onClick={handleAddRoom}>Thêm
                        phòng</Button>
                </PanelStyled>
            </Collapse>
        </React.Fragment>
    );
}

export default Roomlist;
