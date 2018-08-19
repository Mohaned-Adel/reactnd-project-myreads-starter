import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route , withRouter} from 'react-router-dom';
import Book from '../components/Book'
import * as BookAPI from '../BooksAPI'

class SearchBar extends Component {

    state = {
        results: []
    }
    
    searchFor = (ev) => {
        const query = ev.target.value.trim();
        
        if(query) {

            BookAPI.search(query, 20).then((results) => {
                results = results.filter(book => book.imageLinks);
                this.setState({results})
                
            })
        }
        
    }

    handleMove = (ev, book) => {
        const shelf = ev.target.value;
        BookAPI.update(book, shelf).then(() => {
            
          this.props.history.push('/');
        })
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
                {results && results.length > 0 && results.map( (book, id) => (
                    <Book 
                        key={id}
                        thumbnail={book.imageLinks.thumbnail}
                        title={book.title}
                        authors={book.authors}
                        shelf="none"
                        moveTo={ev => this.handleMove(ev, book)}
                    />
                 ) )}
              </ol>
            </div>
          </div>
        );
    }
}

export default withRouter(SearchBar);