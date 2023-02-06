
import './App.css';
import { Form } from './components/login-form';

const auth_host = process.env.REACT_APP_AUTH_HOST;

const App = () => {

  return (
    <div className="App">
      <Form
        onSendAccessCode={getAccessCode}
        onSignIn={signIn}
      />
    </div>
  );
}


const getAccessCode = async (phoneNum: string) => {

  console.log("Send Access Code to: " + phoneNum);

  fetch(auth_host + "/login/access-code", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phoneNumber: phoneNum
    })
  })
    .then(async res => {
      const data = await res.json()
      if (res.status === 200) alert("Success: Access code sent")
      else alert("Error: " + data.error)
    })
    .catch(err => {
      alert(err)
    })
}


const signIn = async (phoneNum: string, code: string) => {
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
    .then(async res => {
      const data = await res.json()
      if (res.status === 200) alert("Success: You are logged in")
      else alert("Error: " + data.error)
    })
    .catch(err => {
      alert(err)
    })
}


export default App;
