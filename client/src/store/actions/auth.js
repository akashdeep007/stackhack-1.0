import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};


export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};


export const auth = (email, password, isSignUp) => {
    return dispatch => {
        const authData = {
            email: email,
            password: password,
        };
    
    if(isSignUp){
        axios.post('https://stackhack-backendserver.herokuapp.com/auth/register', authData).then(res => {
        }).catch(err => {
            console.log(err);
            dispatch(authFail(err));
        });
            
    } else {
        axios.post('https://stackhack-backendserver.herokuapp.com/auth/login',{ email : email, password : password }).then(res => {
            dispatch(authSuccess(res.data.token, res.data.AdminId));
        }).catch(err => {
            console.log(err);
            dispatch(authFail(err));
        })
    }
    }
}