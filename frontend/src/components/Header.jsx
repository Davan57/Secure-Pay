import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold tracking-widest text-blue-400 animate-pulse">
          Secure Pay
        </h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-blue-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/account" className="hover:text-blue-400 transition">
                Account
              </Link>
            </li>
            
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
