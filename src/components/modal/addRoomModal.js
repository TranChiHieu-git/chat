import React, {useContext} from 'react';
import {Form, Input, Modal} from "antd";
import {AppContext} from "../../context/AppProvider";
import {addDocument} from "../../firebase/service";
import {AuthContext} from "../../context/AuthProvider";


function AddRoomModal(props) {
    let {isAddRoom, setIsAddRoom} = useContext(AppContext);
    let user = useContext(AuthContext);
    let [form] = Form.useForm();
    let handleCancel = () => {
        setIsAddRoom(false);
        form.resetFields();
    };
    let handleOk = () => {
        addDocument("rooms", {...form.getFieldsValue(), members: [user.uid]})
        setIsAddRoom(false);
        form.resetFields();
    };
    return (
        <Modal title="Tạo phòng"
               visible={isAddRoom}
               onOk={handleOk}
               onCancel={handleCancel}
        >
            <Form form={form} layout="vertical">
                <Form.Item label="Tên phòng" name="name">
                    <Input placeholder="Tên phòng"/>
                </Form.Item>
                <Form.Item label="Mô tả" name="description">
                    <Input.TextArea placeholder="Mô tả"/>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default AddRoomModal;
