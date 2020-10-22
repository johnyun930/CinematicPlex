import React from 'react';
import Header from '../components/Header';
import PasswordChange from '../components/PasswordChange';

export default function ChangePassword(props){

        return(
            <div className="MainPage">
            <Header></Header>
            <PasswordChange history={props.history} ></PasswordChange>
            </div>
        )
  
    
}