import { createContext } from "react";

const ProfileFieldContext = createContext({
    updating: false,
    pendingRequest: false,
    setModalOpen: (value: boolean) => {}
})

export default ProfileFieldContext;