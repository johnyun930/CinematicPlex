import React,{useState,useEffect} from 'react';
import store from '../store/store';
export default function Video(props){
    const [id,setId] = useState(store.getState().trailerID);
    const [load,setload] = useState(store.getState().trailer.load);
    var data = store.getState().trailer.data;
    var err = store.getState().trailer.err;
    store.subscribe(()=>{
        setload(store.getState().trailer.load);
        setId(store.getState().trailerID);
    });
    
    
    useEffect(()=>{
        fetch(`http://api.themoviedb.org/3/movie/${id}/videos?api_key=cf6dc907f9b6a84f1badeaf8248d3946`)
        .then( res => res.json()).then((result)=>{
                store.dispatch({type:"TRAILER",trailer:{load:true,data:result.results,err:err}})
        },(err)=>{
            store.dispatch({type:"TRAILER",trailer:{load:true,data:null,err:err}})
        });
    });

    if(err != null){
        return <div className="Video">Error... Sorry try again</div>
        }else if(!load){
            return <div className="Video"><h1>Loading...</h1></div>
        }else if(data === null){
            return(<div className="Video"> <h2>Sorry, there is no trailer..</h2></div>)
         }
        
        else if(data!=null&&load){
           
            return(
        <div className="Video">
        <div>
        <iframe width="1106" 
        height="622" src={"https://www.youtube.com/embed/"+data[0].key+"?rel=0"}
        frameborder="0" allow="accelerometer; autoplay; 
        encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        </div>

    )

}

}