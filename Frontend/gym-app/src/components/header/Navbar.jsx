import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Bell, CircleUser } from "lucide-react";
import icon from "../../assets/icon.png";
import { isAuthenticated as checkAuth } from "../../utils/isAuthenticated";
import SubNavbar from "./SubNavbar";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const result = await checkAuth();
      setIsAuthenticated(!!result);
    };
    checkAuthentication();
  }, []);

  return (
    <div>
      <nav className="flex items-center justify-between px-4 py-3 shadow-md">
        {/* Logo + Nav Links (left side) */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={icon} alt="EnergyX logo" className="w-8 h-8" />
            <p className="text-lg font-semibold">EnergyX</p>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `p-1 ${isActive ? "border-b-2 border-[#9EF300]" : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/coaches"
              className={({ isActive }) =>
                `p-1 ${isActive ? "border-b-2 border-[#9EF300]" : ""}`
              }
            >
              Coaches
            </NavLink>
          </div>
        </div>

        {/* Right side: Auth or Icons */}
        <div className="hidden md:flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="border border-black rounded-lg px-4 py-2"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="border border-black rounded-lg px-4 py-2"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Bell className="cursor-pointer" />
              <CircleUser className="cursor-pointer" />
            </>
          )}
        </div>

        {/* Hamburger for small screens */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col items-start gap-4 px-4 py-3 md:hidden shadow-md border-b">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `p-1 ${isActive ? "border-b-2 border-[#9EF300]" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/coaches"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `p-1 ${isActive ? "border-b-2 border-[#9EF300]" : ""}`
            }
          >
            Coaches
          </NavLink>
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="border border-black rounded-lg px-4 py-2 w-full text-center"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="border border-black rounded-lg px-4 py-2 w-full text-center"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="flex gap-4">
              <Bell />
              <CircleUser />
            </div>
          )}
        </div>
      )}

      <SubNavbar />
    </div>
  );
}
