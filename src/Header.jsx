import { Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export function Header() {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return null;
  }

  return (
    <header>
      <nav>
        <Link to="/plants">Browse Plants</Link>
        <Link to="/about">About</Link>
        <Link to="/collected_plants">Collection</Link>
        <Link to="/schedules/dashboard">Schedules Dashboard</Link>
        <LogoutLink />
      </nav>    
    </header>
  );
}