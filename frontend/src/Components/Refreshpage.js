import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Refreshpage({ setAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setAuthenticated(true);
            if (
                location.pathname === '/' ||
                location.pathname === '/login' ||
                location.pathname === '/signup'
            ) {
                navigate('/home', { replace: true });
            }
        }
    }, [location, navigate, setAuthenticated]);

    return null;
}

export default Refreshpage;
