import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigateO = useNavigate();

    useEffect(() => {
        // 로컬 스토리지 클리어
        localStorage.clear();
        // 로그아웃 후 /login으로 리다이렉트
        navigateO("/login");
    }, [navigateO]); // navigate를 의존성 배열에 추가

    return (
        <div>
            로그아웃 중...
        </div>
    );
}

export default Logout;
