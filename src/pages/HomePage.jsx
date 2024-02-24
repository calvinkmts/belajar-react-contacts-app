import React from "react";
import ContactList from "../components/ContactList.jsx";
import {deleteContact, getContacts} from "../utils/data.js";
import SearchBar from "../components/SearchBar.jsx";
import {useSearchParams} from "react-router-dom";


function HomePageWrapper() {

    const [searchParams, setSearchParams] = useSearchParams();

    const keyword = searchParams.get("keyword");

    function changeSearchParams(keyword) {
        setSearchParams({keyword});
    }

    return (
        <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams}/>
    );
}

class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            contacts: getContacts(),
            keyword: props.defaultKeyword || "",
        }

        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
    }

    onDeleteHandler(id) {
        deleteContact(id);

        this.setState({
            contacts: getContacts()
        });
    }

    onKeywordChangeHandler(keyword) {
        this.setState(() => {
            return {
                keyword,
            }
        });

        this.props.keywordChange(keyword);
    }

    render() {

        const contacts = this.state.contacts.filter((contact) => {
            return contact.name.toLowerCase().includes(this.state.keyword.toLowerCase());
        });

        return (
            <section>
                <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
                <h2>Daftar Kontak</h2>
                <ContactList onDelete={this.onDeleteHandler} contacts={contacts} />
            </section>
        );
    }
}

export default HomePageWrapper;