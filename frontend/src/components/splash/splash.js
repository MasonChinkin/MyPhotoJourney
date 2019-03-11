import React from 'react';
import LoginFormContainer from '../session/login_form_container';
import SignupFormContainer from '../session/signup_form_container';

class SplashPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {form: "signup"};
        this.loginOrSignup = this.loginOrSignup.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
    }

    loginOrSignup(){
        if(this.state.form === "signup"){
            return(
                <SignupFormContainer />
            );
        } else {
            return(
                <LoginFormContainer />
            );
        }
    }

    toggleForm(){
        if(this.state.form === "signup"){
            this.setState({form: "login"});
        } else {
            this.setState({form: "signup"});
        }
    }

    render() {
        return (
            <main id="main-splash">
                <div id='splash-nav'>
                    <img src="./myphotojourney_logo_for_dark_background.png" alt="MyPhotoJourney logo" height="100"/>
                    <button className="button" onClick={this.toggleForm}>{this.state.form === "signup" ? "Sign In" : "Sign Up"}</button>
                </div>
                <div id='form-container'>
                    {this.loginOrSignup()}
                </div>
            </main>
        )
    }
}

export default SplashPage;