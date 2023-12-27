import React from "react";

const UserContext = React.createContext();

const UserProvider = (props) => {
    const [userDisplayName,setUserDisplayName] = React.useState('Guest');
    return(
        <UserContext.Provider value={
            userDisplayName
        }>
        {props.children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider};