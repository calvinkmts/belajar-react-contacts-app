import React from "react";
import ContactList from "../components/ContactList.jsx";
import {deleteContact, getContacts} from "../utils/data.js";

class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            contacts: getContacts()
        }

        this.onDeleteHandler = this.onDeleteHandler.bind(this);
    }

    onDeleteHandler(id) {
        deleteContact(id);

        this.setState({
            contacts: getContacts()
        });
    }
    render() {
        return (
            <section>
                <h2>Daftar Kontak</h2>
                <ContactList onDelete={this.onDeleteHandler} contacts={this.state.contacts} />
            </section>
        );
    }
}

export default HomePage;