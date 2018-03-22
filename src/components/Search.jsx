class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.handleSubmit = _.debounce(this.handleSubmit, 500);
  }
  
  updateText(e) {
    var that = this;
    this.setState({
      text: e.target.value
    });
    that.handleSubmit();
  }
  
  handleSubmit() {
    var options = {
      q: this.state.text,
      key: window.YOUTUBE_API_KEY,
      maxResults: 5,
      type: 'video',
      part: 'snippet',
      videoEmbeddable: true
    };
    window.searchYouTube(options, (data) => {
      this.props.getVideos(data.items);
    });
  }
  
  render() { //
    return (
    <div className="search-bar form-inline">
      <input className="form-control" type="text" onChange={this.updateText.bind(this)}/>
      <button className="btn hidden-sm-down" onClick={this.handleSubmit.bind(this)}>
        <span className="glyphicon glyphicon-search"></span>
      </button>
    </div>
    );
  } 
  
}



// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.Search = Search;
