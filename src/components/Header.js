import React from 'react';
import {NavLink,Route} from 'react-router-dom';



function Header (props){
    return(
    <header>
        <h1><NavLink to = "/">CineMaticPlex</NavLink></h1>
        <ul>
            <li>Movie</li>
            <li>Ticket</li>
            <li>Theater</li>
            <li><input type="text"></input></li>
            <li><button>search</button></li>

        </ul>
    </header>
    )

}

export default Header;