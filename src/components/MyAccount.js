import React,{useState} from 'react';
import store from '../store/store';



export default function MyAccount(){
    const [firstName,setFirstName] = useState(store.getState().userinfo.firstName);
    const [lastName,setLastName] = useState(store.getState().userinfo.lastName);
    const [email,setEmail] = useState(store.getState().userinfo.email);
    const [phone,setPhone] = useState(store.getState().userinfo.phone);
    const [userImageFile,setUserImageFile] = useState({});
    const [imageUrl,setimageUrl] = useState(null);
    const [imageTitle,setImageTitle] = useState(null);
    
    store.subscribe(()=>{
        setFirstName(store.getState().userinfo.firstName);
        setLastName(store.getState().userinfo.lastName);
        setPhone(store.getState().userinfo.phone);
        setEmail(store.getState().userinfo.email);

    })

    console.log(store.getState().userinfo);

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
                let reader = new FileReader();
                            
                            reader.onloadend = () => {
                               setUserImageFile(file);
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
        console.log(store.getState().userinfo.userid)
        e.preventDefault();
        let post = {
            UserName: store.getState().userinfo.userid,
            UserImage: userImageFile,
            FirstName: firstName,
            LastName: lastName,
            Email:email,
            Phone: phone
        }
        fetch('/updateUser',{
            method:"POST",
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(post)
        }).then(res=>res.json()).then(data=>{
            let userinfo = {
                userid: data.UserName,
                 email: data.Email,
                firstName: data.FirstName,
                lastName: data.LastName,
                phone: data.Phone
            }
            store.dispatch({
                type: 'UPDATEUSERINFO',
                userinfo:userinfo
            })
        })

    }
   
    return(
        <div className="accountpage">
            <div className="userNav">
                <ul>
                    <li>MyAccount</li>
                    <li>Favorite</li>
                </ul>
            </div>
            <form onSubmit={onSubmit}>
            <div className="mainInfo">
                <div className="userImage">
                    <div>
                        <div style={(imageUrl!==null)?{outline:"none"}:{}}  onDrop={dropFile} onDragLeave={dragImageLeave} onDragOver={dragImageOver}>
                            <img src={imageUrl}></img>
                        </div>  
                        <input onChange={(e)=>{
                            e.preventDefault();
                            let reader = new FileReader();
                            let file = e.target.files[0];
                            console.log(file);
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
            <div>
                <input type="submit" value="Update Info"></input>
            </div>
            </div>
            </form>

        </div>
    )


}