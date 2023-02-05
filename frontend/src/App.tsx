
import { useState } from 'react';
import './App.css';

const auth_host = process.env.REACT_APP_AUTH_HOST;

function App() {
  const [phoneNumber, changePhoneNumber] = useState("")
  const [accessCode, changeAccessCode] = useState("")

  const sendAccessCode = async (phoneNum: string) => {
    console.log("Send Access Code " + phoneNum);
    const res = await fetch(auth_host + "/login/access-code", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phoneNumber: phoneNum
      })
    })
    alert(res.statusText)
  }


  const signIn = (phoneNum: string, code: string) => {
    console.log("SignIn " + phoneNum + " " + code);
    fetch(auth_host + "/login/validate", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phoneNumber: phoneNum,
        accessCode: code
      })
    })
    .then(res => alert(res.statusText))
    .catch(err => alert(err))

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
