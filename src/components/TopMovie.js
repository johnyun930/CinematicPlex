import React,{Component} from 'react';


export default class TopMovie extends Component{
    constructor(props){
        super(props);
        this.state ={
            load : false,
            data : null,
            error : null
        }
    }
    componentDidMount(){
        fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=cf6dc907f9b6a84f1badeaf8248d3946&language=en-US&page=1").then(
            res => res.json()
        ).then(
            (result) =>{
                console.log(result);

                this.setState(
                    {
                        load:true,
                        data:result.results
                    }
                );
                    console.log("https://image.tmdb.org/t/p"+this.state.data[0].poster_path);
            },(err)=>{
                this.setState(
                    {
                        load:true,
                        err: err
                    }
                );
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

        for(let i=0; i<4;i++){
            list.push(<div className="panel">
            <div className="wrap_part">
                <a><img src={"https://image.tmdb.org/t/p/w500"+this.state.data[i].poster_path}></img></a>
        <span className="poster_content"><h3>{this.state.data[i].original_title}</h3></span>
                <span className="content_state">
                <h4>Rate</h4>
        <span>{this.state.data[i].vote_average}</span>


                </span>
            </div>
        </div>)
        }
    return(

        
        <div className="top8">
            {list}
        </div>
    )

    }

}
}