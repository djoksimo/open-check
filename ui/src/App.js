import './App.css';
import  SignUp from './SignUp.js'
import SignIn from './SignIn.js'
import React, {Component} from 'react';

//sets initial state of web page, no image URL 0 entries
const initialState = { 
  route: 'SignIn',
  isSignedIn:false,
  user: {
    id: '',
    name: '',
    email: '',       
    verificationScore: 0,
    joined: ''
  
  }
}


class App extends Component {

  constructor () {
    super ();
    this.state = initialState;
  }


render(){
  return (
    <div className="App">
      <SignIn/>
      </div>
    );
  }
};



// originial functionality
// function App() {
//   return (
//     <div className="App">   
//     <SignIn/>

//     </div>
//   );
// }

export default App;
