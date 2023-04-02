import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="flex justify-center gap-10 p-1 font-semibold bg-black text-white">
      <Link className="text-sm hover:bg-neutral-900 p-2" to="/">
        Home
      </Link>
      <Link className="text-sm hover:bg-neutral-900 p-2" to="/import">
        Import
      </Link>
      <Link className="text-sm hover:bg-neutral-900 p-2" to="/contacts">
        Contacts
      </Link>
    </nav>
  );
}
