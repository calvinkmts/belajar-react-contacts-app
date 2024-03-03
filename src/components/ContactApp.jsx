import React from "react";
import Navigation from "./Navigation.jsx";
import HomePage from "../pages/HomePage.jsx";
import AddPage from "../pages/AddPage.jsx";
import {Route, Routes} from "react-router-dom";
import RegisterPage from "../pages/RegisterPage.jsx";

class ContactApp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            authedUser: null,
        }
    }

    render() {

        if (this.state.authedUser === null) {
            return (
                <div className="contact-app">
                    <header className="contact-app__header">
                        <h1>Aplikasi Kontak</h1>
                    </header>
                    <main>
                        <Routes>
                            <Route path="/*" element={<p>Halaman Login</p>}/>
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
                    <Navigation/>
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