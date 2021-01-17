import "./App.css";
import SignUp from "./SignUp.js";
import SignIn from "./SignIn.js";
import Account from "./Account.js";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthRedirect } from "./AuthRedirect";

//sets initial state of web page, no image URL 0 entries
// const initialState = {
//   route: "SignIn",
//   isSignedIn: false,
//   user: {
//     id: "",
//     name: "",
//     email: "",
//     verificationScore: 0,
//     joined: "",
//   },
// };

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/account">
              <Account />
            </Route>
            <Route path="/sign-in">
              <SignIn />
            </Route>
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/verify">
              <AuthRedirect />
            </Route>
            <Route path="/">
              <div>Home</div>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
