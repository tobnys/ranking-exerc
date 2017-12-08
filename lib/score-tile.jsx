import React, {Component} from "react";

export default class ScoreTile extends Component {

    render(){
        return (
        <div className="score-tile">
            <p>ID: {this.props.id} | Username: {this.props.name} | Score: {this.props.score} | ds: {this.props.dataset}</p>
        </div>
        )
    }
}