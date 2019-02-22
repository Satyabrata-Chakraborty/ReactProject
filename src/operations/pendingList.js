import React, { Component } from "react";
import LoginService from "../services/service";

class PendingList extends Component {
  constructor(props) {
    super(props);
    this.serv = new LoginService();
    this.state = {
      UserId: "",
      UserName: "",
      EmailAddress: "",
      Password: "",
      RoleId: "",
      users: []
    };
  }

  /* Approve button clicked */
  onApproveClicked(e) {
    this.setState({ UserId: e.UserId });
    this.setState({ UserName: e.UserName });
    this.setState({ EmailAddress: e.EmailAddress });
    this.setState({ Password: e.Password });
    this.setState({ RoleId: e.RoleId });
    let newUser = {
      UserId: e.UserId,
      UserName: e.UserName,
      EmailAddress: e.EmailAddress,
      Password: e.Password,
      RoleId: e.RoleId
    };
    /* Create in users collection */
    this.serv
      .createUser(newUser)
      .then(res => res.json())
      .then(resp => {
        console.log(JSON.stringify(resp));
      });
    window.location.reload();

    
    // #region For creation of UserId status in ustatus collection 
    let setUser={
      UserName:e.UserName,
      flag:""
    }
    console.log("Here"+setUser.UserName);
    this.serv
      .setUstatus(setUser)
      .then(res => res.json())
      .then(resp => {
        console.log(JSON.stringify(resp));
      });
    //#region
    

    /* Delete from tempUsers collection */
    this.serv
      .deleteTempUser(newUser)
      .then(res => res.json())
      .then(resp => {
        console.log(JSON.stringify(resp));
      });
      window.location.reload();
  }

  /* Delete User from tempUsers collection (Explicitly) */
  onRejectClicked(e) {
    let newUser = {
      UserId: e.UserId,
      UserName: e.UserName,
      EmailAddress: e.EmailAddress,
      Password: e.Password,
      RoleId: e.RoleId
    };

    this.serv
      .deleteTempUser(newUser)
      .then(res => res.json())
      .then(resp => {
        console.log(JSON.stringify(resp));
      });
      window.location.reload();
  }

  componentDidMount() {
    this.serv
      .loadTempUsers()
      .then(data => data.json())
      .then(value => {
        console.log("here" + JSON.stringify(value.data));
        console.log(value);
        this.setState({ users: value.data });
        // alert(JSON.stringify(value.data));
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
              <th>User Id</th>
              <th>Username</th>
              <th>Email address</th>
              <th>Role Id</th>
              <th colSpan="2" align="center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((prd, idx) => (
              <TableRow
                key={idx}
                row={prd}
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

  onUserClicked() {
    this.props.selected(this.props.row);
  }

  onRowDeleted() {
    this.props.deleted(this.props.row);
  }

  render() {
    return (
      <tr>
        <td>{this.props.row.UserId}</td>
        {/* {this.setState({UserId:this.props.row.UserId})} */}
        <td>{this.props.row.UserName}</td>
        {/* {this.setState({UserName:this.props.row.UserName})} */}
        <td>{this.props.row.EmailAddress}</td>
        {/* {this.setState({EmailAddress:this.props.row.EmailAddress})} */}
        <td>{this.props.row.RoleId}</td>
        <td>
          <button
            className="btn btn-primary"
            onClick={this.onUserClicked.bind(this)}
          >
            Approve
          </button>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={this.onRowDeleted.bind(this)}
          >
            Reject
          </button>
        </td>
      </tr>
    );
  }
}

// {console.log("LL")}
//         {this.setState({RoleId:this.props.row.RoleId})}
//         {console.log(this.props.row.RoleId)}

export default PendingList;
