import React, { Component } from "react";
import LoginService from "../services/service";

class PersonPendingList extends Component {
  constructor(props) {
    super(props);
    this.serv = new LoginService();
    this.state = {
      PersonalUniqueId: "",
      FirstName: "",
      MiddleName: "",
      LastName: "",
      Gender: "",
      DateOfBirth: "",
      Age: "",
      Flat: "",
      SocietyName: "",
      StreetName: "",
      City: "",
      State: "",
      PinCode: "",
      PhoneNo: "",
      MobileNo: "",
      PhysicalDisability: "",
      MaritalStatus: "",
      EducationStatus: "",
      BirthSign: "",
      person: []
    };
  }

  /* Approve button clicked */
  onApproveClicked(e){
    let newPerson={
      PersonalUniqueId:e.PersonalUniqueId, FirstName:e.FirstName, MiddleName:e.MiddleName,
      LastName:e.LastName, Gender:e.Gender, DateOfBirth:e.DateOfBirth, Age:e.Age, Flat:e.Flat,
      SocietyName:e.SocietyName, StreetName:e.StreetName, City:e.City, State:e.State, PinCode:e.PinCode,
      PhoneNo:e.PhoneNo, MobileNo:e.MobileNo, PhysicalDisability:e.PhysicalDisability, MaritalStatus:e.MaritalStatus,
      EducationStatus:e.EducationStatus,BirthSign:e.BirthSign
    }
    
    let Per={
      PersonalUniqueId:e.PersonalUniqueId
    }
    console.log(Per.PersonalUniqueId);
    
    // #region If exists in person collection than delete
    this.serv.deletePerson(Per)
    .then(res => res.json())
    .then(resp => {console.log(JSON.stringify(resp));
    });
    // #region
    
    
    
    /* Create in `person` collection */
    this.serv.createPerson(newPerson)
    .then(res=>res.json())
    .then(resp=> { console.log(JSON.stringify(resp)); })
    window.location.reload();
    
    /* Delete from tempUsers collection */
    
    this.serv.deleteTempPerson(newPerson)
    .then(res=>res.json())
    .then(resp=>{console.log(JSON.stringify(resp))});
    window.location.reload();
    
    // history.push("/pendinglist");
    }

  /* Delete User from tempUsers collection (Explicitly) */
  onRejectClicked(e){
        
    let newPerson={
      PersonalUniqueId:e.PersonalUniqueId, FirstName:e.FirstName, MiddleName:e.MiddleName,
      LastName:e.LastName, Gender:e.Gender, DateOfBirth:e.DateOfBirth, Age:e.Age, Flat:e.Flat,
      SocietyName:e.SocietyName, StreetName:e.StreetName, City:e.City, State:e.State, PinCode:e.PinCode,
      PhoneNo:e.PhoneNo, MobileNo:e.MobileNo, PhysicalDisability:e.PhysicalDisability, MaritalStatus:e.MaritalStatus,
      EducationStatus:e.EducationStatus,BirthSign:e.BirthSign
    }
      
      this.serv.deleteTempPerson(newPerson)
      .then(res=>res.json())
      .then(resp=>{console.log(JSON.stringify(resp))});
      window.location.reload();
  }
  
  componentDidMount() {
    this.serv
      .loadTempPerson()
      .then(data => data.json())
      .then(value => {
        console.log("here" + JSON.stringify(value.data));
        console.log(value);
        this.setState({ person: value.data });
      })
      .catch(error => {
        console.log(`Error occured ${error.status}`);
      });
  }

  adminHome() {
    let history = this.props.history;
    history.push("/adminhome");
  }

  render() {
    return (
      <div align="center">
        <br />
        <button className="btn btn-success" onClick={this.adminHome.bind(this)}>
          Back
        </button>
        <br />
        <br />
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>PID</th> <th>First Name</th> <th>Middle Name</th> <th>Last Name</th> <th>Gender</th>
              <th>Date of Birth</th> <th>Age</th> <th>Flat</th> <th>Society Name</th> <th>Street Name</th>
              <th>City</th><th>State</th><th>Pin Code</th> <th>Phone No.</th> <th>Mobile No.</th>
              <th>Physical Disability</th><th>Marital Status</th><th>Education Status</th><th>Birth Sign</th>
              <th colSpan="2" align="center">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.person.map((prd, idx) => (
              <TableRow key={idx} row={prd}
              selected={this.onApproveClicked.bind(this)}
              deleted={this.onRejectClicked.bind(this)}
               />
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

  onPersonClicked(){
    this.props.selected(this.props.row);
  }

  onRowDeleted(){
    this.props.deleted(this.props.row);
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
        <td>
          <button
            className="btn btn-primary"
            onClick={this.onPersonClicked.bind(this)}
          >
            Approve
          </button>
        </td>
          <td><button className="btn btn-danger" onClick={this.onRowDeleted.bind(this)}
 >Reject</button></td>
      </tr>
    );
  }
}

// {console.log("LL")}
//         {this.setState({RoleId:this.props.row.RoleId})}
//         {console.log(this.props.row.RoleId)}

export default PersonPendingList;      