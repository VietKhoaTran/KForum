import { useState } from "react";
import {useNavigate} from "react-router-dom";
import api from "../../api/api.tsx";
import AuthResponse from "../../types/Auth";

const useLogIn = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); 

    const login = async (username: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const res = await api.post<AuthResponse>("/auth/signup", {
                name: username,
                password,
            });

            console.log(res.data.message);
            navigate("/forum", {replace: true})
            
        } catch (error) {
            alert("Log in failed. Please try again");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    return {login, loading, error};
}

export default useLogIn;

