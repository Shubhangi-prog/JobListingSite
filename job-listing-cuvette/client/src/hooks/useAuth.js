import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('authJwtToken');
        if (!storedToken) {
            navigate('/user/signin');
        } else {
            setToken(storedToken);
        }
    }, [navigate]);

    return token;
};

export default useAuth;