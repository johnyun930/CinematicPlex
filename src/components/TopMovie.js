import React,{Component} from 'react';
import store from '../store/store';
import { NavLink } from 'react-router-dom';


export default class TopMovie extends Component{
    constructor(props){
        super(props);
        this.state ={
            load : store.getState().topmovie.load,
            data : store.getState().topmovie.data,
            error : store.getState().topmovie.error,
            ImageNum: 0
        }
        
        store.subscribe(()=>{
            this.setState({
                load : store.getState().topmovie.load,
                data : store.getState().topmovie.data,
                error : store.getState().topmovie.error
            })

        });
     
    }
    

    componentDidMount(){
        fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=cf6dc907f9b6a84f1badeaf8248d3946&language=en-US&page=1").then(
            res => res.json()
        ).then(
            (result) =>{
                store.dispatch({
                    type:"TOPMOVIE",
                    topmovie:{
                        data:result.results,
                        error:null,
                        load:true
                    }
                })
            },(err)=>{
                    
                     store.dispatch({
                        type:"TOPMOVIE",
                        topmovie:{
                            data:null,
                            error:err,
                            load:true
                        }
                     })
            }
        )
    }


  render(){

    if(this.state.err != null){
    return <div className="top8">{this.state.err.message}</div>
    }else if(!this.state.load){
        return <div className="top8"><h1>Loading...</h1></div>
    }else{
        var list = [];
 

        for(let i=this.state.ImageNum*6; i<((this.state.ImageNum+1)*6);i++){
            if(i<20){
            var title =this.state.data[i].title;
            if(title.length>20){
                title = title.substr(0,15)+"...";
            }
            list.push(<div className="panel">
            <div className="wrap_part">
            <NavLink to={"/trailer/"+this.state.data[i].id}><img alt="trailer" src={"https://image.tmdb.org/t/p/w500"+this.state.data[i].poster_path} ></img></NavLink>
        <span className="poster_content"><h3>{title}</h3></span>
                <span className="content_state">
                <h4>Rate</h4>
        <span>{this.state.data[i].vote_average}</span>


                </span>
            </div>
        </div>)
            }else{
                break;
            }
        }
    return(

        <div className="wrapper">
                <h2>Current Popular Movie</h2>
            <button className="carouselbtn left" onClick={()=>{
              

                var i = this.state.ImageNum;
                i--
                if(i===-1){
                   i = 3
                }
                this.setState({ImageNum:i})
            }}>{"<"}</button>
        <div className="top8">
            {list}
        </div>
        <button className="carouselbtn right" onClick={()=>{
                  var i = this.state.ImageNum;
                  i++
                  if(i===4){
                     i= 0
                  }
                  this.setState({ImageNum:i})

            }}>{">"}</button>
        </div>
    )

    }

}
}