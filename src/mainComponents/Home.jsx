import React, {Component} from 'react';
import Header from '../components/Header';
import TopMovie from '../components/TopMovie';
import PopularMovieTrailer from '../components/PopularMovieTrailer';
 import MovieReview from '../components/MovieReview';



export default class Home extends Component{
    render(){
        return(
    <div className="MainPage">
    <Header></Header>
     <TopMovie></TopMovie>
     <PopularMovieTrailer></PopularMovieTrailer>
     <MovieReview></MovieReview>
     </div>


        )


        
    }




}