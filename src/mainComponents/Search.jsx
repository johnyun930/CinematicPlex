import React from 'react';
import Header from '../components/Header';
import store from '../store/store';
import MovieSearch from '../components/MovieSearch';
 

export default  function Search({match}){
    
    store.dispatch({type:"SEARCHTEXT",searchText:match.params.id});

    return(
        <div className="MainPage">
        <Header></Header>
        <MovieSearch></MovieSearch>
        </div>
    )



}