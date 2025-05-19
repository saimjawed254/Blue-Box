import Link from "next/link";
import "./Navbar.css";
import { Poppins, Rock_Salt } from "next/font/google";

export const rockSalt = Rock_Salt({ subsets: ["latin"], weight: ["400"] });
export const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

export default function Navbar() {
  return (
    <>
      <div className="navbar-container">
        <div className={`navbar-logo ${rockSalt.className}`}>Blue Box</div>
        <div className={`navbar-navigator ${poppins.className}`}>
          <div>
            <Link href="/">Home</Link>
          </div>
          <div>
            <Link href="/">New Arrivals</Link>
          </div>
          <div>
            <Link href="/">Men's Cargo</Link>
          </div>
          <div>
            <Link href="/">Ladie's Suits</Link>
          </div>
        </div>
        <div className="navbar-options">
            <div>
            <Link href="/">Cart</Link>
          </div>
          <div>
            <Link href="/">Search</Link>
          </div>
        </div>
      </div>
    </>
  );
}
