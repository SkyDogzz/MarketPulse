import axios from "axios";
import { useNavigate } from "react-router-dom";
import useSuccessStore from "../stores/successStore";

export default function Register() {
  const setSuccess = useSuccessStore((state) => state.setSuccess);
  const navigate = useNavigate();

  const handleSubmit = (formData: React.FormEvent<HTMLFormElement>) => {
    formData.preventDefault();
    const form = formData.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;

    const apiURL = import.meta.env.VITE_API_URL;
    axios
      .post(apiURL + "/users/register", {
        email,
        password,
        firstName,
        lastName,
      })
      .then((res) => {
        if (res.data.status.code === 200) {
          setSuccess("You have successfully registered!");
          navigate("/login");
        }
        else console.log(res.data.status);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
