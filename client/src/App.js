import React, { useState, useEffect } from 'react'; // useState 임포트
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { Box, CssBaseline, Drawer, Toolbar, AppBar, Typography } from '@mui/material';
import Login from './component/Login';
import Join from './component/Join';
import Main from './component/Main';
import Menu from './component/Menu';
import Add from './component/Add';
import MyPage from './component/MyPage';
import Logout from './component/Logout';
import Test from './component/test';
import { jwtDecode } from 'jwt-decode';

const drawerWidth = 240;

const Layout = ({ children }) => {
  const [user, setUser] = useState(null); // 여기에서 useState 사용
  const location = useLocation();
  const hideMenu = location.pathname === '/login' || location.pathname === '/join';
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);

      } catch (err) {
        console.log("토큰 디코딩 에러:", err);
      }
    }else{
      setUser(null);
    }
  });

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar style={{ backgroundColor: 'white', color: 'black' }} position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap>
            에스엔에스
          </Typography>
          <Typography variant="h6" noWrap>
          {!user ? '로그인하세요' : `${user.name} (${user.userId})`}
          </Typography>
        </Toolbar>
      </AppBar>
      {!hideMenu && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Menu />
        </Drawer>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          ml: hideMenu ? 0 : `${drawerWidth}px`,
          maxWidth: 'lg',
          margin: 'auto',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/main" element={<Main />} />
          <Route path="/register" element={<Add />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/test" element={<Test />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
