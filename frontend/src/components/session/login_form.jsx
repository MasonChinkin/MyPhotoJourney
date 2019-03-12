
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
    this.demoSignin = this.demoSignin.bind(this);
    this.setIntervalX = this.setIntervalX.bind(this);
  }

  // Once the user has been authenticated, redirect to the Tweets page
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/profile');
    }

    // Set or clear errors
    this.setState({ errors: nextProps.errors })
  }

  // Handle field updates (called in the render method)
  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  demoSignin(e) {
    let email = "captain.marvel@gmail.com".split('');
    let password = "password".split('');
    let speed = 60;

    // stop demo from triggering sign in
    e.preventDefault();

    this.setIntervalX(() => this.fillField("email", email), speed, email.length)
      .then(() => (this.setIntervalX(() => this.fillField("password", password), speed, password.length)))
      .then(() => this.handleSubmit(e));
  }

  setIntervalX(callback, delay, repetitions) {
    return new Promise(resolve => {
      var x = 0;
      var intervalID = window.setInterval(function () {

        callback();

        if (++x === repetitions) {
          window.clearInterval(intervalID);
          resolve();
        }
      }, delay);
    });
  }

  fillField(field, value) {
    this.setState({ [field]: this.state[field] + value.shift() });
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
    return (
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
          <img src="./myphotojourney_logo_for_light_background.png" alt="MyPhotoJourney logo" height="150" width="525" />
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
          <input className="button submit" type="submit" onClick={this.demoSignin} value=" Demo Account" />
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);