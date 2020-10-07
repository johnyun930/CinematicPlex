import React,{useState} from 'react';
import {Button} from 'react-bootstrap'
import {NavLink} from 'react-router-dom';
import store from '../store/store';




function Header (props){
    console.log("Header");
    const[toggle,setToggle] = useState(false);
    const[searchtext,setText] = useState("");
    const[login,setlogin] = useState(store.getState().login);
    var currentstate= null;
    store.subscribe(()=>{
        setlogin(store.getState().login);
    })
   
    if(!login){
        if(localStorage.state === undefined){
            currentstate =<NavLink id="login" to = {"/login"}><div>Login</div></NavLink>;
        }else{
            var userinfo = JSON.parse(localStorage.state);

            console.log(userinfo);

            store.dispatch({type:"LOGIN",userinfo:userinfo,login:true})
          
        }
    }else{
        console.log("Logged in state")
    currentstate = <div id="usericon" onClick={function(e){setToggle(!toggle); console.log(toggle)}}>{store.getState().userinfo.userid}</div>
    }
  
  

    var member = <div className="userstate">
        <div><div><NavLink to = "/userpage">My Account</NavLink></div></div>
        <div><div>Setting</div></div>
        <div><NavLink to = "/"><div onClick={()=>{
            store.dispatch({type:"LOGIN",userinfo:{userid:null,email:null},login:false})
            setToggle(false);
            localStorage.clear();
        }}>Log Out</div></NavLink></div>
    
    </div>

    return(
    <header>
        <div>
        <h1><NavLink to = "/">CineMaticPlex</NavLink></h1>
        </div>
        <div className="searchform">
        <input placeholder="Search Movie..." id="searchText" type="text" value={searchtext} onChange={(e)=>{setText(e.target.value);}}></input>
        <NavLink to = {"/search/"+searchtext}><Button> search</Button></NavLink>
        </div>
      <div className ="userinfo"> 
        {currentstate}
        {toggle? member : ""}
       </div>

    </header>
    )

}

export default Header;