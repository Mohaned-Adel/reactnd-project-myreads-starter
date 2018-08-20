import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from '../components/Book'
import * as BookAPI from '../BooksAPI'

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            value: '',
            results: []
        }

        this.moveTo = this.moveTo.bind(this);
        this.getBookById = this.getBookById.bind(this)
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
    
      moveTo = (ev, book) => {
        const shelf = ev.target.value;
        BookAPI.update(book, shelf).then(() => {
          book.shelf = shelf
        })
      }
    
    handleChange = (event) => {
        this.setState({value: event.target.value.trim()})
    }
    
    handleSubmit(event, value, results) {
        console.log(value);
        if(value && value !== '') {
            console.log("results");
            BookAPI.search(value, 20).then((results) => {
                this.setState({results})
                console.log(results);                
            }).catch(() => {console.log('error')})
        } else {
            results = [];
            let booksContent = document.querySelector('.books-grid');
            booksContent.innerHTML = '';
        }
        // console.log(results);
        event.preventDefault();
    }

    // handleMove = (ev, book) => {
    //     const shelf = ev.target.value;
    //     BookAPI.update(book, shelf).then(() => {} )
    // }

    // handleShelf = (results, ShelfBooks) => {
    //     results.map(book => {
    //         if(book.id == ShelfBooks.filter(shelfBook => (shelfBook.id === book.id))) {
    //             return book.id
    //         } else {
    //             return 'none'
    //         }
    //     })
        
    // }

    componentDidMount() {
        BookAPI.getAll().then(ShelfBooks => {
            this.setState({
                books: ShelfBooks
            })
        })
    }

    render() {
        const { results, value } = this.state;
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/" />
              <div className="search-books-input-wrapper">
                <input 
                type="text" 
                placeholder="Search by title or author"
                value={value}
                onChange={this.handleChange}/>

                <input 
                type="submit"
                onClick={event => this.handleSubmit(event, value, results)} />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {results && results.length > 0 && results.map( (book) => (
                    <Book
                        book={book} 
                        key={book.id}
                        moveTo={ev => this.moveTo(ev, book)}
                        getBookById={this.getBookById}
                    />
                 ) )}
              </ol>
            </div>
          </div>
        );
    }
}

export default SearchBar;