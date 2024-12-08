import { Link } from "react-router-dom";
import { Bitcoin, ArrowLeftRight } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="border-b-2 border-black mb-8">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Bitcoin size={32} className="text-primary" />
            <span className="text-2xl font-bold">CryptoTracker</span>
          </Link>
          <Link 
            to="/compare" 
            className="neo-brutalist-button flex items-center gap-2"
          >
            <ArrowLeftRight size={20} />
            Compare
          </Link>
        </div>
      </div>
    </nav>
  );
};