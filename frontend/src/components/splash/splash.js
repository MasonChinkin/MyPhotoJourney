import React from 'react';
import LoginFormContainer from '../session/login_form_container';
import SignupFormContainer from '../session/signup_form_container';
import '../../styles/splash.css';

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
            <>
                <div id='splash-nav'>
                    <button className="button" onClick={this.toggleForm}>{this.state.form === "signup" ? "Sign In" : "Sign Up"}</button>
                </div>
                <main>
                    <div id='form-container'>
                        {this.loginOrSignup()}
                    </div>
                </main>
            </>
        )
    }
}

export default SplashPage;