import React from 'react';
import { NavLink } from 'react-router-dom';
import mainImage from '../images/mainImage.jpg';


export default function Login(){
return(
<div className="LoginPage">
<div className="loginImage"><img src={mainImage }></img></div>
<div className="login">
<form action="/login" method="post">
<fieldset>
<legend>Log In</legend>

<p><input type = "text" name="username" placeholder="Username"></input></p>
<p><input type = "password" name="password" placeholder="password"></input></p>
<div>
<input type = "submit" value="Login"></input>
</div>
<p>
<NavLink to = "/">Forget Password?</NavLink>
    <NavLink to = "/signup">
Don't have an account? Sign Up</NavLink>
   
</p>
</fieldset>

</form>
</div>
</div>






)


}

