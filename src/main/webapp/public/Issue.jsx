class App extends React.Component {
  constructor(props) {
      super(props);
      this.deleteIssue = this.deleteIssue.bind(this);
      this.createIssue = this.createIssue.bind(this);
      this.state = {
          issues: [],
      };
   }
 
  componentDidMount() {
    this.loadIssuesFromServer();
  }
  
  // Load issues from database
  loadIssuesFromServer() {
      fetch('http://localhost:8080/api/issues') 
      .then((response) => response.json()) 
      .then((responseData) => { 
          this.setState({ 
              issues: responseData._embedded.issues, 
          }); 
      });     
  } 
  
  // Delete bok
  deleteIssue(issue) {
      fetch (issue._links.self.href,
      { method: 'DELETE',})
      .then( 
          res => this.loadIssuesFromServer()
      )
      .catch( err => cosole.error(err))                
  }  
  
  // Create new issue
  createIssue(issue) {
      fetch('http://localhost:8080/api/issues', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(issue)
      })
      .then( 
          res => this.loadIssuesFromServer()
      )
      .catch( err => cosole.error(err))
  }
  
  render() {
    return (
       <div>
          <IssueForm createIssue={this.createIssue}/>
          <IssueTable deleteIssue={this.deleteIssue} issues={this.state.issues}/> 
       </div>
    );
  }
}
    	
class IssueTable extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
    var issues = this.props.issues.map(issue =>
        <Issue key={issue._links.self.href} issue={issue} deleteIssue={this.props.deleteIssue}/>
    );

    return (
      <div>
      <table className="table table-striped">
        <thead>
          <tr>
             <th>bookname</th><th>customer</th><th>dttim</th><th> </th>
          </tr>
        </thead>
        <tbody>{issues}</tbody>
      </table>
      </div>);
  }
}
        
class Issue extends React.Component {
    constructor(props) {
        super(props);
        this.deleteIssue = this.deleteIssue.bind(this);
    }

    deleteIssue() {
        this.props.deleteIssue(this.props.issue);
    } 
 
    render() {
        return (
          <tr>
           
            <td>{this.props.issue.bookname}</td>
            <td>{this.props.issue.customer}</td>
            <td>{this.props.issue.dttim}</td>
            <td>
                <button className="btn btn-danger" onClick={this.deleteIssue}>Delete</button>
            </td>
          </tr>
        );
    } 
}

class IssueForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {bookname: '', customer: '', dttim: ''};
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
        console.log("Issuename: " + this.state.issueName);
        var newIssue = {bookname: this.state.bookname, customer: this.state.customer, dttim: this.state.dttim};
        this.props.createIssue(newIssue);        
    }
    
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Book Issue</div>
                <div className="panel-body">
                <form className="form-inline">
                    <div className="col-md-2">
                        <input type="text" placeholder="Book Name" className="form-control"  name="bookname" onChange={this.handleChange}/>    
                    </div>
                    <div className="col-md-2">       
                        <input type="text" placeholder="Customer Name" className="form-control" name="customer" onChange={this.handleChange}/>
                    </div>
                    <div className="col-md-2">
                        <input type="text" placeholder="Date/Time of Issue" className="form-control" name="dttim" onChange={this.handleChange}/>
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