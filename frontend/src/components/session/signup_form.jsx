
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
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <>
        <div id="form-top"> 
          <img src="./myphotojourney_logo_light_background.png" alt="MyPhotoJourney logo" height="100"/>
        </div>
        <form className="session-form" onSubmit={this.handleSubmit}>
              <div>
                <input type="text"
                  className="input-halfline"
                  value={this.state.first_name}
                  onChange={this.update('first_name')}
                  placeholder="First Name"
                />
                <input type="text"
                  className="input-halfline"
                  value={this.state.last_name}
                  onChange={this.update('last_name')}
                  placeholder="Last Name"
                />
              </div>
              <input  type="text"
                value={this.state.email}
                onChange={this.update('email')}
                placeholder="Email"
              />
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="Password"
              />
              <input type="password"
                value={this.state.password2}
                onChange={this.update('password2')}
                placeholder="Confirm Password"
              />
            <input class="button" type="submit" value="Create an Account" />
            {this.renderErrors()}
        </form>
      </>
    );
  }
}

export default withRouter(SignupForm);