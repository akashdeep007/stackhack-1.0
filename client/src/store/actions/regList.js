import axios from 'axios';
import * as actionTypes from './actionTypes';


export const listUpdate = (regList) => {
    return {
        type: actionTypes.REGLIST_UPDATE,
        regList : regList,
    };
};

export const typeUpdate = (regType, typeCount) => {
    return {
        type: actionTypes.REGTYPE_UPDATE,
        typeCount : typeCount,
        regType : regType
    };
};

export const regTypeUpdate = (tokenString) => {
    return dispatch => {
        axios.get('https://stackhack-backendserver.herokuapp.com/reg/count/self', { headers : { Authorization: tokenString }}).then(res => {
            dispatch(typeUpdate('self', parseInt(res.data.split(':')[1])))
        });
        axios.get('https://stackhack-backendserver.herokuapp.com/reg/count/other', { headers : { Authorization: tokenString }}).then(res => {
            dispatch(typeUpdate('other', parseInt(res.data.split(':')[1])))
        });;
        axios.get('https://stackhack-backendserver.herokuapp.com/reg/count/coorporate', { headers : { Authorization: tokenString }}).then(res => {
            dispatch(typeUpdate('coorporate', parseInt(res.data.split(':')[1])))
        });;
        axios.get('https://stackhack-backendserver.herokuapp.com/reg/count/group', { headers : { Authorization: tokenString }}).then(res => {
            dispatch(typeUpdate('group', parseInt(res.data.split(':')[1])))
        });;
    }
}

export const regListUpdate = (tokenString) => {
    return dispatch => {
        axios.get("https://stackhack-backendserver.herokuapp.com/reg/registration", { headers : { Authorization: tokenString }}).then(res => {
            dispatch(listUpdate(res.data.Registrations));
        }).catch(e => {
            console.log(e);
        })
    }
}