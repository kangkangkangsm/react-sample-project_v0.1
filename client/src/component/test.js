import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import tileData from './tileData';
import { jwtDecode } from 'jwt-decode';

const Main = () => {
  const [feeds, setFeeds] = useState([]);
  const [user, setUser] = useState(null);

  const fnList = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get('http://localhost:3100/feed', { headers: { token } });
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

  const fndelete = async (id) => {
    if (!window.confirm("삭제 하시겠습니까?")) {
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
  };

  const fnLike = async (id) => {
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
  };

  useEffect(() => {
    fnList();
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
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={3}
      sx={{ backgroundColor: '#f0f4f8' }}
    >
      {feeds.map((feed) => (
        <Paper key={feed.id} sx={{ width: '100%', maxWidth: '600px', mb: 2, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {feed.userId_fc}
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
                <ThumbUpIcon /> <span style={{ marginLeft: '10px' }}>{feed.favorite}</span>
              </IconButton>
              <IconButton color="secondary" onClick={() => fndelete(feed.id)}>
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
