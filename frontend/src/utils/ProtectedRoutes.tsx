import {Outlet, Navigate} from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoutes = () => {
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(true)
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://localhost:5000/auth/me", {
            credentials: "include",
        })
        .then(res => {
            if(!res.ok) {
                throw new Error("unauthorized")
            }
            return res.json()
        })
        .then(data => {
            setUsername(data.username)
        })
        .catch(() => {
            setAuthenticated(false)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    if (loading) return <p> Checking authentication...</p>
    return authenticated ? <Outlet context={{username}}/> : <Navigate to = "/"/>
}

export default ProtectedRoutes;