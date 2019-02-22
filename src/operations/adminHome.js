import React, { Component } from "react";
import LoginService from "../services/service";

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.serv = new LoginService();
    this.state = {
      persons: []
    };
  }
  componentDidMount() {
    this.serv
      .loadPersons()
      .then(data => data.json())
      .then(value => {
        console.log("here" + JSON.stringify(value.data));
        console.log(value);
        this.setState({ persons: value.data });
      })
      .catch(error => {
        console.log(`Error occured ${error.status}`);
      });
  }

  pendingUser() {
    let history = this.props.history;
    history.push("/pendinglist");
  }

  pendingPerson(){
    let history = this.props.history;
    history.push("/personpendinglist");
  }
  logoutUser() {
    sessionStorage.removeItem("UserId");
    localStorage.removeItem("token");
    let history = this.props.history;
    history.push("/");
  }
  render() {
    return (
      <div align="center">
        <br />
        <button className="btn btn-success" onClick={this.pendingUser.bind(this)}>
          Approve Pending Users
        </button>&nbsp;&nbsp;&nbsp;
        <button className="btn btn-primary" onClick={this.pendingPerson.bind(this)}>
          Approve Pending Person
        </button>
        &nbsp;&nbsp;&nbsp;
        <button className="btn btn-danger" onClick={this.logoutUser.bind(this)}>
          Logout
        </button>
        <br />
        <br />
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>PId</th>
              <th colSpan="3">Full Name</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>Age</th>
              <th colSpan="3">Address</th>
              <th>City</th>
              <th>State</th>
              <th>PIN Code</th>
              <th>Phone No</th>
              <th>Mobile No</th>
              <th>Physical Disability</th>
              <th>Marital Status</th>
              <th>Education Status</th>
              <th>Birth Sign</th>
            </tr>
          </thead>
          <tbody>
            {this.state.persons.map((prd, idx) => (
              <TableRow key={idx} row={prd} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

class TableRow extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <tr>
        <td>{this.props.row.PersonalUniqueId}</td>
        <td>{this.props.row.FirstName}</td>
        <td>{this.props.row.MiddleName}</td>
        <td>{this.props.row.LastName}</td>
        <td>{this.props.row.Gender}</td>
        <td>{this.props.row.DateOfBirth}</td>
        <td>{this.props.row.Age}</td>
        <td>{this.props.row.Flat}</td>
        <td>{this.props.row.SocietyName}</td>
        <td>{this.props.row.StreetName}</td>
        <td>{this.props.row.City}</td>
        <td>{this.props.row.State}</td>
        <td>{this.props.row.PinCode}</td>
        <td>{this.props.row.PhoneNo}</td>
        <td>{this.props.row.MobileNo}</td>
        <td>{this.props.row.PhysicalDisability}</td>
        <td>{this.props.row.MaritalStatus}</td>
        <td>{this.props.row.EducationStatus}</td>
        <td>{this.props.row.BirthSign}</td>
      </tr>
    );
  }
}

export default AdminHome;
