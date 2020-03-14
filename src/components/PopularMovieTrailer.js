import React, {useState, useEffect} from 'react';
import store from "../store/store";
import {NavLink} from 'react-router-dom';
export default function PMovie(){
    const [load,setLoad] = useState(store.getState().pmovie.load);
    const [ImageNum,setImageNum] = useState(0);
    var err = store.getState().pmovie.err;
    var data = store.getState().pmovie.data
    var list = [];
    console.log(store.getState());
    store.subscribe(()=>{
        setLoad(store.getState().pmovie.load)
    });
    useEffect(()=>{
        fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=cf6dc907f9b6a84f1badeaf8248d3946&language=en-US&page=1").then(
            res => res.json()
        ).then(
            (result) =>{
                store.dispatch({type:'PMOVIE',pmovie:{data:result.results,err:null,load:true}})
                

            },(err)=>{
                store.dispatch({type:'PMOVIE',pmovie:{data:null,err:err,load:true}})
              
            }
        )
    },[])


    if(err != null){
        return <div className="PMovie">{err.message}</div>
        }else if(!load){
            return <div className="PMovie"><h1>Loading...</h1></div>
        }else if(data!=null&&load){

            for(let i=ImageNum * 5; i<(ImageNum+1)*5;i++){
                let title = data[i].title
                if(title.length>20){
                    title = title.substr(0,20)+"...";
                }
                list.push(
                    <div className="panel">
            <div className="wrap_part">
                <NavLink to={"/trailer/"+data[i].id} ><img src={"https://image.tmdb.org/t/p/w500"+data[i].poster_path} data-id={data[i].id}></img></NavLink>
        <span className="poster_content"><h3>{title}</h3></span>
                <span className="content_state">
                <h4>Rate</h4>
        <span>{data[i].vote_average}</span>


                </span>
            </div>
        </div>


                )
            }

        return(

        <div className="wrapper-pmovie">
        <h2>Top 20 highest Rated Movie Trailer</h2>
        <button onClick={()=>{
            var i = ImageNum;
            i--;
            if(i==-1){
                i=3
            }
            setImageNum(i);
        }}>{"<"}</button>
        <div className="PMovie">
            {list}
        </div>
        <button onClick={()=>{
            var i = ImageNum;
            i++;
            if(i==4){
                i=0;
            }
            setImageNum(i);
        }}>{">"}</button>
        </div>

    )




}
}