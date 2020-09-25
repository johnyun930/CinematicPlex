import React,{useState} from 'react';
import {Button} from 'react-bootstrap'
import {NavLink} from 'react-router-dom';
import store from '../store/store';




function Header (){
    console.log("Header");
    const[toggle,setToggle] = useState(false);
    const[searchtext,setText] = useState("");

    const[login,setlogin] = useState(store.getState().login);
    var currentstate= null;
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
    store.subscribe(()=>{
        setlogin(store.getState().login);
    })

    var member = <div className="userstate">
        <div><div>My Account</div></div
        ><div><div>Setting</div></div>
        <div><div onClick={()=>{
            store.dispatch({type:"LOGIN",userinfo:{userid:null,email:null},login:false})
            setToggle(false);
            localStorage.clear();
        }}>Log Out</div></div>
    
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