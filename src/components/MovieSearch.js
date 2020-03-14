import React, {useState, useEffect} from 'react';
import store from "../store/store";
import { NavLink } from 'react-router-dom';
export default function Search(){
    console.log('movieSearch');
    const [id,setid] = useState(store.getState().searchText);
    const [load,setLoad] = useState(store.getState().search.load);
    var data =store.getState().search.data;
    var err = store.getState().search.err;
    var list = []

    

    
    useEffect(()=>{
        console.log("fetch before");
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=cf6dc907f9b6a84f1badeaf8248d3946&language=en-US&page=1&include_adult=false&query=${id}`).then(res => res.json()).then((result) =>{
            store.dispatch({type:'SEARCH',search:{data:result.results,err:null,load:true}})
            console.log("succedd");

        },(err)=>{
            store.dispatch({type:'SEARCH',search:{data:null,err:err,load:true}})
          
        })

    })

    store.subscribe(()=>{
        setLoad(store.getState().search.load);
        setid(store.getState().searchText);
    });

    console.log(data);
console.log(list.length)
        if(err!=null){
            return<h2>Err Causes</h2>
        }else if(!load){
            return<h2>LOADING ....</h2>
        }
        
        else if(load&&data!=null){

            for(var i=0; i<data.length;i++){
                var image = data[i].poster_path;
                if(image !=null){
                list.push(<div className="item"><NavLink to = {"/trailer/"+data[i].id}><img onMouseOver={function(e){
                    var a = e.target;
                    
                    a.style.opacity = 0.5;
                }} onMouseOut={function(e){
                   var b = e.target;
                   b.style.opacity =1;
                }} src={"https://image.tmdb.org/t/p/w500"+image}></img>
                <p>{data[i].title}</p></NavLink>
                </div>)
                }else{
                list.push(<div className="item"><NavLink to = {"/trailer/"+data[i].id}><img ></img><p>{data[i].title}</p></NavLink></div>)

                }
            }

            if(list.length===0){
            return(<h2>Sorry, we could not find any information about {id}</h2>)
            }else{
        return(<div className="movieContainer">
            {list}
            
        </div>)
            }
        }
    

}