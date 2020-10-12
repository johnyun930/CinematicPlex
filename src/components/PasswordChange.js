import React, {useState} from 'react';
import UserNav from './UserNav';
import store from '../store/store';
import { NavLink } from 'react-router-dom';

export default function PasswordChange(props){
    const [password,setPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [confirmNewPassword,setConfirmNewPassword] = useState("")
    const [confirm,setConfirm] = useState(false);
    const userid = store.getState().userinfo.userid;
    let content;
    if(confirm){
        content = <div className="changePassword">
            <h3>Change Password</h3>
            <span>Rule: 8 to 20 letters. At least cotain 1 number, symbol, 1 upper and 1 lower letter</span>
            <div>
            <div>
            <label>New Password: </label><input pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,20}" type="password" placeholder="type your password" value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}}></input>
            </div>
            <div>
            <label>Confirm Password: </label><input type="password" placeholder="confirm your password" value={confirmNewPassword} onChange={(e)=>{setConfirmNewPassword(e.target.value)}}></input>
            </div>
            <div>
            <input type="submit" onClick={(e)=>{
                e.preventDefault();
                if(newPassword !== confirmNewPassword){
                    alert("New password is not same with confirm password");
                    return
                }else if(password === newPassword){
                    alert("Please use different password with last password");
                    return
                }
                let post ={
                    username: userid,
                    password: newPassword,
                }

                fetch('/changePassword',{
                    method:"PUT",
                    headers:{
                        'content-type': 'application/json'
                    },
                    body:JSON.stringify(post)
                }).then(res=>res.json()).then(data=>{
                    if(data.State){
                        alert(data.Message);
                        alert("Please Log In Again");
                        props.history.push('/');
                        store.dispatch({type:"LOGIN",userinfo:{userid:null,email:null},login:false});
                        localStorage.clear();
                    }else{
                        alert(data.Message)
                        return;
                    }
                })

            }} value="Confirm Password"></input>
            </div>
            </div>
        </div>
        

    }else{
        content = <div className="changePassword">
        <h3>Confirm Password</h3>
        <div>
        <div>
        <label>Userid: </label><input type="text" value={store.getState().userinfo.userid} disabled></input>
        </div>
        <div>
        <label>Password: </label><input type="password" placeholder="type your password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
        </div>
        <div>
        <input type="submit" onClick={(e)=>{
            e.preventDefault();
            let post ={
                username: userid,
                password: password
            }

            fetch('/confirmPassword',{
                method:"POST",
                headers:{
                    'content-type': 'application/json'    
                },
                body:JSON.stringify(post)
            }).then(res=>res.json()).then(data=>{
                if(data.State){
                    setConfirm(true)
                }else{
                    alert(data.Message);
                }
            })

        }} value="Confirm Password"></input>
        </div>
        </div>
        </div>
    }
    return(
        <div className="accountpage">
            <UserNav></UserNav>
            <div className="mainInfo">
                {content}              
            </div>
        </div>
    )
}