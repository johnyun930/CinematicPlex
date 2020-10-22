import React,{useState} from 'react';
import mainImage from '../images/mainImage.jpg';
import { NavLink } from 'react-router-dom';
import store from '../store/store';

export default function Signup(props){
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassowrd,setConfirmPassowrd] = useState("");
    const [email,setEmail] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [phone,setPhone] = useState("");


    function onSubmit(e){
        e.preventDefault();
        if(password!==confirmPassowrd){
            alert("You type two different password! Please check it");
            return;
        }

        let post = {
            UserName: userName,
            Password: password,
            FirstName: firstName,
            LastName: lastName,
            Email:email,
            Phone: phone,
        }
        fetch("/signup",{
            method:"POST",
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(post)
        }).then(res=>res.json()).then(data=>{
           if(data.State){
            let loginInfo = {userid:userName,firstName:firstName,lastName:lastName,email:email,phone:phone};
            localStorage.state = JSON.stringify(loginInfo);
            props.history.push('/');
            store.dispatch({type:"LOGIN",userinfo:loginInfo,login:true})
            alert(data.Message);
           }else{
               alert(data.Message);
           }

            });

      


    }


    return(
        <div className="signupPage">
        <div className="signupImage"><img alt="Cinematicplex" src={mainImage}></img> </div>

        <div className="signup">
        
        <form onSubmit={onSubmit} >
        <fieldset>
        <legend>Sign Up</legend>
        <p><input type ="text" value={userName} onChange={(e)=>{
            setUserName(e.target.value);
        }} placeholder="Username" pattern="[\w]{6,15}" name="username"></input></p>
        <p><input value={password} onChange={(e)=>{
            setPassword(e.target.value);
        }} type ="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,20}" placeholder="Password: " title="contain 8 or more characters that are of at least one number, one symbol, one uppercase and lowercase letter" name="password"></input> </p>
        <span>8 to 20 letters. At least cotain 1 number, symbol, 1 upper and 1 lower letter</span>
        <p><input value={confirmPassowrd} onChange={(e)=>{
            setConfirmPassowrd(e.target.value);
        }}  type ="password" onBlur={(e)=>{
            if(password !== confirmPassowrd){
                e.target.style.border = "1px solid red ";
            }else{
                e.target.style.border = "1px solid green ";
            }
        }} placeholder="Confirm Password" name="confirmPassword"></input> </p>
        <p><input value={email} onChange={(e)=>{
            setEmail(e.target.value);
        }} type ="text" pattern="\w{6,15}@[a-z,A-Z]+.(com|net|co.kr)$"  placeholder="Email"  name="email"></input> </p>
        <p><input value={firstName} onChange={(e)=>{
            setFirstName(e.target.value);
        }} type ="text" pattern="[a-z,A-Z]{2,20}" placeholder="FirstName" name="firstname"></input></p> 
        <p><input value={lastName} onChange={(e)=>{
            setLastName(e.target.value);
        }} type ="text" pattern="[a-z,A-Z]{2,20}" placeholder="LastName" name="lastname"></input> </p>
        <p><input value={phone} onChange={(e)=>{
            setPhone(e.target.value);
        }} type ="text" pattern="^\d{3}\d{3}\d{4}$" placeholder="PhoneNumber" name ="phone" ></input></p>
        <p><input type ="submit"  name="submit" value="Sign Up"></input></p>
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