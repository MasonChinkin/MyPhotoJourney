
import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  // Once the user has been authenticated, redirect to the Tweets page
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/profile');
    }

    // Set or clear errors
    this.setState({errors: nextProps.errors})
  }

  // Handle field updates (called in the render method)
  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(user); 
  }

  // Render the session errors if there are any
  renderErrors() {
    return(
      <div className={`login-error error-container ${this.state.errors ? "grow" : ""}`}>
          <ul>
          {Object.keys(this.state.errors).map((error, i) => (
            <li key={`error-${i}`}>
              {this.state.errors[error]}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div id="form-top"> 
          <img src="./myphotojourney_logo_for_light_background.png" alt="MyPhotoJourney logo" height="150"/>
        </div>
        <form className="session-form" onSubmit={this.handleSubmit}>
            <div id='login-form-inputs'>
              <input type="text"
                required={true}
                autoComplete="off"
                value={this.state.email}
                onChange={this.update('email')}
                placeholder="Email"
              />
              <input type="password"
                required={true}
                autoComplete="off"
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="Password"
              />
            </div>
            {this.renderErrors()}
            <input className="button submit" type="submit" value="Log In" />
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);