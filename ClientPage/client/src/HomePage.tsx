
interface HomePageProps {
  user: string;
  onLogout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ user, onLogout }) => {
  // You would probably have a state here to hold messages
  // const [messages, setMessages] = useState([]);

  return (
    <div className="home-page">
      <h1>Welcome, {user}!</h1>
      <button onClick={onLogout}>Logout</button>
      {/* Here you would map over messages to display them */}
    </div>
  );
};

export default HomePage;
