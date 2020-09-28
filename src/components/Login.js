import React,{Component} from 'react';
import { NavLink } from 'react-router-dom';
import mainImage from '../images/mainImage.jpg';
import store from '../store/store';



class Login extends Component{
constructor(props){
    super(props);
    this.state={
        username:'',
        password:''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
}

onChange(e){
    this.setState({
        [e.target.name]:e.target.value
    });
}

onSubmit(e){
    e.preventDefault();
    var post ={
        username: this.state.username,
        password: this.state.password
    }
    fetch('/login',{
        method: "POST",
        headers:{
            'content-type': 'application/json'
        },
        body:JSON.stringify(post)

    })
    .then(res=>res.json()
        
    )
    .then(data=>{
        console.log(data);
        let loginInfo = {userid:data.UserName,firstName:data.FirstName,lastName:data.LastName,email:data.Email,phone:data.Phone};
        store.dispatch({type:"LOGIN",userinfo:loginInfo,login:true})
        localStorage.state = JSON.stringify(loginInfo);
        this.props.history.push('/')
    });
}



render(){
    const{username,password} = this.state;
    const{onChange,onSubmit} = this;

return(
<div className="LoginPage">
<div className="loginImage"><img alt="cinematicplex" src={mainImage }></img></div>
<div className="login">
<form onSubmit={onSubmit}>
<fieldset>
<legend>Log In</legend>

<p><input type = "text" name="username" value={username} onChange={onChange} placeholder="Username"></input></p>
<p><input type = "text" name="password" value={password} onChange={onChange}  placeholder="password"></input></p>
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
}
export default Login;