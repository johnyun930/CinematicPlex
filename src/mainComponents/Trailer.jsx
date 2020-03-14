import React,{useState,useEffect} from 'react';
import Video from '../components/Video';
import Header from '../components/Header';
import store from '../store/store';
import Description from '../components/Description';
export default function Trailer({match}){
    store.dispatch({type:"TRAILERID",trailerID:match.params.id});

    return(
        <div className="MainPage">
            <Header></Header>
            <Video ></Video>
            <Description ></Description>
        </div>





    )



}