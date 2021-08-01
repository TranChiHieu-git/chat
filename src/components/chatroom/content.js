import React, {useContext, useMemo, useState} from 'react';
import styled from "styled-components";
import {Button, Form, Input} from "antd";
import Message from "./message";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import {addDocument} from "../../firebase/service";
import {AppContext} from "../../context/AppProvider";
import {AuthContext} from "../../context/AuthProvider";
import UseFileStore from "../../hook/useFileStore";

const ContentStyled = styled.div`
    height:calc(100% - 80px);
    display:flex;
    flex-direction:column;
    padding:11px;
    justify-content: flex-end; 
`
const MessageListStyled = styled.div`
    max-height:100%;
    overflow-y:auto;
`
const FormStyled = styled(Form)`
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:2px 2px 2px 0;
    border:1px solid rbg(230,230,230);
    border-radius:2px;
    .ant-form-item{
        flex:1;
        margin-bottom:0px;
        border-bottom:1px solid rgba(0,0,0,0.1);
    }
`

function Content(props) {
    const [inputValue, setInoutValue] = useState("");
    let {selectedRoom} = useContext(AppContext);
    let user = useContext(AuthContext);
    let [form] = Form.useForm();
    const handleInputChange = (e) => {
        if (e && e.target && e.target.value) {
            setInoutValue(e.target.value);
        }
    }
    const handleOnSumit = () => {
        addDocument('message', {
            text: inputValue,
            uid: user.uid,
            photoURL: user.photoURL,
            roomId: selectedRoom.id,
            displayName: user.displayName,
        });
        form.resetFields();
    }
    let condition = useMemo(() => {
        return {
            fieldName: 'roomId',
            operator: "==",
            compareValue: selectedRoom.id
        }
    }, [selectedRoom]);
    let message = UseFileStore('message', condition);
    console.log(message)
    return (
        <ContentStyled>
            <MessageListStyled>
                {
                    message && message.length > 0 && message.map((item, index) => <Message keys={index}
                                                                                           {...item}/>
                    )
                }
            </MessageListStyled>
            <FormStyled form={form}>
                <Form.Item name="message">
                    <Input bordered={false} autoComplete="off" placeholder="Nội dung tin nhắn ..."
                           onChange={handleInputChange} onPressEnter={handleOnSumit}/>
                </Form.Item>
                <Button type="primary" onClick={handleOnSumit}>Gửi</Button>
            </FormStyled>
        </ContentStyled>
    );
}

export default Content;
