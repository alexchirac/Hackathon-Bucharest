import { useState } from 'react';

import { BackendService } from "@genezio-sdk/ClientPage"

interface LoginPageProps {
  onLogin: (username: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = () => {
  const [username, setUsername] = useState('');


  async function handleSubmit() {
    try {
      // const newResponse = await BackendService.hello(username);
      const response = await BackendService.addUser(username);
      console.log(response);
      // changeToPage();
    } catch {
      console.error("Eroare");
    }
  }

  return (
    <div className="login-page">
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit" onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default LoginPage;
