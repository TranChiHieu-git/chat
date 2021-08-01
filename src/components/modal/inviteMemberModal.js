import React, {useContext, useMemo, useState} from 'react';
import {Avatar, Form, Input, Modal, Select, Spin} from "antd";
import {AppContext} from "../../context/AppProvider";
import {addDocument} from "../../firebase/service";
import {AuthContext} from "../../context/AuthProvider";
import {debounce} from "lodash";
import {db} from "../../firebase/config";

function DebounceSelect({fetchOptions, debounceTimeout = 500, ...props}) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);
            fetchOptions(value).then(newOptions => {
                setOptions(newOptions);
                setFetching(false);
            })
        }
        return debounce(loadOptions, debounceTimeout);
    }, []);
    return <Select
        labelInValue
        onSearch={debounceFetcher}
        filterOption={false}
        notFoundContent={fetching ? <Spin size={"large"}/> : null}
        {...props}
    >
        {
            options.map(item => <Select.Option key={item.value} value={item.value} title={item.label}>
                <Avatar src={item.photoURL}>
                    {item.photoURL ? "" : item.displayName?.charAt(0).toUpperCase()}
                </Avatar>
                {item.label}
            </Select.Option>)}
    </Select>
}

function fetchUserList(search) {
    return db().collection('users')
        .where('displayName', "==", search)
        .limit(10)
        .get().then(snapShot => snapShot.docs.map(doc => {
            return {
                ...doc.data(),
                label: doc.data().displayName,
                value: doc.data().uid,
            }
        }));
}

function InviteMemberModal(props) {
    let {isInviteMember, setIsInviteMember, selectedRoomId, selectedRoom} = useContext(AppContext);
    let [value, setValue] = useState(null);
    let user = useContext(AuthContext);
    let [form] = Form.useForm();
    let handleCancel = () => {
        setIsInviteMember(false);
        form.resetFields();
    };
    let handleOk = () => {
        let roomRef = db().collection('rooms').doc(selectedRoomId);
        let arrayUpdate = [];
        value.map(val => {
            if (selectedRoom.members.findIndex(x => x === val.value) === -1) {
                arrayUpdate.push(val.value);
            }
        });
        roomRef.update({
            members: [...selectedRoom.members, ...arrayUpdate]
        });
        setIsInviteMember(false);
        form.resetFields();
    };
    return (
        <Modal title="Mời bạn bè"
               visible={isInviteMember}
               onOk={handleOk}
               onCancel={handleCancel}
        >
            <Form form={form} layout="vertical">
                <DebounceSelect
                    mode="multiple"
                    lable="Nhập tên thành viên"
                    value={value}
                    placeholder="Tên thành viên"
                    fetchOptions={fetchUserList}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    style={{width: "100%"}}
                />
            </Form>
        </Modal>
    );
}

export default InviteMemberModal;
