
import { useState } from 'react';
import './App.css';
import { Form } from './components/login-form';

const auth_host = process.env.REACT_APP_AUTH_HOST;

function App() {

  return (
    <div className="App">
      <Form
        onSendAccessCode={sendAccessCode}
        onSignIn={signIn}
      />
    </div>
  );
}

const sendAccessCode = async (phoneNum: string) => {
  
  console.log("Send Access Code " + phoneNum);
  
  try {
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
  } catch (err) {
    alert(err)
  }
}

const signIn = async (phoneNum: string, code: string) => {
  console.log("SignIn " + phoneNum + " " + code);
  try {
  const res = await fetch(auth_host + "/login/validate", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phoneNumber: phoneNum,
      accessCode: code
    })
  })
  alert(res.statusText)
  } catch (err) {
    alert(err)
  }
}


export default App;
