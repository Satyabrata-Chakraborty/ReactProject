import React, { Component } from "react";
import LoginService from "../services/service";

class OperatorHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserId: "",
      UserName: "",
      EmailAddress: "",
      Password: "",
      RoleId: ""
    };
    this.serv = new LoginService();
  }

  onChangeUser(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  userData(e) {
    console.log(this.state);
    let user = {
      UserId: this.state.UserId,
      UserName: this.state.UserName,
      EmailAddress: this.state.EmailAddress,
      Password: this.state.Password,
      RoleId: this.state.RoleId
    };
    console.log(
      JSON.stringify(
        `${user.UserId} ${user.UserName} ${user.EmailAddress} ${
          user.Password
        } ${user.RoleId}`
      )
    );
    if (user.RoleId === "") {
      user.RoleId = "111";
    }
    this.serv
      .createTempUser(user)
      .then(res => res.json())
      .then(resp => {
        console.log(JSON.stringify(resp));
      })
      .catch(error => console.log(error.status));
  }

  operatorLogout() {
    localStorage.removeItem("token");
    let history = this.props.history;
    history.push("/");
  }
  render() {
    return (
      <form>
        <div align="center">
          <table>
            <tbody>
              <tr>
                <td colSpan="2">
                  <h1>User Registration</h1>
                </td>
              </tr>
              <tr>
                <td>
                  <label>UserId</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="UserId"
                    onChange={this.onChangeUser.bind(this)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>User Name</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="UserName"
                    onChange={this.onChangeUser.bind(this)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Email Address</label>
                </td>
                <td>
                  <input
                    type="email"
                    name="EmailAddress"
                    onChange={this.onChangeUser.bind(this)}
                    required
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Password</label>
                </td>
                <td>
                  <input
                    type="password"
                    name="Password"
                    onChange={this.onChangeUser.bind(this)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Retype Password</label>
                </td>
                <td>
                  <input type="password" name="retypepassword" required />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Roles</label>
                </td>
                <td align="center">
                  <select
                    name="RoleId"
                    onClick={this.onChangeUser.bind(this)}
                    required
                  >
                    <option value="111">Administrator</option>
                    <option value="222">Operator</option>
                    <option value="333">User</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="submit"
                    className="btn btn-success"
                    onClick={this.userData.bind(this)}
                    value="Register"
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={this.operatorLogout.bind(this)}
                  >
                    Logout
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    );
  }
}

export default OperatorHome;