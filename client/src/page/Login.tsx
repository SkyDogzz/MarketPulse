import axios from "axios";
import useAuthStore from "../stores/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSubmit = async (formData: React.FormEvent<HTMLFormElement>) => {
    formData.preventDefault();
    const form = formData.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    const apiURL = import.meta.env.VITE_API_URL;

    try {
      const res = await axios.post(apiURL + "/users/login", { email, password });
      setAuth(res.data.token, res.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
