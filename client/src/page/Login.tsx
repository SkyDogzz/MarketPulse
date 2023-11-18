import axios from "axios";
import useAuthStore from '../stores/authStore';

export default function Login() {  
    const setToken = useAuthStore(state => state.setToken);

  const handleSubmit = (formData: React.FormEvent<HTMLFormElement>) => {
    formData.preventDefault();
    const form = formData.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    const apiURL = import.meta.env.VITE_API_URL;

    axios
      .post(apiURL + "/users/login", { email, password })
      .then((res) => {
        setToken(res.data.token)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
