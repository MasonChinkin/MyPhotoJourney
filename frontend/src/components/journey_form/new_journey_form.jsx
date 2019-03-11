import React from 'react';


class NewJourneyForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {name: "", description: ""};
  }

  handleChange(field){
    return e => {
      this.setState({[field]: e.target.value});
    };
  }

  handleSubmit(e){
    e.preventDefault();
    //do upload things
  }


  render(){
    return(
      <div className="center flex column"> 
          <form id="new-journey-form" onSubmit={this.handleSubmit}>
              <h2>Name</h2>
              <input id="journey-name" type="text" value={this.state.name} onChange={this.handleChange("name")} />
              <h2>Description</h2>
              <textarea id="journey-description"value={this.state.description} onChange={this.handleChange("description")} />
            <input className="button create" type="submit" value="Upload Photos"/>
          </form>
      </div>
    )
  }
}

export default NewJourneyForm