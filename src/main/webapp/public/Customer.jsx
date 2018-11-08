class App extends React.Component {
  constructor(props) {
      super(props);
      this.deleteCustomer = this.deleteCustomer.bind(this);
      this.createCustomer = this.createCustomer.bind(this);
      this.state = {
          customers: [],
      };
   }
 
  componentDidMount() {
    this.loadCustomersFromServer();
  }
  
  // Load customers from database
  loadCustomersFromServer() {
      fetch('http://localhost:8080/api/customers') 
      .then((response) => response.json()) 
      .then((responseData) => { 
          this.setState({ 
              customers: responseData._embedded.customers, 
          }); 
      });     
  } 
  
  // Delete customer
  deleteCustomer(customer) {
      fetch (customer._links.self.href,
      { method: 'DELETE',})
      .then( 
          res => this.loadCustomersFromServer()
      )
      .catch( err => cosole.error(err))                
  }  
  
  // Create new customer
  createCustomer(customer) {
      fetch('http://localhost:8080/api/customers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(customer)
      })
      .then( 
          res => this.loadCustomersFromServer()
      )
      .catch( err => cosole.error(err))
  }
  
  render() {
    return (
       <div>
          <CustomerForm createCustomer={this.createCustomer}/>
          <CustomerTable deleteCustomer={this.deleteCustomer} customers={this.state.customers}/> 
       </div>
    );
  }
}
    	
class CustomerTable extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
    var customers = this.props.customers.map(customer =>
        <Customer key={customer._links.self.href} customer={customer} deleteCustomer={this.props.deleteCustomer}/>
    );

    return (
      <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Firstname</th><th>Lastname</th><th>Email</th><th> </th>
          </tr>
        </thead>
        <tbody>{customers}</tbody>
      </table>
      </div>);
  }
}
        
class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.deleteCustomer = this.deleteCustomer.bind(this);
    }

    deleteCustomer() {
        this.props.deleteCustomer(this.props.customer);
    } 
 
    render() {
        return (
          <tr>
            <td>{this.props.customer.firstname}</td>
            <td>{this.props.customer.lastname}</td>
            <td>{this.props.customer.email}</td>
            <td>
                <button className="btn btn-danger" onClick={this.deleteCustomer}>Delete</button>
            </td>
          </tr>
        );
    } 
}

class CustomerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {firstname: '', lastname: '', email: ''};
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
        console.log("Firstname: " + this.state.firstname);
        var newCustomer = {firstname: this.state.firstname, lastname: this.state.lastname, email: this.state.email};
        this.props.createCustomer(newCustomer);        
    }
    
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Create Customer</div>
                <div className="panel-body">
                <form className="form-inline">
                    <div className="col-md-2">
                        <input type="text" placeholder="Customer Firstname" className="form-control"  name="firstname" onChange={this.handleChange}/>    
                    </div>
                    <div className="col-md-2">       
                        <input type="text" placeholder="Customer LastName" className="form-control" name="lastname" onChange={this.handleChange}/>
                    </div>
                    <div className="col-md-2">
                        <input type="text" placeholder="Customer Email" className="form-control" name="email" onChange={this.handleChange}/>
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
ReactDOM.renderBooks(<App />, document.getElementById('root') );