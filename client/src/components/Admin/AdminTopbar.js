import React from 'react';
import jwt_decode from 'jwt-decode';


const AdminTopbar = (props) => {
    const decoded = jwt_decode(props.token);
    return(
        <div className="adminTopbar">
            <h4>Welcome ! {decoded.email} </h4>
            <button type="button" onClick={props.logoutHandler}>Log Out</button>
        </div>
    );
}

export default AdminTopbar;