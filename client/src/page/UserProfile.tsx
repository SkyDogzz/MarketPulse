import { useEffect } from "react";
import useAuthStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  })

  return (
    <div>
      <h1>User Profile</h1>
      <p>Email: {user?.email}</p>
      <p>FirstName: {user?.firstName}</p>
      <p>LastName: {user?.lastName}</p>
      <p>CreatedAt: {user?.createdAt}</p>
      <p>UpdatedAt: {user?.updatedAt}</p>
    </div>
  );
}
