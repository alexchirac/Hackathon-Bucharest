import { useState } from 'react'
import reactLogo from "./assets/react.svg"
import { BackendService } from "@genezio-sdk/ClientPage"
import './App.css'

function App() {
  const [name, setName] = useState("");
  const [response, setResponse] = useState("");

  async function logIn() {
    try {
      const newResponse = await BackendService.hello(name);
      await BackendService.addUser(name);
      setResponse(newResponse);
    } catch {
      console.error("Eroare");
    }
  }

  return (
    <>
      <div className="logo-container">
        <a href="https://genezio.com" target="_blank">
          <img
            src="https://raw.githubusercontent.com/Genez-io/graphics/main/svg/Logo_Genezio_White.svg"
            className="logo genezio light"
            alt="Genezio Logo"
          />
          <img
            src="https://raw.githubusercontent.com/Genez-io/graphics/main/svg/Logo_Genezio_Black.svg"
            className="logo genezio dark"
            alt="Genezio Logo"
          />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Welcome to our app!</h1>
      <h2>Enter your username below:</h2>
      <div className="card">
        <input
          type="text"
          className="input-box"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <br />
        <br />

        <button onClick={() => logIn()}>Log in</button>
        <p className="read-the-docs">{response}</p>
      </div>
    </>
  );
}

export default App