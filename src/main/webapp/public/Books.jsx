class App extends React.Component {
  constructor(props) {
      super(props);
      this.deleteBook = this.deleteBook.bind(this);
      this.createBook = this.createBook.bind(this);
      this.state = {
          books: [],
      };
   }
 
  componentDidMount() {
    this.loadBooksFromServer();
  }
  
  // Load books from database
  loadBooksFromServer() {
      fetch('http://localhost:8080/api/books') 
      .then((response) => response.json()) 
      .then((responseData) => { 
          this.setState({ 
              books: responseData._embedded.books, 
          }); 
      });     
  } 
  
  // Delete bok
  deleteBook(book) {
      fetch (book._links.self.href,
      { method: 'DELETE',})
      .then( 
          res => this.loadBooksFromServer()
      )
      .catch( err => cosole.error(err))                
  }  
  
  // Create new book
  createBook(book) {
      fetch('http://localhost:8080/api/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(book)
      })
      .then( 
          res => this.loadBooksFromServer()
      )
      .catch( err => cosole.error(err))
  }
  
  render() {
    return (
       <div>
          <BookForm createBook={this.createBook}/>
          <BookTable deleteBook={this.deleteBook} books={this.state.books}/> 
       </div>
    );
  }
}
    	
class BookTable extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
    var books = this.props.books.map(book =>
        <Book key={book._links.self.href} book={book} deleteBook={this.props.deleteBook}/>
    );

    return (
      <div>
      <table className="table table-striped">
        <thead>
          <tr>
             <th>BookName</th><th>Author</th><th>ISBN</th><th> </th>
          </tr>
        </thead>
        <tbody>{books}</tbody>
      </table>
      </div>);
  }
}
        
class Book extends React.Component {
    constructor(props) {
        super(props);
        this.deleteBook = this.deleteBook.bind(this);
    }

    deleteBook() {
        this.props.deleteBook(this.props.book);
    } 
 
    render() {
        return (
          <tr>
           
            <td>{this.props.book.bookName}</td>
            <td>{this.props.book.author}</td>
            <td>{this.props.book.isbn}</td>
            <td>
                <button className="btn btn-danger" onClick={this.deleteBook}>Delete</button>
            </td>
          </tr>
        );
    } 
}

class BookForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {bookName: '', author: '', isbn: ''};
        this.handleSubmit = this.handleSubmit.bind(this);   
        this.handleChange = this.handleChange.bind(this);     
    }

    handleChange(event) {
        console.log("NAME: " + event.target.name + " VALUE: " + event.target.value)
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }    
    
    handleSubmit(event) {
        event.preventDefault();
        console.log("Bookname: " + this.state.bookName);
        var newBook = {bookName: this.state.bookName, author: this.state.author, isbn: this.state.isbn};
        this.props.createBook(newBook);        
    }
    
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Create Books</div>
                <div className="panel-body">
                <form className="form-inline">
                    <div className="col-md-2">
                        <input type="text" placeholder="Bookname" className="form-control"  name="bookName" onChange={this.handleChange}/>    
                    </div>
                    <div className="col-md-2">       
                        <input type="text" placeholder="Author" className="form-control" name="author" onChange={this.handleChange}/>
                    </div>
                    <div className="col-md-2">
                        <input type="text" placeholder="ISBN" className="form-control" name="isbn" onChange={this.handleChange}/>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-success" onClick={this.handleSubmit}>Save</button>   
                    </div>        
                </form>
                </div>      
            </div>
         
        );
    }
    
    
    
}

ReactDOM.render(<App />, document.getElementById('root') );