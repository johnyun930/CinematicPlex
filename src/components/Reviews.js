import React, {useState,useEffect} from "react";
import star from "../images/star.svg";
import filledstar from "../images/filledstar.png";
import emptystar from "../images/emptystar.png";
import store from "../store/store";


export default function Review(){
   
    const [reviews,setreviews] = useState([]);
    const [toggle,setToggle] = useState([]);
    const [page, setpage] = useState(0);
    const[review,setreview] = useState("");
    const[rate,setrate] = useState(0);
    const[data,setdata] = useState({});
    const[updaterate,setupdaterate] = useState(0);
    const[updatereview,setupdatereview] = useState("");
    var stars = [];
    var updatestars = [];

    
    

    function readData(data){
        console.log("this is read data");
        var newlist = [];
        if(data === null){
            setreviews(<h3>No Reviews</h3>)
        }else{
            console.log(data)
           
            for(let i=0; i<data.length;i++){
                
                

                if(data[i].Username === store.getState().userinfo.userid){
                   if(toggle[i]===true){
                   var list = <li>
                       
                       <div>
                           <form data-docid={data[i].ID} onSubmit={(e)=>{
                               e.preventDefault();
                               if(data[i].Review===updatereview&&data[i].Rate===updaterate){
                                   console.log("this is same review");
                                var condition = [...toggle];
                                condition[i] = false;
                                setToggle(condition);
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
                          var condition = [...toggle];
                          condition[i] = false;
                          setToggle(condition);
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
                        </div>
                            <div className="updatewriter">
                        <span>Rate:</span>
                        <div className=" updatestar">{updatestars}</div>
                    </div>
                    <div className="updatingcontainer">
                        <div className="updating">
                    <textarea id="updatebox"  name="review" value={updatereview} onChange={(e)=>{
                        

                        setupdatereview(e.target.value);
                        console.log(updatereview);
                    }} placeholder="UpdateReview" rows="10" maxLength="200" size="250"></textarea>
                    
                   </div>
                   <input id="updatebutton" type="submit" value="Update"></input>
                   </div>
                   
                           </form>
                       </div>
                   </li>
                   }else{
                var list =<li>
                <div>
                    <strong>{data[i].Username}</strong>
                    <div>
                        <div className ="star">
                              <img src={star} width="40px"></img>
                        </div>
                        <div className="fixcolumn">
                        <span data-docid={data[i].ID} onClick={function(){
                         console.log("This is onClick");
                          var condition = [false,false,false,false,false];
                          condition[i] = true;
                          setToggle(condition);
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
                    var list =<li>
                <div>
                    <strong>{data[i].Username}</strong>
                    <div>
                        <div className ="star">
                              <img src={star} width="40px"></img>
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
            ratestar = <img src={filledstar} onClick={()=>{
                setrate(i+1);
            }}></img>
        }else{
            ratestar = <img src={emptystar} onClick={()=>{
                setrate(i+1);
            }}></img>
        }
        stars.push(ratestar);
    }

    for(let i=0; i<5;i++){
        let ratestar;
        if(i<updaterate){
            ratestar = <img src={filledstar} onClick={()=>{
                setupdaterate(i+1);
                console.log(updaterate)
            }}></img>
        }else{
            ratestar = <img src={emptystar} onClick={()=>{
                setupdaterate(i+1);
                console.log(updaterate)
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
        setToggle(numofreview);
    }else{
        setToggle(null)
    }
        
    },[data])

    useEffect(()=>{
        readData(data);
   
    },[toggle,updaterate,updatereview])
 




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
                        setdata(data)
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