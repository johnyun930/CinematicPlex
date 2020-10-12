import React from 'react';
import Header from '../components/Header';
import PasswordChange from '../components/PasswordChange';
import store from '../store/store';

export default function ChangePassword(props){

    if(store.getState().login===true){
        return(
            <div className="MainPage">
            <Header></Header>
            <PasswordChange history={props.history} ></PasswordChange>
            </div>
        )
    }else{
        return;
        props.history.replace('/');
    }
    
}