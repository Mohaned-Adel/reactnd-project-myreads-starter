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
    
    handleSubmit(event, results) {
        this.setState({
            value: event.target.value,
            results: []
        })

        console.log(event.target.value.length);

        if(this.state.value.length !== 0) {
            
            BookAPI.search(event.target.value, 50).then((results) => {
                this.setState({results})
                console.log(results);                
            }).catch((error) => {console.log(error)} )

        } else {
            this.setState({
                results: []
            })
        }
    }



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
                onChange={ event => 
                    this.handleSubmit(event, results)
                }/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {results && results.length>0 && value.length > 0 && results.map( (book) => (
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