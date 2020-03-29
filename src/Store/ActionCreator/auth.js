import * as actionTypes from '../ActionTypes';
import axios from 'axios';
import Auth from '../../Components/Auth/Auth';
import Firebase from '../../Components/Fire/base';
import * as actionCreators from '../index';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    };
};

export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authSuccess = (idToken, localId, userName) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        localId: localId,
        userName: userName
    };
};

export const logout = () => {
    Firebase.auth().signOut()
    .then(() => {
        Auth.logout(() => {
            localStorage.clear();
        })
    });
    return{
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 10000);
    };
};


export const auth =(mail, password, signup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: mail,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDO75_JLsPIhabnS8XrLgOGFwsjE3q8D24';
        if(signup){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDO75_JLsPIhabnS8XrLgOGFwsjE3q8D24';
        }

        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('userName', response.data.displayName);
                Auth.login(() => {
                    dispatch(authSuccess(response.data.idToken, response.data.localId, response.data.displayName));
                    dispatch(checkAuthTimeout(response.data.expiresIn));
                    dispatch(actionCreators.fetchRecipes(response.data.localId));
                });
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');;
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                const userName = localStorage.getItem('userName');
                Auth.login(() => {
                    dispatch(authSuccess(token, userId, userName));
                    dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
                    dispatch(actionCreators.fetchRecipes(userId));
                });
            }   
        }
    };
};