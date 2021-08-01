import React from 'react';
import {Avatar, Typography} from "antd";
import styled from "styled-components";
import {formatRelative} from "date-fns";

const WrapperStyled = styled.div`
    margin:10px 10px;
    .title {
        display:flex;
        align-items:center;
    }
    .author {
        margin:0 5px;
        font-weight:bold;
        font-size:20px;
    }
    .date {
        margin-left:10px;
        font-size:14px;
        color:#a7a7a7;
    }
    .content {
        margin:20px 40px;
        font-size:16px
    }
`

function Message(props) {
    return (
        <WrapperStyled>
            <div className="title">
                <Avatar src={props?.photoURL}>A</Avatar>
                <Typography.Text className="author">{props?.displayName}</Typography.Text>
                <Typography.Text
                    className="date">{props?.createdAt?.nanoseconds ? formatRelative(new Date(props?.createdAt?.seconds * 1000), new Date()) : ""}</Typography.Text>
            </div>
            <div>
                <Typography.Text className="content">{props?.text}</Typography.Text>
            </div>
        </WrapperStyled>
    );
}

export default Message;
