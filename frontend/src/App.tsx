
import { useState } from 'react';
import './App.css';

function App() {
  const [phoneNumber, changePhoneNumber] = useState("")
  const [accessCode, changeAccessCode] = useState("")

  const sendAccessCode = (phoneNum: string) => {
    console.log("Send Access Code " + phoneNum);
  }
  const signIn = (phoneNum: string, code: string) => {
    console.log("SignIn " + phoneNum + " " + code);

  }
  return (
    <div className="App">
      <div className="row">
        <div>Phone Number: </div>
        <input onChange={(e) => changePhoneNumber(e.target.value)} type="tel" name="phone" placeholder="+84123456789" />
        <button onClick={() => sendAccessCode(phoneNumber)}>Send Access Code</button>
      </div>
      <div className="row">
        <div>Access Code: </div>
        <input onChange={(e) => changeAccessCode(e.target.value)} name="accesscode" placeholder="" />
        <button onClick={() => signIn(phoneNumber, accessCode)}>Sign In</button>
      </div>
    </div>
  );
}

export default App;
