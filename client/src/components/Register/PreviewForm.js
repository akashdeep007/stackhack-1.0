import React from "react";



const PreviewForm = (props) => {
    return(
    <div className="preview-page">
        <h1>Preview Form</h1>
        <div>
        <img src={URL.createObjectURL(props.values.IdCard)} alt="Logo"/>
        <div className="preview-info">
            <label><span>Name :</span> {props.values.Fullname}</label>
            <label><span>Contact :</span> {props.values.MobileNumber}</label>
            <label><span>Email :</span> {props.values.EmailId}</label>
            <label><span>Registration Type :</span> {props.values.RegistrationType}</label>
            <label><span>Ticket Number :</span> {props.values.RegistrationType === 'self' ? 1 : props.values.TicketNumber}</label>
        </div>
        </div>
        <div className="button-bar">
            <button onClick={props.previewButtonHandler}>Make Changes</button>
            <button onClick={props.submitHandler}>Submit</button>
        </div>
    </div>);
}

export default PreviewForm;