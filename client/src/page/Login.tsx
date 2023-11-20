import axios from "axios";
import useAuthStore from "../stores/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSuccessStore from "../stores/successStore.tsx";

export default function Login() {
  const setSuccess = useSuccessStore((state) => state.setSuccess);
  const success = useSuccessStore((state) => state.success);

  const setAuth = useAuthStore((state) => state.setAuth);
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setSuccess("You have successfully logged in!");
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
      const res = await axios.post(apiURL + "/users/login", {
        email,
        password,
      });
      setAuth(res.data.token, res.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Login</h1>
      <p className="auth-message">{success}</p>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" className="form-control" />
        </div>
        <button type="submit" className="auth-button">Login</button>
      </form>
    </div>
  );
  
}
