import React from "react";
import Navigation from "./Navigation.jsx";
import HomePage from "../pages/HomePage.jsx";
import AddPage from "../pages/AddPage.jsx";
import {Route, Routes} from "react-router-dom";
import RegisterPage from "../pages/RegisterPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import {getUserLogged, putAccessToken} from "../utils/api.js";

class ContactApp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            authedUser: null,
            initializing: true,
        }

        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    async componentDidMount() {
        const {data} = await getUserLogged();

        this.setState(() => {
            return {
                authedUser: data,
                initializing: false,
            }
        });
    }

    async onLoginSuccess({accessToken}) {
        putAccessToken(accessToken);
        const {data} = await getUserLogged();

        this.setState(() => {
            return {
                authedUser: data,
            }
        });
    }

    onLogout() {
        this.setState(() => {
            return {
                authedUser: null,
            }
        });

        putAccessToken('');
    }

    render() {

        if (this.state.initializing) {
            return null;
        }

        if (this.state.authedUser === null) {
            return (
                <div className="contact-app">
                    <header className="contact-app__header">
                        <h1>Aplikasi Kontak</h1>
                    </header>
                    <main>
                        <Routes>
                            <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess}/>}/>
                            <Route path="/register" element={<RegisterPage/>}/>
                        </Routes>
                    </main>
                </div>
            );
        }

        return (
            <div className="contact-app">
                <header className="contact-app__header">
                    <h1>Aplikasi Kontak</h1>
                    <Navigation logout={this.onLogout} name={this.state.authedUser.name}/>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/add" element={<AddPage/>}/>
                    </Routes>
                </main>
            </div>
        );
    }
}

export default ContactApp;