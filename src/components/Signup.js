import React from 'react';
import mainImage from '../images/mainImage.jpg';
import { NavLink } from 'react-router-dom';

export default function Signup(){
    return(
        <div className="signupPage">
        <div className="signupImage"><img alt="Cinematicplex" src={mainImage}></img> </div>

        <div className="signup">
        
        <form action="/register" method="post">
        <fieldset>
        <legend>Sign Up</legend>
        <p><input type ="text" placeholder="Username" pattern="[\w]{6,15}" name="username"></input></p>
        <p><input id="password" type ="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,15}" placeholder="Password" name="password"></input> </p>
        <p><input type ="password" onBlur={(e)=>{
            if(e.target.value !== document.getElementById("password").value){
                e.target.style.border = "1px solid red ";
            }else{
                e.target.style.border = "1px solid green ";
            }
        }} placeholder="Confirm Password" name="confirmPassword"></input></p>
        <p><input type ="text" pattern="\w{6,15}@[a-z,A-Z]+.(com|net|co.kr)$"  placeholder="Email"  name="email"></input> </p>
        <p><input type ="text" pattern="[a-z,A-Z]{2,20}" placeholder="FirstName" name="firstname"></input></p> 
        <p><input type ="text" pattern="[a-z,A-Z]{2,20}" placeholder="LastName" name="lastname"></input> </p>
        <p><input type ="text" pattern="^\d{3}\d{3}\d{4}$" placeholder="PhoneNumber" name ="phone"></input></p>
        <p><input type ="submit" onClick={(e)=>{
            
        }} name="submit" value="Sign Up"></input></p>
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