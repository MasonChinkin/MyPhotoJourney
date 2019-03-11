import React from 'react';
import { Link } from 'react-router-dom'

class NewJourneyForm extends React.Component {

  constructor(props){
    super(props)
    this.state = {name: "", description: ""}
  }

  handleChange(field){
    return e => {
      this.setState({[field]: e.target.value});
    };
  }


  render(){
    return(
      <div className="center flex column"> 
          <form>
            <label> Name
              <input type="text" value={this.state.name} onChange={this.handleChange("name")} />
            </label>
            <label> Description 
              <textarea value={this.state.description} onChange={this.handleChange("description")} />
            </label>
          </form>
          <Link to="pleasedontclickthisyet" className="button create">Upload Photos</Link>
      </div>
    )
  }
}

export default NewJourneyForm