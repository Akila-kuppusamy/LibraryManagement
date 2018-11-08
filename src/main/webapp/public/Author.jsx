class App extends React.Component {
  constructor(props) {
      super(props);
      this.deleteAuthor = this.deleteAuthor.bind(this);
      this.createAuthor = this.createAuthor.bind(this);
      this.state = {
          authors: [],
      };
   }
 
  componentDidMount() {
    this.loadAuthorsFromServer();
  }
  
  // Load authors from database
  loadAuthorsFromServer() {
      fetch('http://localhost:8080/api/authors') 
      .then((response) => response.json()) 
      .then((responseData) => { 
          this.setState({ 
              authors: responseData._embedded.authors, 
          }); 
      });     
  } 
  
  // Delete bok
  deleteAuthor(author) {
      fetch (author._links.self.href,
      { method: 'DELETE',})
      .then( 
          res => this.loadAuthorsFromServer()
      )
      .catch( err => cosole.error(err))                
  }  
  
  // Create new author
  createAuthor(author) {
      fetch('http://localhost:8080/api/authors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(author)
      })
      .then( 
          res => this.loadAuthorsFromServer()
      )
      .catch( err => cosole.error(err))
  }
  
  render() {
    return (
       <div>
          <AuthorForm createAuthor={this.createAuthor}/>
          <AuthorTable deleteAuthor={this.deleteAuthor} authors={this.state.authors}/> 
       </div>
    );
  }
}
    	
class AuthorTable extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
    var authors = this.props.authors.map(author =>
        <Author key={author._links.self.href} author={author} deleteAuthor={this.props.deleteAuthor}/>
    );

    return (
      <div>
      <table className="table table-striped">
        <thead>
          <tr>
             <th>AuthorName</th><th>Country</th><th>Publication</th><th> </th>
          </tr>
        </thead>
        <tbody>{authors}</tbody>
      </table>
      </div>);
  }
}
        
class Author extends React.Component {
    constructor(props) {
        super(props);
        this.deleteAuthor = this.deleteAuthor.bind(this);
    }

    deleteAuthor() {
        this.props.deleteAuthor(this.props.author);
    } 
 
    render() {
        return (
          <tr>
           
            <td>{this.props.author.authorname}</td>
            <td>{this.props.author.country}</td>
            <td>{this.props.author.publication}</td>
            <td>
                <button className="btn btn-danger" onClick={this.deleteAuthor}>Delete</button>
            </td>
          </tr>
        );
    } 
}

class AuthorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {authorname: '', country: '', publication: ''};
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
        console.log("Authorname: " + this.state.authorname);
        var newAuthor = {authorname: this.state.authorname, country: this.state.country, publication: this.state.publication};
        this.props.createAuthor(newAuthor);        
    }
    
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Create Authors</div>
                <div className="panel-body">
                <form className="form-inline">
                    <div className="col-md-2">
                        <input type="text" placeholder="Authorname" className="form-control"  name="authorname" onChange={this.handleChange}/>    
                    </div>
                    <div className="col-md-2">       
                        <input type="text" placeholder="country" className="form-control" name="country" onChange={this.handleChange}/>
                    </div>
                    <div className="col-md-2">
                        <input type="text" placeholder="publication" className="form-control" name="publication" onChange={this.handleChange}/>
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