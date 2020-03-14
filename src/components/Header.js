import React,{useState,useEffect} from 'react';
import {Button} from 'react-bootstrap'
import {NavLink} from 'react-router-dom';




function Header (props){
    console.log("Header");
    const[searchtext,setText] = useState("");

    const[login,setlogin] = useState("");

    return(
    <header>
        <h1><NavLink to = "/">CineMaticPlex</NavLink></h1>
        <div className="searchform">
        <input placeholder="Search Movie..." id="searchText" type="text" value={searchtext} onChange={(e)=>{setText(e.target.value)}}></input>
        <NavLink to = {"/search/"+searchtext}><Button> search</Button></NavLink>
        <NavLink id="login" to = {"/login"}>Login</NavLink>

        </div>
        
    </header>
    )

}

export default Header;