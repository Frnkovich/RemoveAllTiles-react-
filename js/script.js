'use strict';
(function () {
  let colorList = ['green','red','yellow','pink','green','blue','purple','yellow','orange','orange','pink','brown','purple','red','brown','blue'];

  class Container extends React.Component {
    constructor(props) {
      super(props);
      this.tileClick = this.tileClick.bind(this);
      this.start = this.start.bind(this);
      this.closeTiles = this.closeTiles.bind(this);
      this.state = {
        tiles : [],
        selectedTiles : [],
        totalRounds : 0,
        matchingPair : 0,
        gameStart : 1,
        gameOver : 0
      }
    }

    start() {
      let colorListSort = colorList.sort(function(a,b){
        return Math.random() - 0.5;
      });
      let tiles = colorListSort.map(function (color) {
        return {
          color : color
        }
      })

      this.setState({
        gameStart : 0,
        tiles : tiles,
      })
    }

    openTile(evt) {
      this.state.selectedTiles.push(evt);
      evt.style.background = this.state.tiles[evt.id].color;
      evt.setAttribute('class', 'square open');
    }

    closeTiles() {
      this.state.selectedTiles.map (function(tile){
        tile.setAttribute('class', 'square');
        tile.style.background = '#2F4F4F';
      })

      this.setState({
        selectedTiles : []
      })
    }

    restart() {
      window.location.reload();
    }

    checkPair() {
      this.state.totalRounds++;
      let tiles = this.state.selectedTiles;
      if (colorList[tiles[0].id] === colorList[tiles[1].id]) {
        this.state.matchingPair++;
        this.setState({
          selectedTiles : []
        })
        if (this.state.matchingPair === 8){
          this.setState({
            gameOver : 1
          })
        }
      }
    }

    tileClick(evt) {
      if (evt.target !== evt.currentTarget && evt.target.className !== 'square open' && !this.state.selectedTiles[1]) {
        this.openTile(evt.target);
        if (this.state.selectedTiles[1]){
          this.checkPair();
          setTimeout(this.closeTiles, 500);
        }
      }
    }

    render() {
      return (
        <div>
          <TitleScreen start={this.start} restart={this.restart} gameStart={this.state.gameStart} gameOver={this.state.gameOver} totalRounds={this.state.totalRounds}/>
          <div className="container" onClick={this.tileClick} >
          {
            this.state.tiles.map(function(tile, i) {
              return <Tile id = {i} key = {i} />
            })
          }
          </div>
        </div>
      )
    }
  }

  class Tile extends React.Component {
    render() {
      return (
        <div className='square' id = {this.props.id}></div>
      )
    }
  }

  class TitleScreen extends React.Component{
     constructor(){
        super();
      }

       render(){
         return (
            <div>
              <div className={this.props.gameStart ? "title-sreen" : "hide"} onClick={this.props.start}>
               <div className="overlay"></div>
                 <div className="visible">
                   <h1>CLick to start!</h1>
                 </div>
              </div>
              <div className={this.props.gameOver ? "win-msg" : "hide"}>
              <div className="overlay"></div>
                <div className="visible">
                  <h1>You win!</h1>
                  <div className="content">
                    <p>Total rounds: {this.props.totalRounds}</p>
                  </div>
                  <div className="out-circle">
                    <div className="inner-circle" onClick={this.props.restart}>Play again</div>
                  </div>
                </div>
              </div>
            </div>
           )
       }
  }

    ReactDOM.render(
      <Container />,
      document.getElementById('root'),
    )
})();
