import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Book extends Component {
    state = {
        bookShelf: '',
    }

    componentDidMount() {
        const { book, getBookById } = this.props
        let bookOnShelf = getBookById(book.id);
        let shelf;
        if(bookOnShelf !== null) {
            shelf = bookOnShelf.shelf
        } else {
            shelf = 'none'
        }
        this.setState({bookShelf: shelf})
    }

    render() {
        const {book, moveTo} = this.props;
        return (
            <li key={book.id}>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : 'unknown image'})` }}>
                    </div>
                    <div className="book-shelf-changer">
                        <select value={this.state.bookShelf} onChange={moveTo}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors ? book.authors.join(', ') : 'unknown author'}</div>
                </div>
            </li>
        );
    }
}

Book.propTypes = {
    book: PropTypes.object,
    getBookById: PropTypes.func,
    moveTo: PropTypes.func
}

export default Book;