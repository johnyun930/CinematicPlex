import {createStore} from 'redux';
console.log("store loading");

const init = {
    topmovie:{
        load:false,
        data:null,
        err:null,
    },
    pmovie:{
        load:false,
        data:null,
        err:null,
    },
    trailer:{
        load:false,
        data:null,
        err:null
    },
    search: {
        load:false,
        data:null,
        err:null
    },
    searchText:null,
    description: {
        load:false,
        data:null,
        err:null
    },
    trailerID:null
}


export default createStore((state=init,action)=>{

    
    if(action.type === 'TOPMOVIE'){
       return state = {...state,topmovie:{data:action.topmovie.data,load:action.topmovie.load,err:action.topmovie.err}}
       
    }
   
    if(action.type === 'PMOVIE'){
        state ={...state,pmovie:action.pmovie}
        console.log(state);
        return state;
    }
    
    if(action.type === 'TRAILER'){
        return {...state,trailer:action.trailer}
    }
    if(action.type === 'SEARCH'){
        return {...state,search:action.search}
    }
    if(action.type === 'SEARCHTEXT'){
        return {...state,searchText:action.searchText,search: {
            load:false,
            data:null,
            err:null
        }}
    }
    if(action.type === 'DESCRIPTION'){
        return {...state, description:action.description}
      
    }
    if(action.type === 'TRAILERID'){
        return {...state, trailerID:action.trailerID,trailer:{
            load:false,
            data:null,
            err:null
        },description: {
            load:false,
            data:null,
            err:null
        }}
    }
    return state;
   }
, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

