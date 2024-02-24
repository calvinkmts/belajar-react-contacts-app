import React from "react";
import Navigation from "./Navigation.jsx";
import HomePage from "../pages/HomePage.jsx";
import AddPage from "../pages/AddPage.jsx";
import {Route, Routes} from "react-router-dom";

function ContactApp() {

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

export default ContactApp;