import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import { useEffect } from "react";

export default function Checkout() {
    const navigate = useNavigate();
    const user = useAuthStore(state => state.user);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    });

    return (
        <div>
            <h1>Checkout</h1>
        </div>
    );

}