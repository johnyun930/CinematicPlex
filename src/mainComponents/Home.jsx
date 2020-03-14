import React, {Component} from 'react';
import Header from '../components/Header';
import TopMovie from '../components/TopMovie';
import PopularMovieTrailer from '../components/PopularMovieTrailer';



export default class Home extends Component{
    render(){
    console.log("Home Render");

        return(
    <div className="MainPage">
    <Header></Header>
     <TopMovie></TopMovie>
     <PopularMovieTrailer></PopularMovieTrailer>
     </div>


        )


        
    }




}