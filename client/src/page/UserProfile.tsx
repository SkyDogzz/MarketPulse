import { useEffect } from "react";
import useAuthStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const img = "https://picsum.photos/seed/" + user?.id + "/200/200";

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  return (
    <div className="user-card">
      <h1 className="user-card-title">User Profile</h1>
      <img className="user-card-img" src={img} alt="Photo de profil" />
      <p className="user-card-detail">Email: <span className="user-card-value">{user?.email}</span></p>
      <p className="user-card-detail">FirstName: <span className="user-card-value">{user?.firstName}</span></p>
      <p className="user-card-detail">LastName: <span className="user-card-value">{user?.lastName}</span></p>
      <p className="user-card-detail">CreatedAt: <span className="user-card-value">{user?.createdAt}</span></p>
      <p className="user-card-detail">UpdatedAt: <span className="user-card-value">{user?.updatedAt}</span></p>
    </div>
  );
  
}
