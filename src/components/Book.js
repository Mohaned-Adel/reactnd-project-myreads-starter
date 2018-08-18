import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Book extends Component {
    render() {
        const {thumbnail, title, authors, id} = this.props;
        return (
            <li key={id}>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}>
                    </div>
                    <div className="book-shelf-changer">
                        <select>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">{authors.map(author => author)}</div>
                </div>
            </li>
        );
    }
}

Book.propTypes = {
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    authors: PropTypes.array
}

export default Book;