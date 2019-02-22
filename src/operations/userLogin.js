import React, { Component } from "react";
import LoginService from "../services/service";
// import UserRegister from "./userRegister";
// import UserRegister from './operations/userRegister';

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserName: "",
      Password: ""
    };
    this.serv = new LoginService();
  }

  onChangeUser(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onLoginClicked(e) {
    // alert(`${this.state.UserName} &
    //           ${this.state.Password}`);

    let user = {
      UserName: this.state.UserName,
      Password: this.state.Password,
      UserId:"",
      flag:""
    };

    this.serv
      .checkUser(user)
      .then(res => res.json())
      .then(resp => {
        // console.log(resp.role);
        console.log("api values" + JSON.stringify(resp));
        localStorage.setItem("token", `Bearer ${resp.token}`);
        let history = this.props.history;
        if (resp.role === "Administrator") {
          history.push("/adminhome");
        } else if (resp.role === "Operator") {
          history.push("/operatorhome");
        }


        //#region Check in ustatus whether its a new or existing user and then log in
        else if (resp.role === "User") {
          sessionStorage.setItem("UserId", resp.uid);
          sessionStorage.setItem("UserName", resp.uname);
          this.serv
            .getUstatus(user)
            .then(res => res.json())
            .then(resp => {
              // this.setState("")
              if (resp.data.UserName === this.state.UserName && resp.data.flag === "0") {
                // console.log(resp.UserId);
                history.push("/personhome");
                } else {
                // console.log(resp.data.UserId);                  
                history.push("/personupdatehome");                
              } 
            console.log(JSON.stringify(resp));
            })
            .catch(error => console.log(error));
        }
        //#region
        

        
        
        else {
          alert("Credentials Invalid!!!");
          document.getElementById("Username").value = "";
          document.getElementById("Password").value = "";
        }
      })
      .catch(error => console.log(error.status));
  }

  render() {
    return (
      <div align="center">
        <h1>User Login</h1>
        <table>
          <tbody>
            <tr>
              <td>
                <h3>Username</h3>
              </td>
              <td>
                <input
                  id="Username"
                  type="text"
                  name="UserName"
                  onChange={this.onChangeUser.bind(this)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <h3>Password</h3>
              </td>
              <td>
                <input
                  id="Password"
                  type="password"
                  name="Password"
                  onChange={this.onChangeUser.bind(this)}
                />
              </td>
            </tr>
            <tr align="center">
              <td colSpan="2">
                <button
                  className="btn btn-primary"
                  onClick={this.onLoginClicked.bind(this)}
                >
                  Login
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserLogin;
