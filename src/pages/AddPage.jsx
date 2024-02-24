import React from "react";
import ContactInput from "../components/ContactInput.jsx";
import {addContact} from "../utils/data.js";
import {useNavigate} from "react-router-dom";

function AddPage() {

    const navigate = useNavigate();

    function onAddContactHandler(contact) {
        addContact(contact);
        navigate("/");
    }

    return (
        <section>
            <h2>Tambah Kontak</h2>
            <ContactInput addContact={onAddContactHandler} />
        </section>
    )
}

export default AddPage;