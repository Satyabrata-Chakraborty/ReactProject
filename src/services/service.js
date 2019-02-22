import { request } from "http";

class LoginService {
  //calling method from loginServer to authenticate the user with
  //call to the mongodb
  checkUser(user) {
    //alert("CheckUSer in loginwebservice");
    //alert(JSON.stringify(user));
    console.log(user);

    let promise = fetch("http://localhost:4070/users/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      //body:JSON.stringify(UserName,Password)
      body: JSON.stringify(user)
    });
    console.log(promise);
    return promise;
  }

  loadPersons() {
    let promise = fetch("http://localhost:4070/api/person", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    });
    console.log(promise);
    return promise;
  }

  //#region For specific person data load in update person 
  findSpecificPerson(personData) {
    let promise = fetch("http://localhost:4070/api/person/findone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify(personData)
    });
    console.log(personData);
    console.log(promise);
    return promise;
  }
  //#region

  
  //#region Check whether specific pid exists in tempPerson collection. Linked with personUpdateHome  
  findSpecificTempPerson(personData) {
    let promise = fetch("http://localhost:4070/api/tempperson/findone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify(personData)
    });
    console.log(promise);
    return promise;
  }
  //#region


  
  createUser(user) {
    let promise = fetch("http://localhost:4070/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify(user)
    });
    console.log(promise);
    return promise;
  }

  //#region Linked with ustatus of the collection
  setUstatus(user) {
    let promise = fetch("http://localhost:4070/api/ustatus/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify(user)
    });
    console.log(promise);
    return promise;
  }
  //#region

  //#region For ustatus fetch and pass it in user login section for verification of existing or new user
  getUstatus(UserFind) {
    let promise = fetch("http://localhost:4070/api/get/ustatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify(UserFind)
    });
    console.log(promise);
    return promise;
  }
  //#region

  createTempPerson(person) {
    let promise = fetch("http://localhost:4070/api/tempperson/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify(person)
    });
    console.log(promise);
    return promise;
  }

  createTempUser(user) {
    let promise = fetch("http://localhost:4070/tempusers/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify(user)
    });
    console.log(promise);
    return promise;
  }

  /* Create main person collection  */
  createPerson(person) {
    let promise = fetch("http://localhost:4070/api/create/person", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify(person)
    });
    console.log(promise);
    return promise;
  }

  loadTempUsers() {
    let promise = fetch("http://localhost:4070/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    });
    console.log(promise);
    return promise;
  }


  //#region Delete from person collection if update exists
  deletePerson(Per) {
    let promise = fetch("http://localhost:4070/api/person/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body:JSON.stringify(Per)
    });
    console.log(promise);
    // console.log(PP);
    return promise;
  }
  //#region


  deleteTempUser() {
    let promise = fetch("http://localhost:4070/api/tempuser/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    });
    console.log(promise);
    return promise;
  }

  loadTempPerson() {
    let promise = fetch("http://localhost:4070/api/temporaryperson", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    });
    console.log(promise);
    return promise;
  }

  deleteTempPerson(newPerson) {
    let promise = fetch("http://localhost:4070/api/tempperson/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body:JSON.stringify(newPerson)
    });
    console.log(promise);
    return promise;
  }

  
  //#region ustatus update flag to 1
  updateUstatus(user){
    // console.log("MNMNMNMNMN     "+user);
    let promise = fetch(`http://localhost:4070/api/update/ustatus/${user}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
      // body:JSON.stringify(user)
    });
    console.log(user)
    console.log(promise);
    return promise;
  }
  //#region


}
export default LoginService;
