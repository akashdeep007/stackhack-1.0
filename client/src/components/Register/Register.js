import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';


import RegisterForm from "./RegisterForm";
import PreviewForm from './PreviewForm';
import axios from 'axios';

import firebase from '../../config/firebase'



const Register = (props) => {
    const [formState, setForm ] = useState({
        Fullname: '',
        EmailId: '', 
        MobileNumber: '', 
        RegistrationType: 'self', 
        TicketNumber: '1', 
        IdCardUrl: '',
        IdCard: '',
        flag: false,
        uploadProgress : 0,
    })

    const inputHandler = (event) => {
        const text = event.target.value;
        const field = event.target.name;
        console.log(text, field);
        switch(field){
            case 'name':
                setForm({...formState, Fullname: text});
                break;
            case 'contact':
                setForm({...formState,  MobileNumber: text }); 
                break;
            case 'email':
                setForm({...formState,  EmailId: text });
                break;
            case 'tickets':
                setForm({...formState,  TicketNumber: text });
                break;
            case 'idcard':
                setForm({...formState,  IdCard : event.target.files[0] })
                break;
            case 'regtype':
                setForm({...formState,  RegistrationType: text });
                break;
            default:
                break;
        }
    }
    
    const submitHandler = async (event) => {
        event.preventDefault();
        const fileType = formState.IdCard.type.split('/')[1];
        const fileName = formState.MobileNumber + '.' + fileType;
        const storage = firebase.storage();
        
        const uploadTask = storage.ref(`images/${fileName}`).put(formState.IdCard);
        uploadTask.on("state_changed",
        snapshot => {
            setForm({...formState ,uploadProgress : (Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100)})
        },
        error => {
            console.log(error);
        },
        () => {
            storage.ref('images').child(fileName).getDownloadURL().then(async url => {
                console.log(url)
                setForm({...formState, IdCardUrl : url })
                try{
                    const dbResponse = await axios.post('https://stackhack-backendserver.herokuapp.com/reg/registration', {
                        Fullname: formState.Fullname,
                        EmailId: formState.EmailId,
                        MobileNumber: formState.MobileNumber,
                        RegistrationType: formState.RegistrationType,
                        TicketNumber: formState.RegistrationType === 'self' ? '1' : formState.TicketNumber,
                        IdCardUrl: url,
                    })
                    if(!dbResponse){
                        console.log("Error");
                    }
                    props.history.push({pathname : '/register'});
                    props.history.replace({pathname : '/register'});
                    props.history.goBack();
                } catch(e) {
                    console.log(e)
                }

            })
        }
        )    
    }

    const previewButtonHandler =  () =>{
        setForm({...formState, flag : !formState.flag })
    }
    const displayComponent = formState.flag === false ? <RegisterForm inputHandler={inputHandler} previewButtonHandler={previewButtonHandler} values={formState} /> : <PreviewForm previewButtonHandler={previewButtonHandler} submitHandler={submitHandler} values={formState} />;
    
    return(
        <div className="register-page">
            <div className="event-info">
                <h1>Ideathon</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem beatae explicabo amet facilis alias perferendis fugit at labore quaerat velit aliquam nesciunt, </p>
            </div>
            { displayComponent }
        </div>
    )
}

export default withRouter(Register);