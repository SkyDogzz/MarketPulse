import useAuthStore from "../stores/authStore";

export default function UserProfile() {
  const user = useAuthStore((state) => state.user);

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
