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
      staticUsers: [{id: 1, showScore: "hide"}, {id: 2, showScore: "hide"}, {id: 3, showScore: "hide"}],
      tempName: "",
      tempScore: "",
      globalId: 4,
      users: [],
      clickedUser: null
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
    if (this.state.users.find(usr => usr.name.toLowerCase() === newUser.name.toLowerCase())){
      console.log("Already saved this name")
    } else {
      this.setState({ 
        users: [...this.state.users, newUser]
      })
      this.setState({globalId: this.state.globalId+1})
    }
  }

  render () {
    const stateUsers = this.state.users;
    const staticUsers = this.state.staticUsers;

    const items2 = stateUsers.map((user) => (
      <div key={user.id} className="score-tile-item-2" onClick={() => this.setState({clickedUser: user.id})}>
        <p data={user.id}>ID: {user.id} | Name: {user.name}</p>
        {this.state.clickedUser === user.id ? 
          <div>
          <p>Scores: {user.score}</p>
          </div>
          : ""}
      </div>
    ));
  
    const items = users.map((item) => (
      <div key={item._id} className="score-tile-item-2" onClick={() => this.setState({clickedUser: item._id})}>
        <p data={item._id}>ID: {item._id} | Name: {item.name}</p>
        {this.state.clickedUser === item._id ? 
          <div>
          <p>Scores: {getScores(item._id)}</p>
          </div>
          : ""}
      </div>
    ));
    
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
                  Name <input type="text" name="name" value={this.state.value} onChange={this.handleFormChange} />
                </label>
                <label>
                  Score <input type="number" name="score" value={this.state.value} onChange={this.handleFormChange} />
                </label>
                <input type="submit" value="Submit" id="input-btn" />
              </form>
            </div>
          </MTColumn>
        </MTRow>
        <MTRow>
          <MTColumn>
            <div className="scoreboard">
              {items}
              {items2}
            </div>
          </MTColumn>
        </MTRow>
      </div>
    )
  }
}
