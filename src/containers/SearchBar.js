import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from '../components/Book'
import * as BookAPI from '../BooksAPI'

class SearchBar extends Component {

    state = {
        results: []
    }
    
    searchFor = (event) => {
        const query = event.target.value.trim();
        
        if(query) {

            BookAPI.search(query, 20).then((results) => {
                this.setState({results})
            })
        }
        
    }

    render() {
        const { results } = this.state;
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/" />
              <div className="search-books-input-wrapper">
                <input 
                type="text" 
                placeholder="Search by title or author"
                onChange={this.searchFor}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {results.map( (book, id) => (
                    <Book 
                        key={id}
                        thumbnail={book.imageLinks.thumbnail}
                        title={book.title}
                        authors={book.authors}
                        shelf={book.shelf}
                        moveTo={() => {}}
                    />
                 ) )}
              </ol>
            </div>
          </div>
        );
    }
}

export default SearchBar