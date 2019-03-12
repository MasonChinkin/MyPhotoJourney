
import React from 'react';
import { withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push('/profile');
    }

    this.setState({errors: nextProps.errors})
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user, this.props.history); 
  }

  renderErrors() {
    return(
      <div className={`error-container ${this.state.errors ? "grow" : ""}`}>
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
      <>
        <div id="form-top"> 
          <img src="./myphotojourney_logo_for_light_background.png" alt="MyPhotoJourney logo" height="140" width="525"/>
        </div>
        <form className="session-form" onSubmit={this.handleSubmit}>
            <div id="form-inputs">
              <div>
                <input type="text"
                  className="input-halfline"
                  required={true}
                  value={this.state.first_name}
                  onChange={this.update('first_name')}
                  placeholder="First Name"
                />
                <input type="text"
                  className="input-halfline"
                  required={true}
                  value={this.state.last_name}
                  onChange={this.update('last_name')}
                  placeholder="Last Name"
                />
              </div>
              <input  type="text"
                value={this.state.email}
                required={true}
                onChange={this.update('email')}
                placeholder="Email"
              />
              <input type="password"
                value={this.state.password}
                required={true}
                onChange={this.update('password')}
                placeholder="Password"
              />
              <input type="password"
                value={this.state.password2}
                required={true}
                onChange={this.update('password2')}
                placeholder="Confirm Password"
              />
            </div>
            {this.renderErrors()}
            <input className="button submit" type="submit" value="Create an Account" />
        </form>
      </>
    );
  }
}

export default withRouter(SignupForm);