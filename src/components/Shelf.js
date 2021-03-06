import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BookAPI from '../BooksAPI'
import Book from './Book';

class Shelf extends Component {
  moveTo = (ev, book) => {
    const shelf = ev.target.value;
    BookAPI.update(book, shelf).then(data => {
      this.props.onMove();
    })
  }
  render() {
    const { title, books, getBookById} = this.props;
    return (
      <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <Book
                book = {book ? book : null}
                key={book.id}
                getBookById={getBookById}
                moveTo={ev => this.moveTo(ev, book)}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

Shelf.propTypes = {
  title: PropTypes.string,
  books: PropTypes.array,
  onMove: PropTypes.func
}

export default Shelf