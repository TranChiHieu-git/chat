import React, {createContext, useContext, useMemo, useState} from 'react';
import UseFileStore from "../hook/useFileStore";
import {AuthContext} from "./AuthProvider";

export const AppContext = createContext(undefined, undefined);

function AppProvider(props) {
    let [isAddRoom, setIsAddRoom] = useState(false);
    let [isInviteMember, setIsInviteMember] = useState(false);
    let [selectedRoomId, setSelectedRoomId] = useState("");
    let user = useContext(AuthContext);
    let roomCondition = useMemo(() => ({
        fieldName: 'members',
        operator: 'array-contains',
        compareValue: user.uid
    }), [user.uid]);
    const room = UseFileStore('rooms', roomCondition);
    const selectedRoom = useMemo(() => room?.find(item => item.id === selectedRoomId) || {}, [room, selectedRoomId]);


    let userCondition = useMemo(() => {
        let obj = {
            fieldName: 'uid',
            operator: 'in',
            compareValue: [""],
        }
        if (selectedRoom && selectedRoom.members) {
            obj.compareValue = selectedRoom.members;
        }
        return obj;
    }, [selectedRoom]);
    const member = UseFileStore('users', userCondition) || [];
    return (
        <AppContext.Provider
            value={{
                room, isAddRoom, setIsAddRoom, selectedRoomId, setSelectedRoomId, selectedRoom, member,
                isInviteMember, setIsInviteMember
            }}>
            <React.Fragment>{props.children}</React.Fragment>
        </AppContext.Provider>
    );
}

export default AppProvider;
