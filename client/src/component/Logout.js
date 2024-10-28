import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigateO = useNavigate();

    useEffect(() => {
        localStorage.clear();
        navigateO("/login");
    }, [navigateO]); 

    return (
        <div>
            로그아웃
        </div>
    );
}

export default Logout;
