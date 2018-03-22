class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      videos: window.exampleVideoData,
      currVideo: 0
    };
    this.getVideos = this.getVideos.bind(this);
  }
  
  componentWillMount() {
    var options = {
      q: '',
      key: window.YOUTUBE_API_KEY,
      maxResults: 5,
      type: 'video',
      part: 'snippet',
      videoEmbeddable: true
    };
    window.searchYouTube(options, (data) => {
      this.getVideos(data.items);
    });    
    console.log(this.state.videos);
  }
  
  changeCurrentVideo(e, index) {
    this.setState({
      currVideo: index
    });
  }
  
  getVideos(array) {
    console.log(array);
    this.setState({
      videos: array,
      currVideo: 0
    });
  }
  
  render() {
    const changeCurrentVideo = this.changeCurrentVideo.bind(this);
    const getVideos = this.getVideos.bind(this);
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search getVideos={getVideos} />
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.videos[this.state.currVideo]} />
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.videos} titleClick={changeCurrentVideo}/>
          </div>
        </div>
      </div>
    );    
  }

}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;

ReactDOM.render(<App />, document.getElementById('app'));
