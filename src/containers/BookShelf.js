import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Shelf from '../components/Shelf'
import * as BookAPI from '../BooksAPI'

class BookShelf extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            currentlyReading: [],
            wantToRead: [],
            Read: []
        }

        this.getBookById = this.getBookById.bind(this)
    }

    componentDidMount() {
        this.fetchBooks();
    }

    fetchBooks = () => {
        BookAPI.getAll().then(books => {
            this.setState({
                books: books,
                currentlyReading: books.filter(books => books.shelf === 'currentlyReading'),
                wantToRead: books.filter(books => books.shelf === 'wantToRead'),
                Read: books.filter(books => books.shelf === 'read')
            })
        })
    }

    getBookById(id) {
        let books
      
          if(this.state.books) {
            books = this.state.books.filter((book) => book.id === id)
            if (books.length > 0) {
              return books[0]
            } else {
              return null
            }
          }
    }

    render() {
        const {currentlyReading, wantToRead, Read} = this.state;
        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              
                <Shelf 
                title="Currently Reading"
                books = {currentlyReading}
                getBookById = {this.getBookById}
                onMove = {this.fetchBooks}
                />
                <Shelf
                title="Want to Read"
                books= {wantToRead}
                getBookById = {this.getBookById}
                onMove = {this.fetchBooks}
                />
                <Shelf
                title="Read"
                books={Read}
                getBookById = {this.getBookById}
                onMove = {this.fetchBooks}
                />
               
                
            </div>
            <div className="open-search">
              <Link to='/search' />
            </div>
          </div>
        );
    }
}

export default BookShelf