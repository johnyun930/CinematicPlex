import React,{useState,useEffect} from 'react';
import store from '../store/store';

export default function Description(props){
    const [id, setid] = useState(store.getState().trailerID);
    const [load,setload] = useState(store.getState().description.load);
    var data = store.getState().description.data;
    var err = store.getState().description.err;

    store.subscribe(()=>{
        setload(store.getState().description.load);
        setid(store.getState().trailerID);
    })


   useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=cf6dc907f9b6a84f1badeaf8248d3946&language=en-US`)
    .then( res => res.json()).then((result)=>{
            store.dispatch({type:"DESCRIPTION", description:{data:result,err:null,load:true}});
    },(err)=>{
        store.dispatch({type:"DESCRIPTION", description:{data:null,err:err,load:true}});

    });


   });
   if(err!=null){
    return(<h2>ERROR...</h2>)
   }else if(!load){
       return <h2>LOADING...</h2>

   }else if(data === null){
       return <h2>Sorry no Data</h2>
   }else if(load&&data!=null){
       var gerne = "";
       for(let i=0; i<data.genres.length;i++){
            gerne += data.genres[i].name
            
            if(i !== data.genres.length-1){
                gerne += ", "
            }
       }
       var lang = "";
       for(let i=0; i<data.spoken_languages.length;i++){
        lang += data.spoken_languages[i].name
        
        if(i !== data.spoken_languages.length-1){
            lang += ", "
        }
   }
     return  <div className = "desc">
           <h1>{"Title: "+ data.title}</h1>
           <h3>Overview</h3>
   <p>{data.overview}</p>
   <h4>{"Runtime : " + data.runtime + " min"}</h4>
   <h4>{"Rate : "  + data.vote_average + "/10 (" + data.vote_count + " People Vote)"}</h4>
   <h4>{"Release Date : " + data.release_date}</h4>
   <h4>{"Genres : " + gerne}</h4>
<h4>{"Language : " + lang}</h4>
       </div>
   }
 
}