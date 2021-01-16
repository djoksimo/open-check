import "./App.css";
import SignUp from "./SignUp.js";
import SignIn from "./SignIn.js";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
  constructor() {
    super();
    // this.state = initialState;
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/">
             <div>Peepeepoopoo</div> 
            </Route>

          </Switch>
        </Router>
      </div>
    );
  }
} export default App;
