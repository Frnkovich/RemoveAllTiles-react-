'use strict';
(function () {
  const colorList = ['green','red','yellow','pink','blue','purple','orange','brown'];
  const maxPair = 8;
  const defaultColor = '#2F4F4F';
  let selectedTiles = [];
  let totalRounds = 0;
  let matchingPair = 0;

  class App extends React.Component {
    constructor(props) {
      super(props);
      this.tileClick = this.tileClick.bind(this);
      this.state = {
        gameOver : false
      }
    }

    openTile (evt) {
      selectedTiles.push(evt);
      evt.style.background = evt.id;
      evt.setAttribute('class', 'square open');
    }

    closeTiles () {
      selectedTiles.map (function(tile){
        tile.setAttribute('class', 'square');
        tile.style.background = defaultColor;
      })
      selectedTiles = [];
    }

    checkPair () {
      totalRounds++;
      if (selectedTiles[0].id === selectedTiles[1].id) {
        matchingPair++;
        selectedTiles = [];
        if (matchingPair === maxPair){
          this.setState({
            gameOver : true
          })
        }
      }
    }

    tileClick(evt) {
      if (evt.target !== evt.currentTarget && evt.target.className !== 'square open' && !selectedTiles[1]) {
        this.openTile(evt.target);
        if (selectedTiles[1]){
          this.checkPair();
          setTimeout(this.closeTiles, 500);
        }
      }
    }

    render() {
      const pairList = createPairList(colorList);
      return (
        <div>
          <TitleScreen gameOver={this.state.gameOver} />
          <div className="container" onClick={this.tileClick}>
            {
              pairList.map(function(color, i) {
                return <Tile id = {color} key = {i}/>
              })
            }
          </div>
        </div>
      )
    }
  }

  const createPairList = (defaultList) => {
    return (
      defaultList.concat(defaultList).sort(function(a,b){
        return Math.random() - 0.5;
      })
    )
  }


  const restart = () => {
    window.location.reload();
  }

  const Tile = (props) => {
      return (
        <div className='square' id = {props.id} colors = {props.colors}></div>
      )
  }

  const TitleScreen = (props) => {
    return (
      <div className={props.gameOver ? "title" : "hide"}>
        <div className="overlay"></div>
          <div className="visible">
            <h1>You win!</h1>
            <div className="content">
              <p>Total rounds: {totalRounds}</p>
            </div>
            <div className="out-circle">
              <div className="inner-circle" onClick={restart}>Play again</div>
            </div>
          </div>
        </div>
    )
  }

  ReactDOM.render(
    <App />,
    document.getElementById('root'),
  )
})();
