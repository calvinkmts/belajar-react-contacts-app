import React from "react";
import ContactList from "../components/ContactList.jsx";
import SearchBar from "../components/SearchBar.jsx";
import {useSearchParams} from "react-router-dom";
import PropTypes from "prop-types";
import {getContacts, deleteContact} from "../utils/api.js";
import {LocaleConsumer} from "../contexts/LocaleContext.jsx";


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
            contacts: [],
            keyword: props.defaultKeyword || "",
        }

        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
    }

    async componentDidMount() {
        const {data} = await getContacts();

        this.setState(() => {
            return {
                contacts: data,
            }
        });
    }

    async onDeleteHandler(id) {
        await deleteContact(id);

        const {data} = await getContacts();

        this.setState({
            contacts: data,
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
            <LocaleConsumer>
                {
                    ({locale}) => {
                        return (
                            <section>
                                <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler}/>
                                <h2>{locale === 'id' ? 'Daftar Kontak' : 'Contact List'}</h2>
                                <ContactList onDelete={this.onDeleteHandler} contacts={contacts}/>
                            </section>
                        )
                    }
                }
            </LocaleConsumer>
        )
    }
}

HomePage.propTypes = {
    defaultKeyword: PropTypes.string,
    keywordChange: PropTypes.func.isRequired,
};

export default HomePageWrapper;