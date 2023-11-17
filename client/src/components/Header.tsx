import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <h1>My App</h1>
      <nav>
        <ul>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </ul>
      </nav>
    </div>
  );
}
