import React from 'react'
import ExcelDropzone from './excel-dropzone.jsx'
import { MTRow, MTColumn } from 'mt-ui'

// Local dataset imports
import users from "../lib/user"
import scores from "../lib/scores"

export default class Main extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name: "",
      score: 0
    }

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSheetData (data) {
    // replace this log with actual handling of the data
    console.log(data)
  }

  handleFormChange(e){
    if(e.target.name === "name"){
      this.setState({name: e.target.value});
    }
    else {
      this.setState({score: e.target.value});
    }
  }

  handleSubmit(e){
    e.preventDefault();
    console.log("Name:", this.state.name, "Score:", this.state.score);
    if(this.state.name === "Barry" || this.state.name === "Jane" || this.state.name === "Kim"){
      console.log("User already exists.");
    }
    else {
      addNewTile();
    }
  }



  render () {

    function addNewTile(){

    }

    function ScoreTile(props){
      const items = users.map((item) => (
        <div key={item._id} className="score-tile">
          <p><b>ID:</b> {item._id} | <b>Name:</b> {item.name}</p>
          <p><b>Scores:</b> {getScores(item._id)}</p>
        </div>
      ));

      return (
        <div className="score-tile">
            {items}
        </div>
      )
    }

    function getScores(id){
      let values = [];
      let largestValue = 0;  
      for(let i=0; i<scores.length; i++){
        if(scores[i].userId === id){
          values.push(scores[i].score.toString());
        }
      }
      values.sort(function(a,b){return b-a});
      return values.join(", ");
    }

    return (
      <div className="container container--centered">
        <h1 className="m-t">Mediatool exercise</h1>
        <MTRow>
          <MTColumn width={ 20 }>
            <ExcelDropzone
              onSheetDrop={this.handleSheetData}
              label="Drop your file here"
            />
          </MTColumn>
          <MTColumn width={ 75 } offset={ 5 }>
            <div>
              <h2>Add new tile</h2>
              <p>Use the form below to add new users to the scoreboard.</p>
              <form onSubmit={this.handleSubmit}>
                <label>
                  Name: <input type="text" name="name" value={this.state.value} onChange={this.handleFormChange} />
                </label>
                <label>
                  Score: <input type="text" name="score" value={this.state.value} onChange={this.handleFormChange} />
                </label>
                <input type="submit" value="Submit" />
              </form>
            </div>
          </MTColumn>
        </MTRow>
        <MTRow>
          <MTColumn>
            <div className="scoreboard">
              <ScoreTile /> 
            </div>
          </MTColumn>
        </MTRow>
      </div>
    )
  }
}
