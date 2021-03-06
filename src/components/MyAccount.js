import React,{useState} from 'react';
import store from '../store/store';
import UserNav from './UserNav';



export default function MyAccount(){
    const [firstName,setFirstName] = useState(store.getState().userinfo.firstName);
    const [lastName,setLastName] = useState(store.getState().userinfo.lastName);
    const [email,setEmail] = useState(store.getState().userinfo.email);
    const [phone,setPhone] = useState(store.getState().userinfo.phone);
    const [userImageFile,setUserImageFile] = useState(null);
    const [imageUrl,setimageUrl] = useState(store.getState().userinfo.profile); 
    const [imageTitle,setImageTitle] = useState(null);
    
    store.subscribe(()=>{
        setFirstName(store.getState().userinfo.firstName);
        setLastName(store.getState().userinfo.lastName);
        setPhone(store.getState().userinfo.phone);
        setEmail(store.getState().userinfo.email);
        setimageUrl(store.getState().userinfo.profile);

    });
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
        let file = files[0];
        if(file.type.match(/image.*/)){
            setUserImageFile(file);
                let reader = new FileReader();
                            
                            reader.onloadend = () => {
                               setimageUrl(reader.result);
                               setImageTitle(file.name);

                            }
                            reader.readAsDataURL(file);

        }else{
        e.target.style.cssText = "background-color:gray; outline-offset: -10px;";
            alert("Please upload Image Files please");
            return;
        }
    }

    function onSubmit(e){
        e.preventDefault();
        let formdata = new FormData();
        let userid = store.getState().userinfo.userid;
        formdata.append("username",userid);
        formdata.append("firstName",firstName);
        formdata.append("lastName",lastName);
        formdata.append("email",email);
        formdata.append("phone",phone);
        if(userImageFile!=null){
        formdata.append("userImage",userImageFile,userid+".jpg");
        }
        fetch('/updateUser',{
            method:"POST",
            headers:{},
            body:formdata
        }).then(res=>res.json()).then(data=>{
            let userinfo = {
                userid: data.UserName,
                 email: data.Email,
                firstName: data.FirstName,
                lastName: data.LastName,
                phone: data.Phone,
                profile: imageUrl
            }
            store.dispatch({
                type: 'UPDATEUSERINFO',
                userinfo:userinfo
            })
        })

    }
   
    return(
        <div className="accountpage">
           <UserNav></UserNav>
            <form onSubmit={onSubmit}>
            <div className="mainInfo">
                <div className="userImage">
                    <div>
                        <div style={(imageUrl!==null)?{outline:"none"}:{}}  onDrop={dropFile} onDragLeave={dragImageLeave} onDragOver={dragImageOver}>
                            <img alt="userImage" src={imageUrl}></img>
                        </div>  
                        <input onChange={(e)=>{
                            e.preventDefault();
                            let reader = new FileReader();
                            let file = e.target.files[0];
                            reader.onloadend = () => {
                               setUserImageFile(file);
                               setimageUrl(reader.result);
                               setImageTitle(file.name);
                            }
                            reader.readAsDataURL(file);
                        }}  type="file" ></input>
                        <strong>{(imageTitle===null?" change profile":imageTitle)}</strong>

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
            <div >
                <input id="submit" type="submit" value="Update Info"></input>
            </div>
            </div>
            </form>

        </div>
    )


}