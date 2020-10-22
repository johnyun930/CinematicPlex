import React, {useState,useEffect} from "react";
import star from "../images/star.svg";
import filledstar from "../images/filledstar.png";
import emptystar from "../images/emptystar.png";
import store from "../store/store";


export default function Review(){
   
    const [reviews,setreviews] = useState([]);
    const [updateToggle,setUpdateToggle] = useState([]);
    const[review,setreview] = useState("");
    const[rate,setrate] = useState(0);
    const[data,setdata] = useState({});
    const[updaterate,setupdaterate] = useState(0);
    const[updatereview,setupdatereview] = useState("");
    var stars = [];
    var updatestars = [];

    
    

    function readReview(data){
        var newlist = [];
        if(data === null){
            setreviews(<h3>No Reviews</h3>)
        }else{
            for(let i=0; i<data.length;i++){
                let list;
                if(data[i].Username === store.getState().userinfo.userid){
                    
                    if(updateToggle[i]===true){
                    list = <li>  
                       <div>
                           <form data-docid={data[i].ID} onSubmit={(e)=>{
                               e.preventDefault();
                               if(data[i].Review===updatereview&&data[i].Rate===updaterate){
                                let condition = [...updateToggle];
                                condition[i] = false;
                                setUpdateToggle(condition);
                               }else{
                                   let post = {
                                    ID: e.target.dataset.docid,
                                    MovieID:(store.getState().trailerID).toString(),
                                    Username:store.getState().userinfo.userid,
                                     Rate: updaterate.toString(),
                                     Review: updatereview,
                                   }
                                
                                   fetch("/updatereview",{
                                    method:"POST",
                                    headers:{
                                     'content-type': 'application/json'
                                 },
                                 body:JSON.stringify(post)  
                                }).then(res=>res.json()).then(seconddata=>{
                                setdata(seconddata);
                                })

                               }
                           }}>
                               <div className="updatefixcolumn">
                           <div >
                        <span  onClick={function(){
                          var condition = [...updateToggle];
                          condition[i] = false;
                          setUpdateToggle(condition);
                        }}>Update</span>
                          |
                        <span data-docid={data[i].ID} onClick={function(e){
                            if(data[i].Username === store.getState().userinfo.userid){
                            let doublecheck = window.confirm("Are you sure to delete this comment??");
                            if(doublecheck){
                               fetch("/deletereview",{
                                   method:"POST",
                                   headers:{
                                    'content-type': 'application/json'
                                },
                                body:JSON.stringify({ID:(e.target.dataset.docid).toString(),movieid:(store.getState().trailerID).toString()})  
                               }).then(res=>res.json()).then(seconddata=>{
                               setdata(seconddata);
                               })
                            }
                    }else{
                            alert("This is not your comment. you cannot revise it");
                        }
                        }}>Delete</span>
                        </div>
                        </div>
                            <div className="updatewriter">
                        <span>Rate:</span>
                        <div className=" updatestar">{updatestars}</div>
                    </div>
                    <div className="updatingcontainer">
                        <div className="updating">
                    <textarea id="updatebox"  name="review" value={updatereview} onChange={(e)=>{
                        

                        setupdatereview(e.target.value);
                    }} placeholder="UpdateReview" rows="10" maxLength="200" size="250"></textarea>
                    
                   </div>
                   <input id="updatebutton" type="submit" value="Update"></input>
                   </div>
                   
                           </form>
                       </div>
                   </li>
                   }else{
                  list =<li>
                <div>
                    <strong>{data[i].Username}</strong>
                    <div>
                        <div className ="star">
                              <img src={star} alt="rating" width="40px"></img>
                        </div>
                        <div className="fixcolumn">
                        <span data-docid={data[i].ID} onClick={function(){
                         let condition = [];
                         for(let i=0; i<updateToggle.length;i++){
                            condition.push(false);
                         }
                          condition[i] = true;
                          setUpdateToggle(condition);
                          setupdaterate(Number(data[i].Rate));
                          setupdatereview(data[i].Review);
                          
                          
                        }}>Update</span>
                          |
                        <span data-docid={data[i].ID} onClick={function(e){
                            if(data[i].Username === store.getState().userinfo.userid){
                            var doublecheck = window.confirm("Are you sure to delete this comment??");
                            if(doublecheck){
                               fetch("/deletereview",{
                                   method:"POST",
                                   headers:{
                                    'content-type': 'application/json'
                                },
                                body:JSON.stringify({ID:(e.target.dataset.docid).toString(),movieid:(store.getState().trailerID).toString()})  
                               }).then(res=>res.json()).then(seconddata=>{
                               setdata(seconddata);
                               })
                            }
                    }else{
                            alert("This is not your comment. you cannot revise it");
                        }
                        }}>Delete</span>
                        </div>
                       
                        <div className ="rate">
                        <span>{data[i].Rate}</span>
                        </div>
                        
                    </div>
                    <p>{data[i].Review}</p>
                    <div className="reviewfoot">
                        <span>{data[i].Date}</span>
                    </div>
                </div>
            </li>
                    }
            }
            else{
                    list =<li>
                <div>
                    <strong>{data[i].Username}</strong>
                    <div>
                        <div className ="star">
                              <img src={star} alt="rating" width="40px"></img>
                        </div>
                         <div className ="rate">
                        <span>{data[i].Rate}</span>
                        </div>
                        
                    </div>
                    <p>{data[i].Review}</p>
                    <div className="reviewfoot">
                        <span>{data[i].Date}</span>
                    </div>
                </div>
            </li>
                }
            newlist.push(list)
            }
            
            setreviews(newlist)
        }
    
    }
 
    for(let i=0; i<5;i++){
        let ratestar;
        if(i<rate){
            ratestar = <img src={filledstar} alt="rating" onClick={()=>{
                setrate(i+1);
            }}></img>
        }else{
            ratestar = <img src={emptystar} alt="rating" onClick={()=>{
                setrate(i+1);
            }}></img>
        }
        stars.push(ratestar);
    }

    for(let i=0; i<5;i++){
        let ratestar;
        if(i<updaterate){
            ratestar = <img src={filledstar} alt="rating" onClick={()=>{
                setupdaterate(i+1);
            }}></img>
        }else{
            ratestar = <img src={emptystar} alt="rating" onClick={()=>{
                setupdaterate(i+1);
            }}></img>
        }
        updatestars.push(ratestar);
    }

    useEffect(()=>{
        fetch("/getreview",{
            method:"POST",
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify({movieid:(store.getState().trailerID).toString()})
        }).then(res=>res.json()).then(result=>{
            
           setdata(result)
        })
    },[])

    useEffect(()=>{
        var numofreview = []
        if(data!=null){
        for(let k=0; k<data.length;k++){
            numofreview.push(false)
        }
        setUpdateToggle(numofreview);
    }else{
        setUpdateToggle(null)
    }
        
    },[data])

    useEffect(()=>{
        readReview(data);
   
    },[data,updateToggle,updaterate,updatereview])
 




    return(
        
        <div className="review">
        <h2>User Review</h2>
            <div className="review_info">
                <ul>
                    {reviews}
                </ul>
            </div>
            <div className="review_write">
            
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    if(store.getState().userinfo.userid===null){
                        alert("Please Log in")
                        window.location.replace("/login");
                    }else{
                    var post = {
                        MovieID:(store.getState().trailerID).toString(),
                        Username:store.getState().userinfo.userid,
                        Rate: rate.toString(),
                        Review: review,
                    }
                    fetch('/writereview',{
                        method:"POST",
                        headers:{
                            'content-type': 'application/json'
                        },
                        body:JSON.stringify(post)
                    }).then(res=>res.json()).then(data=>{
                        let condition = [];
                         for(let i=0; i<data.length;i++){
                            condition.push(false);
                         }
                        setUpdateToggle(condition);
                        setdata(data);
                        setrate(0);
                        setreview("");
                    });
                }
                }}>
                    <div className="ratewriter">
                        <span>Rate:</span>
                        <div className="reviewstar">{stars}</div>
                    </div>
                    <div className="writingcontainer">
                        <div className="writing">
                    <textarea id="textbox"  name="review" value={review} onChange={(e)=>{
                        setreview(e.target.value)
                    }} placeholder="Write Review" rows="10" maxLength="200" size="250"></textarea>
                   </div>
                  
                   </div><input id="button" type="submit" value="write"></input>
                </form>
            </div>


        </div>



    )



}