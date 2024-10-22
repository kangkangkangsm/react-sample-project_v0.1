import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
// 세션
import { jwtDecode } from 'jwt-decode';

const Main = () => {
  const [feeds, setFeeds] = useState([]);
  const [user, setUser] = useState(null); // 유저 정보를 담을 상태
  async function fndelete(id) {
    //console.log(id);
    if(!window.confirm("삭제 하시겠습니까?")){
      return;
    }
    try {
      const res = await axios.delete(`http://localhost:3100/feed/${id}`);
      if (res.data.success) {
        alert("삭제 성공");
        fnList();
      } else {
        alert("삭제 실패");
      }
    } catch (err) {
      console.log("에러 발생:", err);
    }
  }
  async function fnLike(id) {
       try {
      const res = await axios.put(`http://localhost:3100/feed/like/${id}`);
      if (res.data.success) {
        console.log("조아요 성공");
        fnList();
      } else {
        console.log("조아요 실패");
      }
    } catch (err) {
      console.log("에러 발생:", err);
    }
  }
  async function fnList() {
    const token = localStorage.getItem("token"); // 토큰 꺼내기
    try {
      const res = await axios.get('http://localhost:3100/feed', {
        headers : {token} // 헤더에 토큰 담아서 전송
      });
      if (res.data.success) {
        setFeeds(res.data.list);
        console.log(res.data.list);
      } else {
        console.log("에러");
      }
    } catch (err) {
      console.log("에러");
    } 
};
  

useEffect(() => {
  fnList();
  // 세션
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken = jwtDecode(token); // jwt 디코딩
      setUser(decodedToken); // 디코딩한 유저 정보를 상태로 저장
    } catch (err) {
      console.log("토큰 디코딩 에러:", err);
    }
  }
}, []);

  useEffect(() => {
  
  }, [fndelete]);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={3}
      sx={{ backgroundColor: '#f0f4f8' }}
    >
      User ID: {user.userId}
      {feeds.map((feed) => (
        <Paper key={feed.id} sx={{ width: '100%', maxWidth: '600px', mb: 2, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {feed.userId}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {feed.content}
          </Typography>
          <Typography variant="caption" color="textSecondary" gutterBottom>
            {new Date(feed.cdatetime).toLocaleString()}
          </Typography>

          <Box display="flex" justifyContent="space-between" mt={1}>
            <Box>
              <IconButton color="primary" onClick={() => fnLike(feed.id)}>
                <ThumbUpIcon /> <a style={{marginLeft : '10px'}}>{feed.favorite}</a>
              </IconButton>
              <IconButton color="secondary" onClick={() => fndelete(feed.id)} >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default Main;
