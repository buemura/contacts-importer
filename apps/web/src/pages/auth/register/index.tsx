import { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../../../services/authService";

export function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      await authService.register({ username, password });
      setIsLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-neutral-200">
      <form
        className="flex flex-col bg-white p-10 gap-2"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl">Register</h1>

        <div className="flex flex-col">
          <label>Username</label>
          <input
            className="border border-neutral-500 pl-2"
            type="text"
            placeholder="john_doe"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label>Password</label>
          <input
            className="border border-neutral-500 pl-2"
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button
          className="bg-blue-600 text-white p-1 hover:bg-blue-700"
          disabled={isLoading}
        >
          Submit
        </button>

        <Link to="/auth/login" className="hover:text-blue-800">
          Already registered? Click here to login.
        </Link>
      </form>
    </div>
  );
}
