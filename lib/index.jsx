import React from 'react'
import ExcelDropzone from './excel-dropzone.jsx'
import { MTRow, MTColumn } from 'mt-ui'

// Local dataset imports
import users from "../lib/user"
import scores from "../lib/scores"

export default class Main extends React.Component {
  constructor(props){
    super(props);
  }


  handleSheetData (data) {
    // replace this log with actual handling of the data
    console.log(data)
  }

  getInitialDataset(data){
    console.log(users);
    console.log(scores);
  }

  render () {
    function ScoreTile(props){
      const items = users.map((item) => (
        <div key={item._id} className="score-tile">
          <p>ID: {item._id} | Name: {item.name}</p>
          <p>Scores: {getScores(item._id)}</p>
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
              <h2>Initial site</h2>
              <p>
                Drop the excel file "scores.xlsx" that you will find in this repo in the area to the left and watch the log output in the console.
                We hope this is enough to get you started with the import.
              </p>
            </div>
            <div>
              <h2>Explaining the grid</h2>
              <p>
                In the Mediatool grid you can use MTRow and MTColumn to structure your graphical components.
                This is basically what you need to know:
              </p>
              <ul>
                <li>Each row will be located beneath the previous one</li>
                <li>Columns in one row will stretch to the width of the entire parent component and they will have the same size unless you provide them with a with property</li>
                <li>If you set the width you do so in percent</li>
                <li>You can also use offset to create space betweeen your columns</li>
                <li>The total width and offset of the columns in a row should equal 100</li>
                <li>It is also possible to nest rows and columns within each other</li>
              </ul>
            </div>
          </MTColumn>
        </MTRow>
        <MTRow>
          <MTColumn>
            <div className="scoreboard">
              <ScoreTile dataset={this.getInitialDataset()}/> 
            </div>
          </MTColumn>
        </MTRow>
      </div>
    )
  }
}
