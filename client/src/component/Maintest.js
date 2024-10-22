import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Maintest(props) {
    const [feed, setFeed] = useState([]);

    useEffect(() => {
        async function feedList() {
            try {
                const res = await axios.get("http://localhost:3100/feed");
                setFeed(res.data);
            } catch (error) {
                console.error("에러있음", error);
            }
        }
        feedList();
    }, []);

    return (
        <div>
            <table border={'1'}  >
                    <tr style={{backgroundColor:'black', color: 'white'}}>
                        <th>아이디</th>
                        <th>내용</th>
                        <th>작성일</th>
                    </tr>
                    {feed.map((item) => (
                        <tr key={item}>
                            <td>{item.userId}</td> 
                            <td>{item.content}</td>
                            <td>{item.cdatetime}</td>
                        </tr>
                    ))}
            </table>
        </div>
    );
}

export default Maintest;
