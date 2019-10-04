//Attributions: 
// https://codepen.io/gaearon/pen/oWWQNa?editors=0010
// https://zh-hans.reactjs.org/tutorial/tutorial.html
// https://www.w3schools.com/jsref/jsref_map.asp
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root, channel) {
  ReactDOM.render(<Starter channel={channel} />, root);
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
  return <button type="button" className="hidden" onClick={() => props.onClick()}>wut</button>

}



// initialize the states
class Starter extends React.Component {
  constructor(props) {
    super(props);
    this.channel = props.channel
    this.state = {
      letters: [],
      matching: [],
      show: [],
      clicks: 0,
      click_disabled: false
    };
  this.channel
	.join()
	.receive("ok",this.got_view.bind(this))
	.receive("error",resp =>{console.log("Unable to join",resp);});  
      
  }


  got_view(view){
    console.log("new view",view);
    this.setState(view.game);
  
  }

// pressing reset to return to the original state	
  restart() {
    this.channel.push("restart",{})
	        .receive("ok", this.got_view.bind(this));
  }



  render() {
    if(this.state.matching.length == 2){
  	    this.channel.push("match",{})
  	                .receive("ok", this.got_view.bind(this));
    }

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

  clickHandler(ii){
    
      this.channel.push("click",{index:ii})
		  .receive("ok", this.got_view.bind(this));
    
  
  } 
}
