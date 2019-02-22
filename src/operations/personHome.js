import React, { Component } from "react";
import LoginService from "../services/service";

class PersonHome extends Component {
  constructor(props) {
    super(props);
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
      BirthSign: ""
    };
    this.serv = new LoginService();
  }

  onChangeUser(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onRegisterClicked(e) {
    let personData = {
      PersonalUniqueId: sessionStorage.getItem("UserId") //this.state.PersonalUniqueID
    };
    console.log(personData.PersonalUniqueId);
    this.serv
      .findSpecificTempPerson(personData)
      .then(data => data.json())
      .then(value => {
        if (value.data === null) {
          //#region If there is no duplicate entry then the request will be forwarded for approval
          let person = {
            PersonalUniqueId: sessionStorage.getItem("UserId"),
            FirstName: this.state.FirstName,
            MiddleName: this.state.MiddleName,
            LastName: this.state.LastName,
            Gender: this.state.Gender,
            DateOfBirth: this.state.DateOfBirth,
            Age: this.state.Age,
            Flat: this.state.Flat,
            SocietyName: this.state.SocietyName,
            StreetName: this.state.StreetName,
            City: this.state.City,
            State: this.state.State,
            PinCode: this.state.PinCode,
            PhoneNo: this.state.PhoneNo,
            MobileNo: this.state.MobileNo,
            PhysicalDisability: this.state.PhysicalDisability,
            MaritalStatus: this.state.MaritalStatus,
            EducationStatus: this.state.EducationStatus,
            BirthSign: this.state.BirthSign
          };
          this.serv.createTempPerson(person).then(res =>
            res
              .json()
              .then(resp => {
                // console.log(JSON.stringify(resp));
                alert("Saved and forwarded to Administrator for approval");
                this.onLogoutClicked();
              })
              .catch(error => console.log(error.status))
          );
          // #region
          

          //#region Update userstatus to set flag to 1 after person has requested for registration
          
          this.serv.updateUstatus(sessionStorage.getItem("UserName")).then(res =>
            res.json().then(resp => {
              console.log(JSON.stringify(resp));
            })
            .catch(error => console.log(error))
          );
          
          //#region



        } else {
          alert(
            "Failed! You already have pending registration details to be approved from Administrator"
          );
        }
      })
      .catch(error => {
        console.log(`Error occured ${error}`);
      });
  }

  onLogoutClicked() {
    sessionStorage.removeItem("UserId");
    sessionStorage.removeItem("UserName");
    localStorage.removeItem("token");
    let history = this.props.history;
    history.push("/");
  }

  render() {
    return (
      <div className="container">
        <div align="center">
          <h1>Registration Form</h1>
        </div>
        <div className="form-group">
          <label>PersonUniqueId</label>
          <input
            type="text"
            name="PersonalUniqueId"
            value={sessionStorage.getItem("UserId")}
            className="form-control"
            onChange={this.onChangeUser.bind(this)}
          />
        </div>
        <div className="form-group">
          First Name
          <input
            type="text"
            name="FirstName"
            className="form-control"
            onChange={this.onChangeUser.bind(this)}
          />
          <br />
          Middle Name
          <input
            type="text"
            name="MiddleName"
            className="form-control"
            onChange={this.onChangeUser.bind(this)}
          />
          <br />
          Last Name
          <input
            type="text"
            name="LastName"
            className="form-control"
            onChange={this.onChangeUser.bind(this)}
          />
          <br />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <br />
          <select name="Gender" onChange={this.onChangeUser.bind(this)}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>Date of Birth&nbsp;&nbsp;</label>
          <input
            type="date"
            name="DateofBirth"
            onChange={this.onChangeUser.bind(this)}
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="text"
            name="Age"
            className="form-control"
            onChange={this.onChangeUser.bind(this)}
          />
        </div>
        <div className="form-group">
          <label>Flat/Bunglow No.</label>
          <input
            type="text"
            name="FlatNo"
            className="form-control"
            onChange={this.onChangeUser.bind(this)}
          />

          <label>Society Name</label>
          <input
            type="text"
            name="SocietyName"
            className="form-control"
            onChange={this.onChangeUser.bind(this)}
          />

          <label>Street Name</label>
          <input
            type="text"
            name="StreetName"
            className="form-control"
            onChange={this.onChangeUser.bind(this)}
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="City"
            className="form-control"
            onChange={this.onChangeUser.bind(this)}
          />
        </div>
        <div className="form-group">
          <label>State</label>
          <input
            type="text"
            name="State"
            className="form-control"
            onChange={this.onChangeUser.bind(this)}
          />
        </div>
        <div className="form-group">
          <label>Pincode</label>
          <input
            type="text"
            name="PinCode"
            className="form-control"
            onChange={this.onChangeUser.bind(this)}
          />
        </div>
        <div className="form-group">
          <label>Phone No</label>
          <input
            type="text"
            name="PhoneNo"
            className="form-control"
            onChange={this.onChangeUser.bind(this)}
          />
        </div>
        <div className="form-group">
          <label>Mobile No</label>
          <input
            type="text"
            name="MobileNo"
            className="form-control"
            onChange={this.onChangeUser.bind(this)}
          />
        </div>
        <div className="form-group">
          <label>Physical Disability(if Any)</label> &nbsp;
          <select
            name="PhysicalDisability"
            onChange={this.onChangeUser.bind(this)}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group">
          <label>Marital Status</label>
          <br />
          <select name="MaritalStatus" onChange={this.onChangeUser.bind(this)}>
            <option value="">Select</option>
            <option value="Married">Married</option>
            <option value="Unmarried">Unmarried</option>
            <option value="Divorced">Divorced</option>
            <option value="Widow">Widow</option>
            <option value="Widower">Widower</option>
          </select>
        </div>
        <div className="form-group">
          <label>Educational Status</label>
          <br />
          <select
            name="EducationalStatus"
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
            name="BirthSign"
            className="form-control"
            onChange={this.onChangeUser.bind(this)}
          />
        </div>
        <div align="center">
          <input
            type="button"
            value="Save"
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

export default PersonHome;
