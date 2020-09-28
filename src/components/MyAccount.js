import React,{useState} from 'react';
import store from '../store/store';



export default function MyAccount(){
    const [firstName,setFirstName] = useState(store.getState().userinfo.firstName);
    const [lastName,setLastName] = useState(store.getState().userinfo.lastName);
    const [email,setEmail] = useState(store.getState().userinfo.email);
    const [phone,setPhone] = useState(store.getState().userinfo.phone);
    
    function dragImageOver (e){
        e.stopPropagation();
        e.preventDefault();
        e.target.style.cssText = "background-color:black; outline-offset: -20px;";
    }

    function dragImageLeave(e){
        e.stopPropagation();
        e.preventDefault();
        e.target.style.cssText = "background-color:gray; outline-offset: -10px;";
        
    }

    function dropFile(e){
        e.stopPropagation();
        e.preventDefault();
        dragImageOver(e);
        let files = e.dataTransfer.files;

        if(files.length >1){
            alert("Please upload only one Image");
            return;
        }
        console.log(files);
        if(files[0].type.match(/image.*/)){

        }else{
            alert("Please upload Image Files please");
            return;
        }
    }
   
    return(
        <div className="accountpage">
            <div className="userNav">
                <ul>
                    <li>MyAccount</li>
                    <li>Favorite</li>
                </ul>
            </div>
            <div className="mainInfo">
                <div className="userImage">
                    <div>
                        <div onDrop={dropFile} onDragLeave={dragImageLeave} onDragOver={dragImageOver}>

                        </div>
                        <input type="file"></input>

                    </div>
                   <span>
    <h1>{store.getState().userinfo.firstName + " " + store.getState().userinfo.lastName}</h1>
    </span>
                </div>
               
                <div className="data">
                <div>
                    <label>FirstName: </label><input type="text" onChange={(e)=>{
                        setFirstName(e.target.value);
                    }} value={firstName}></input>
                </div>
                <div>
                   <label>Lastname: </label><input type="text" onChange={(e)=>{
                       setLastName(e.target.value);
                   }} value={lastName}></input>
                </div>
            </div >
            <div className="data">
                <div>
                <label>Email: </label><input type="text" onChange={(e)=>{
                    setEmail(e.target.value);
                }} value={email}></input>

                </div>
                <div>
                <label>Phone: </label><input onChange={function(e){
                    setPhone(e.target.value);
                }} type="text" value={phone}></input>

                </div>
            </div>
            </div>
            

        </div>
    )


}