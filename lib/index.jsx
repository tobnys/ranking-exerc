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
      tempName: "",
      tempScore: "",
      globalId: 4,
      users: []
    }

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSheetData = this.handleSheetData.bind(this);
  }

  handleSheetData(data){

    // Filter out duplicate strings
    let filtered = data.filter(function (a) {
      if (!this.has(a.name)) {
          this.set(a.name, true);
          return true;
      }
    }, new Map);

    // Iterate over the filtered array and set the state for each
    for(let i=0; i<filtered.length; i++){  
      let newUser = {
        name: filtered[i].name,
        score: filtered[i].score,
        id: this.state.globalId
      }
      this.setState({ 
        users: [...this.state.users, newUser]
      })
      this.setState({globalId: this.state.globalId+1})
    }
  }

  handleFormChange(e){
    if(e.target.name === "name"){
      this.setState({tempName: e.target.value});
    }
    else {
      this.setState({tempScore: e.target.value});
    }
  }

  handleSubmit(e){
    e.preventDefault();
    let newUser = {
      name: this.state.tempName,
      score: this.state.tempScore,
      id: this.state.globalId
    }

    // NAME VALIDATION LAYER
    if(this.state.users.length === 0){
      console.log("SET INITIAL state")
      this.setState({ 
        users: [...this.state.users, newUser]
      })
      this.setState({globalId: this.state.globalId+1})
    }
    else {
      for(let i=0; i<this.state.users.length; i++){
        if(newUser.name === this.state.users[i].name){
          console.log("User already exists.");
          //break;
        }
        else {
          console.log("SET state")
          this.setState({ 
            users: [...this.state.users, newUser]
          })
          this.setState({globalId: this.state.globalId+1})
        }
      }
    }
  }
  
  render () {
    const stateUsers = this.state.users;

    function NewScoreTile(props){
      const items = stateUsers.map((user) => (
        <div key={user.id} className="score-tile">
          <p><b>ID:</b> {user.id} | <b>Name:</b> {user.name}</p>
          <p><b>Scores:</b> {user.score}</p>
        </div>
      ));
  
      return (
        <div className="score-tile">
            {items}
        </div>
      )
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
        <h1 className="m-t">Mediatool</h1>
        <MTRow>
          <MTColumn width={ 20 }>
            <ExcelDropzone
              onSheetDrop={this.handleSheetData}
              label="Drop your file here"
            />
          </MTColumn>
          <MTColumn width={ 75 } offset={ 5 }>
            <div className="form-container">
              <h2>Add new tile</h2>
              <p>Use the form below to add new users to the scoreboard.</p>
              <form onSubmit={this.handleSubmit}>
                <label>
                  Name: <input type="text" name="name" value={this.state.value} onChange={this.handleFormChange} />
                </label>
                <label>
                  Score: <input type="number" name="score" value={this.state.value} onChange={this.handleFormChange} />
                </label>
                <input type="submit" value="Submit" id="input-btn" />
              </form>
            </div>
          </MTColumn>
        </MTRow>
        <MTRow>
          <MTColumn>
            <div className="scoreboard">
              <ScoreTile /> 
              <NewScoreTile />
            </div>
          </MTColumn>
        </MTRow>
      </div>
    )
  }
}
