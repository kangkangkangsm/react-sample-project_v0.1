import React, {useEffect,useState} from 'react';
import { Container, Typography, Box, Avatar, Grid, Paper } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

function MyPage() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setUser(decodedToken);
        } catch (err) {
          console.log("토큰 디코딩 에러:", err);
        }
      }
    }, []);
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        minHeight="100vh"
        sx={{ padding: '20px' }}
      >
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '15px', width: '100%' }}>
          {/* 프로필 정보 상단 배치 */}
          <Box display="flex" flexDirection="column" alignItems="center" sx={{ marginBottom: 3 }}>
            <Avatar
              alt="프로필 이미지"
              src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e" // 프로필 이미지 경로
              sx={{ width: 100, height: 100, marginBottom: 2 }}
            />
            <Typography variant="h5">{user && user.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              @{user && user.userId}
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">팔로워</Typography>
              <Typography variant="body1">0</Typography>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">팔로잉</Typography>
              <Typography variant="body1">0</Typography>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">게시물</Typography>
              <Typography variant="body1">2</Typography>
            </Grid>
          </Grid>
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h6">내 소개</Typography>
            <Typography variant="body1">
              리액트프로젝트
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default MyPage;