import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import { UserService } from "@genezio-sdk/HackstreetBoys";
import './App.css'

function App() {
  const [name, setName] = useState("");
  // const [surname, setSurname] = useState("");
  const [response, setResponse] = useState([]);
  // const [userId, setUserId] = useState(ShoppingCartService.getNoOfUsers());

  async function addUser() {
    await UserService.addMessage(name);
    // setUserId(currentUserId => currentUserId + 1);
    // console.log(userId);
  }

  async function updateUsers() {
    try {
      const rez = await UserService.getMessages("User");
      setResponse(rez);
    } catch {
      console.error("Eroare");
    }
  }

  // useEffect(() => {
  //   // Function to fetch cart contents and update state
  //   async function fetchAndSetCartContents() {
  //     try {
  //       const cartContents = await ShoppingCartService.getCartContents("mama");
  //       setResponse(cartContents || "No items in cart"); // Set response state or a default message if no items found
  //     } catch (error) {
  //       console.error('Error fetching cart contents:', error);
  //       setResponse("Error fetching cart contents");
  //     }
  //   }

  //   // Fetch cart contents when the component mounts
  //   fetchAndSetCartContents();

  //   // Update cart contents every 5 seconds
  //   const intervalId = setInterval(fetchAndSetCartContents, 10000);

  //   // Clear interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, []); // Empty dependency array means this effect runs only once on mount


  return (
    <>
      <div className='background'>
        <div>
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
        <h1>Genezio + React = ❤️</h1>
        <div className="card">
          <input
            type="text"
            className="input-box"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          {/* <input
          type="text"
          className="input-box"
          onChange={(e) => setSurname(e.target.value)}
          placeholder="Enter your surname"
        /> */}
          <br />
          <br />
          <button onClick={() => addUser()}>AddItem</button>
          <button onClick={() => updateUsers()}>Say Hello</button>
          <h3>Added users are:</h3>
          {/* <p className="read-the-docs">{response}</p> */}
          <div>{response.map((element, i) => (
            <div>
              <button>
                {element}
              </button>
              <br />
            </div>
          ))}</div>
        </div>
      </div>
    </>
  );
}

export default App
