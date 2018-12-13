import React,{Component} from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash'
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import Videolist from './components/video_list';
import VideoDetail from './components/video_detail';



const API_KEY = 'AIzaSyA6tmbVvVmmVaMuf7pLD8dp2f0Gsqjqpbw';
class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            videos:[],
            selectedVideo:null 
            };
            this.videoSearch('surfboards');
        }
            videoSearch(term){
                YTSearch({key:API_KEY, term:term}, (videos)=>{
                    this.setState({ 
                        videos:videos,
                        selectedVideo:videos[0]
                    });
                     
                });
            }
        
    
    render(){
        const videoSearch = _.debounce((term) =>{this.videoSearch(term)},300);
        return(
            <div>
               <h1>youtube videos search app</h1>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <Videolist
                onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                 videos={this.state.videos}/> 
            </div>
        )
    }
    
}
   
    ReactDom.render(<App />, document.querySelector('.container'))

