import React from "react";
import PropTypes from "prop-types";
import {LocaleConsumer} from "../contexts/LocaleContext.jsx";

function SearchBar({ keyword, keywordChange }) {
    return (
        <LocaleConsumer>
            {
                ({locale}) => {
                    return (
                        <input
                            className="search-bar"
                            type="text"
                            placeholder={locale === 'id' ? 'Cari kontak' : 'Search by name'}
                            value={keyword}
                            onChange={(e) => keywordChange(e.target.value)}/>
                    )
                }
            }
        </LocaleConsumer>
    );
}

SearchBar.propType = {
    keyword: PropTypes.string.isRequired,
    keywordChange: PropTypes.func.isRequired,
}

export default SearchBar;