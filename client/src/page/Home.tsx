import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  const apiuRL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    axios.get(`${apiuRL}/products`).then((res) => {
      console.log(res.data);
    });
  }, [apiuRL]);
  

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
    </div>
  );
}
