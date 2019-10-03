// Attributions: 
// https://codepen.io/gaearon/pen/oWWQNa?editors=0010
// https://zh-hans.reactjs.org/tutorial/tutorial.html
// https://www.w3schools.com/jsref/jsref_map.asp
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root) {
  ReactDOM.render(<Starter />, root);
}


// Checking the inputs' attributes to decide if it's clickable, hidden or already got matched. 
function Square(props) {
  if(!(props.finished == "true" || props.match == "true")){
    return <button type="button" className="hidden" onClick={() => props.onClick()}>wut</button>
  }
  else if(props.finished == "true") {
    return <button type="button" className="disabled" disabled> {props.lett} </button>
  }

  else {
    return <button type="button" className="matching"> {props.lett} </button>
  }


}



// initialize the states
class Starter extends React.Component {
  constructor(props) {
    super(props);
    let letter_lst = _.shuffle(["A","A","B","B","C","C","D","D","E","E","F","F","G","G","H","H"]);
    this.state = {
      letters: letter_lst,
      matching: [],
      show: [],
      clicks: 0
    
    };
      
  }


// pressing reset to return to the original state	
  restart() {
    let letter_lst = _.shuffle(["A","A","B","B","C","C","D","D","E","E","F","F","G","G","H","H"]);
    this.setState({
      letters: letter_lst, 
      matching: [], 
      show: [],
      clicks: 0
        
    })
  }



  render() {
    let numClicks = this.state.clicks;
    const {letters,matching, show, clicks} = this.state;
    return (
      <div>	    
        <div className="col">
            {letters.slice(0,4).map((letter,i) =>
                <Square
                lett = {letter}
                onClick = {this.clickHandler.bind(this,i)}
                match = {matching.includes(i).toString()}
                finished = {show.includes(i).toString()}/>
            )}
        </div>
        <div className="col">
            {letters.slice(4,8).map((letter,i) =>
                <Square
                lett = {letter}
                onClick = {this.clickHandler.bind(this,i + 4)}
                match = {matching.includes(i + 4).toString()}
                finished = {show.includes(i + 4).toString()}/>
            )}
        </div>
        <div className="col">
            {letters.slice(8,12).map((letter,i) =>
                <Square
                lett = {letter}
                onClick = {this.clickHandler.bind(this,i + 8)}
                match = {matching.includes(i + 8).toString()}
                finished = {show.includes(i + 8).toString()}/>
            )}
        </div>
        <div className="col">
            {letters.slice(12,16).map((letter,i) =>
                <Square
                lett = {letter}
                onClick = {this.clickHandler.bind(this, i + 12)}
                match = {matching.includes(i + 12).toString()}
                finished = {show.includes(i + 12).toString()}/>
            )}
        </div>


	<div>
	    <button className="reset" onClick={this.restart.bind(this)}> reset </button>
        </div>

	<div>
	    <p className="reminder"> You have clicked: {numClicks} times </p>
	</div>


      </div>
    );
  }

  clickHandler(ii) {
    const {letters, matching, show, clicks} = this.state;
    if(matching == 0) {
      this.setState({matching: matching.concat(ii), clicks: this.state.clicks+1});
    }

    else if (letters[ii] == letters[matching[0]]) {
      this.setState({matching:[], show:show.concat(matching[0], ii), clicks: this.state.clicks+1});
    }
    
    else {
      this.setState({matching:[matching[0], ii]});
      setTimeout(() => {this.setState({matching: [], clicks: this.state.clicks+1})}, 400);
    }
    
    }
}

