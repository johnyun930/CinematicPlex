import React, {Component} from 'react';
import mainImage from '../images/mainImage.jpg';
import { NavLink } from 'react-router-dom';

export default function Signup(){
    return(
        <div className="signupPage">
        <div className="signupImage"><img src={mainImage}></img> </div>

        <div className="signup">
        
        <form action="/register" method="post">
        <fieldset>
        <legend>Sign Up</legend>
        <p><input type ="text" placeholder="Username" name="username"></input></p>
        <p><input type ="text" placeholder="Password" name="password"></input> </p>
        <p><input type ="text" placeholder="Email" name="email"></input> </p>
        <p><input type ="text" placeholder="FirstName" name="firstname"></input></p> 
        <p><input type ="text" placeholder="LastName" name="lastname"></input> </p>
        <p><input type ="submit" name="submit" value="Sign Up"></input></p>
        <p>
        <NavLink to="/login">Already have account? Log In</NavLink>
        <NavLink to="/">Go Home</NavLink>
        </p>
        </fieldset>



        </form>
        
        </div>
        </div>

    )




}