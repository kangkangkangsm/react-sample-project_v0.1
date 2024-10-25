import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
  Grid2,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


function Feed() {
  const [open, setOpen] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
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

  const handleClickOpen = (feed) => {
    setSelectedFeed(feed);
    setOpen(true);
    setComments([
      { id: 'user1', text: '멋진 사진이에요!' },
      { id: 'user2', text: '이 장소에 가보고 싶네요!' },
      { id: 'user3', text: '아름다운 풍경이네요!' },
    ]); // 샘플 댓글 추가
    setNewComment(''); // 댓글 입력 초기화
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFeed(null);
    setComments([]); // 모달 닫을 때 댓글 초기화
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: 'currentUser', text: newComment }]); // 댓글 작성자 아이디 추가
      setNewComment('');
    }
  };

  return (
    <Container maxWidth="md">
      {/* <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">나의피드</Typography>
        </Toolbar>
      </AppBar> */}

      <Box mt={4}>
        <Grid2 container spacing={3}>
          {feeds.map((feed) => (
            <Grid2 xs={12} sm={6} md={4} key={feed.id}>
              <Card>
              <CardMedia
  component="img"
  height="200"
  image={feed.img_path ? `http://localhost:3100/img/${feed.img_path.replace(/\\/g, '/').split('/').pop()}` : 'http://localhost:3100/img/default-image.jpg'}
  alt={feed.content}
  onClick={handleClickOpen}
  style={{ cursor: 'pointer' }}
/>

                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    {feed.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg"> {/* 모달 크기 조정 */}
        <DialogTitle>
          {selectedFeed?.title}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ display: 'flex' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">{selectedFeed?.description}</Typography>
            {selectedFeed?.image && (
              <img
                src={selectedFeed.image}
                alt={selectedFeed.title}
                style={{ width: '100%', marginTop: '10px' }}
              />
            )}
          </Box>

          <Box sx={{ width: '300px', marginLeft: '20px' }}>
            <Typography variant="h6">댓글</Typography>
            <List>
              {comments.map((comment, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>{comment.id.charAt(0).toUpperCase()}</Avatar> {/* 아이디의 첫 글자를 아바타로 표시 */}
                  </ListItemAvatar>
                  <ListItemText primary={comment.text} secondary={comment.id} /> {/* 아이디 표시 */}
                </ListItem>
              ))}
            </List>
            <TextField
              label="댓글을 입력하세요"
              variant="outlined"
              fullWidth
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}           
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddComment}
              sx={{ marginTop: 1 }}
            >
              댓글 추가
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Feed;