import { Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";

export function Header() {
  return (
    <header>
      <nav>
        <Link to ="/plants">Browse Plants</Link>
        <Link to ="/about">About</Link>
        <Link to ="/collected_plants">Collection</Link>
        <Link to ="/schedules/dashboard">Schedules Dashboard</Link>
        {/* <Link to ="/login">Login</Link> */}
        {/* <Link to ="/signup">Signup</Link> */}
        <LogoutLink />
      </nav>
      
    </header>
  )
}