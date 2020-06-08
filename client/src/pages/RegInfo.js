import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

const UserInfo = (props) => {
    const [userInfo, updateUser ] = useState({
        
    });
    useEffect(() => {
        const url = "https://stackhack-backendserver.herokuapp.com/reg/registration/";
        const tokenString = "Bearer " + props.token; 
        axios.get(url + props.match.params.id, { headers : { Authorization : tokenString}}).then(res => {
            updateUser(res.data.registration);
        }).catch(e => {
            console.log(e);
        })
    }, [props.match.params.id, props.token, userInfo]);

    const backHandler = () => {
        props.history.goBack();
    }
    return (   
        <div className="preview-page">
            <div>
            <img src={userInfo.IdCardUrl} alt="Logo"/>
            <div className="preview-info">
                <label><span>Name :</span> {userInfo.Fullname}</label>
                <label><span>Contact :</span> {userInfo.MobileNumber}</label>
                <label><span>Email :</span> {userInfo.EmailId}</label>
                <label><span>Registration Type :</span> {userInfo.RegistrationType}</label>
                <label><span>Ticket Number :</span> {userInfo.TicketNumber}</label>
            </div>
            </div>
            <div className="button-bar">
                <button onClick={backHandler}>Back</button>
            </div>
        </div>);
}

const mapStateToProps = state => {
    return {
      token: state.auth.token,
    }
  }

export default connect(mapStateToProps) (withRouter(UserInfo));