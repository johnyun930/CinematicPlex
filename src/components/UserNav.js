import React from 'react';
import { NavLink } from 'react-router-dom';

export default function UserNav(props){



    return(
        <div className="userNav">
        <ul>
            <h2>Menu</h2>
            <li><NavLink to="/userpage">MyAccount</NavLink></li>
            <li><NavLink to="/password">Change Password</NavLink></li>
        </ul>
    </div>
    )

}