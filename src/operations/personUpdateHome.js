import React, { Component } from "react";
import LoginService from "../services/service";

class PersonUpdateHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: []
    };
    this.serv = new LoginService();
  }

  //#region Find in person collection for specific personid linked with userid
  componentDidMount() {
    let personData = {
      PersonalUniqueId: sessionStorage.getItem("UserId") //this.state.PersonalUniqueID
    };
    console.log("HALA"+personData.PersonalUniqueId);
    this.serv
      .findSpecificPerson(personData)
      .then(data => data.json())
      .then(value => { 
        console.log("here" + JSON.stringify(value.data));
        // console.log(value);
        this.setState({ persons: value.data });
        // console.log(this.state.persons.Age);
      })
      .catch(error => {
        console.log(`Error occured ${error.status}`);
      });
  }
  //#region

  /* Logic Less */

  onChangeUser(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  /* ***** */

  onRegisterClicked(e) {


    let personData = {
      PersonalUniqueId: sessionStorage.getItem("UserId") //this.state.PersonalUniqueID
    };
    console.log(personData.PersonalUniqueId);
    this.serv
      .findSpecificTempPerson(personData)
      .then(data => data.json())
      .then(value => {
        // console.log(JSON.stringify(value.data));
        if(value.data===null){
          
          //#region If there is no duplicate entry then the request will be forwarded for approval
          let person = {
            PersonalUniqueId: sessionStorage.getItem("UserId"),
            FirstName: document.getElementById("FirstName").value,
            MiddleName: document.getElementById("MiddleName").value,
            LastName: document.getElementById("LastName").value,
            Gender: document.getElementById("Gender").value,
            DateOfBirth: document.getElementById("DateofBirth").value,
            Age: document.getElementById("Age").value,
            Flat: document.getElementById("Flat").value,
            SocietyName: document.getElementById("SocietyName").value,
            StreetName: document.getElementById("StreetName").value,
            City: document.getElementById("City").value,
            State: document.getElementById("State").value,
            PinCode: document.getElementById("PinCode").value,
            PhoneNo: document.getElementById("PhoneNo").value,
            MobileNo: document.getElementById("MobileNo").value,
            PhysicalDisability: document.getElementById("PhysicalDisability").value,
            MaritalStatus: document.getElementById("MaritalStatus").value,
            EducationStatus: document.getElementById("EducationStatus").value,
            BirthSign: document.getElementById("BirthSign").value
          };
          this.serv.createTempPerson(person).then(res =>
            res
              .json()
              .then(resp => {
                // console.log(JSON.stringify(resp));
                alert(JSON.stringify(resp));
                this.onLogoutClicked();
                window.location.reload();
              })
              .catch(error => console.log(error.status))
          );
          //#region


        }
        else{
          alert("Failed! You have a previous pending request for update to be approved from Administrator");
        }
      })
      .catch(error => {
        console.log(`Error occured ${error}`);
      });
    
  }


  onLogoutClicked() {
    let history = this.props.history;
    history.push("/");
    sessionStorage.removeItem("UserId");
    sessionStorage.removeItem("UserName");
    localStorage.removeItem("token");
  }

  render() {
    return (
      <div className="container">
        <div align="center">
          <h1>Update Registration Form</h1>
        </div>
        <div className="form-group">
          <label>PersonUniqueId</label>
          <input
            type="text"
            name="PersonalUniqueId"
            className="form-control"
            value={this.state.persons.PersonalUniqueId}
            onSubmit={this.onChangeUser.bind(this)}
          />
        </div>
        <div className="form-group">
          First Name
          <input
            type="text"
            id="FirstName"
            defaultValue={this.state.persons.FirstName}
            className="form-control"
            onSubmit={this.onChangeUser.bind(this)}
          />
          <br />
          Middle Name
          <input
            type="text"
            id="MiddleName"
            defaultValue={this.state.persons.MiddleName}
            className="form-control"
            onChange={this.onChangeUser.bind(this)}
          />
          <br />
          Last Name
          <input
            type="text"
            id="LastName"
            className="form-control"
            defaultValue={this.state.persons.LastName}
            onChange={this.onChangeUser.bind(this)}
          />
          <br />
        </div>
        <div className="form-group">
          <label>Gender ({this.state.persons.Gender})</label>
          <br />
          <select
            id="Gender"
            onChange={this.onChangeUser.bind(this)}
            defaultValue={this.state.persons.Gender}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>Date of Birth&nbsp;&nbsp;</label>
          <input
            type="date"
            id="DateofBirth"
            defaultValue={this.state.persons.DateOfBirth}
            onChange={this.onChangeUser.bind(this)}
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="text"
            id="Age"
            className="form-control"
            defaultValue={this.state.persons.Age}
            onChange={this.onChangeUser.bind(this)}
          />
        </div>
        <div className="form-group">
          <label>Flat/Bunglow No.</label>
          <input
            type="text"
            id="Flat"
            className="form-control"
            defaultValue={this.state.persons.Flat}
            onChange={this.onChangeUser.bind(this)}
          />

          <label>Society Name</label>
          <input
            type="text"
            id="SocietyName"
            className="form-control"
            defaultValue={this.state.persons.SocietyName}
            onChange={this.onChangeUser.bind(this)}
          />

          <label>Street Name</label>
          <input
            type="text"
            id="StreetName"
            className="form-control"
            defaultValue={this.state.persons.StreetName}
            onChange={this.onChangeUser.bind(this)}
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            id="City"
            className="form-control"
            defaultValue={this.state.persons.City}
            onChange={this.onChangeUser.bind(this)}
          />
        </div>
        <div className="form-group">
          <label>State</label>
          <input
            type="text"
            id="State"
            className="form-control"
            defaultValue={this.state.persons.State}
            onChange={this.onChangeUser.bind(this)}
          />
        </div>
        <div className="form-group">
          <label>Pincode</label>
          <input
            type="text"
            id="PinCode"
            className="form-control"
            defaultValue={this.state.persons.PinCode}
            onChange={this.onChangeUser.bind(this)}
          />
        </div>
        <div className="form-group">
          <label>Phone No</label>
          <input
            type="text"
            id="PhoneNo"
            className="form-control"
            defaultValue={this.state.persons.PhoneNo}
            onChange={this.onChangeUser.bind(this)}
          />
        </div>
        <div className="form-group">
          <label>Mobile No</label>
          <input
            type="text"
            id="MobileNo"
            className="form-control"
            defaultValue={this.state.persons.MobileNo}
            onChange={this.onChangeUser.bind(this)}
          />
        </div>
        <div className="form-group">
          <label>
            Physical Disability ({this.state.persons.PhysicalDisability})
          </label>{" "}
          &nbsp;
          <select
            id="PhysicalDisability"
            defaultValue={this.state.persons.PhysicalDisability}
            onChange={this.onChangeUser.bind(this)}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group">
          <label>Marital Status ({this.state.persons.MaritalStatus})</label>
          <br />
          <select
            id="MaritalStatus"
            onChange={this.onChangeUser.bind(this)}
            defaultValue={this.state.persons.MaritalStatus}
          >
            <option value="">Select</option>
            <option value="Married">Married</option>
            <option value="Unmarried">Unmarried</option>
            <option value="Divorced">Divorced</option>
            <option value="Widow">Widow</option>
            <option value="Widower">Widower</option>
          </select>
        </div>
        <div className="form-group">
          <label>
            Educational Status ({this.state.persons.EducationStatus})
          </label>
          <br />
          <select
            id="EducationStatus"
            defaultValue={this.state.persons.EducationStatus}
            onChange={this.onChangeUser.bind(this)}
          >
            <option value="">Select</option>
            <option value="PHD">PHD</option>
            <option value="Graduate">Graduate</option>
            <option value="Under-Graduate">Under-Graduate</option>
            <option value="HSC">HSC</option>
            <option value="SSC">SSC</option>
          </select>
        </div>
        <div className="form-group">
          <label>Birth Sign(if Any)</label>
          <input
            type="text"
            id="BirthSign"
            className="form-control"
            defaultValue={this.state.persons.BirthSign}
            onChange={this.onChangeUser.bind(this)}
          />
        </div>
        <div align="center">
          <input
            type="button"
            value="Update Details"
            className="btn btn-success"
            onClick={this.onRegisterClicked.bind(this)}
          />{" "}
          {"     "} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="button"
            value="Cancel"
            className="btn btn-danger"
            onClick={this.onLogoutClicked.bind(this)}
          />
         </div>
      </div>
    );
  }
}

export default PersonUpdateHome;
