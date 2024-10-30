import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './../Feed.css';
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  IconButton,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField
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

  const handleClickOpen = async (feed) => {
    setSelectedFeed(feed);
    setOpen(true);
    setComments([]); // 댓글 초기화
    setNewComment(''); // 새 댓글 초기화

    // 선택된 피드의 댓글 불러오기
    try {
      const res = await axios.get(`http://localhost:3100/feed/comment/${feed.id}`);
      if (res.data.success) {
        setComments(res.data.comments);
      } else {
        console.log("댓글 로딩 실패");
      }
    } catch (err) {
      console.log("댓글 로딩 오류:", err);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFeed(null);
    setComments([]);
  };

  // 댓글 추가
  const handleAddComment = async () => {
    if (!newComment.trim()) return; // 빈 댓글 방지

    try {
      const res = await axios.post('http://localhost:3100/feed/comment', {
        postId: selectedFeed.id,
        userId: user.userId,
        comment: newComment
      });
      
      if (res.data.success) {
        // 댓글 목록 업데이트
        const commentList = await axios.get(`http://localhost:3100/feed/comment/${selectedFeed.id}`);
        setComments(commentList.data.comments);
        setNewComment(''); // 댓글 입력창 초기화
      } else {
        console.log("댓글 작성에 실패했습니다.");
      }
    } catch (err) {
      console.log("서버 통신 오류:", err);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} style={{}}>
        <Grid container spacing={3}>
          {feeds.map((feed) => (
            <Grid item xs={12} sm={6} md={4} key={feed.id}>
              <Card style={{ cursor: 'pointer', borderRadius: '8px', overflow: 'hidden' }}>
                {feed.img_paths && feed.img_paths.split(',').length > 1 ? (
                  <Slider {...sliderSettings}>
                    {feed.img_paths.split(',').map((imgPath, index) => (
                      <div key={index}>
                        <img onClick={() => handleClickOpen(feed)}
                          src={`http://localhost:3100/img/${imgPath.replace(/\\/g, '/').split('/').pop()}`}
                          alt={`피드 이미지 ${index}`}
                          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <img
                    src={`http://localhost:3100/img/${feed.img_paths.split(',')[0].replace(/\\/g, '/').split('/').pop()}`}
                    alt="피드 이미지"
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    onClick={() => handleClickOpen(feed)}
                  />
                )}
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ fontWeight: 'bold', marginTop: '10px', lineHeight: '1.5', color: '#333' }}
                  >
                    {feed.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {selectedFeed && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" className="feed-dialog">
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{ position: 'absolute', right: 1, top: -10 }} // 닫기 버튼 위치 조정
            style={{ color : 'white'}}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent className="dialog-content" sx={{ padding: '16px', overflow: 'hidden', bgcolor: '#282c34' }}>
  <Slider {...sliderSettings}>
    {selectedFeed.img_paths.split(',').map((imgPath, index) => (
      <Box
        key={index}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ bgcolor: '#000', height: '400px' }}
      >
        <img
          src={`http://localhost:3100/img/${imgPath.replace(/\\/g, '/').split('/').pop()}`}
          alt={`슬라이드 이미지 ${index}`}
          className="slide-image"
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        />
      </Box>
    ))}
  </Slider>
  
  <Typography
    variant="body1"
    sx={{ mt: 2, fontWeight: 'bold', fontSize: '18px', color: '#fff' }}
    className="dialog-description"
  >
    {selectedFeed.content}
  </Typography>
  
  {/* 추가된 username 부분 */}
  <Typography
    variant="subtitle1"
    sx={{ fontWeight: 'bold', fontSize: '16px', color: '#fff', mt: 1 }}
  >
    {selectedFeed.username || '알 수 없음'}의 피드
  </Typography>

  <Box sx={{ mt: 2 }}>
    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '16px', color: '#fff' }}>댓글</Typography>
    <List sx={{ maxHeight: '200px', overflowY: 'auto', padding: '8px', bgcolor: '#fff', borderRadius: '8px' }}>
      {comments.map((comment) => (
        <ListItem key={comment.id} sx={{ alignItems: 'flex-start', paddingLeft: '0' }}>
          <ListItemAvatar>
            <Avatar>{(comment.username && comment.username.charAt(0).toUpperCase()) || '?'}</Avatar>
          </ListItemAvatar>
          <ListItemText 
            primary={comment.comment || '내용 없음 테스트'} 
            secondary={`${comment.username || '아이디없음 테스트 '}`} 
            sx={{ color: '#333' }} 
          />
        </ListItem>
      ))}
    </List>
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
      <TextField
        label="댓글을 입력하세요"
        variant="outlined"
        fullWidth
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        sx={{ marginRight: '8px', bgcolor: '#f0f0f0', borderRadius: '8px' }} // 댓글 입력창 배경색 조정
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddComment}
        sx={{ padding: '8px 16px' }}
      >
        등록
      </Button>
    </Box>
  </Box>
</DialogContent>

        </Dialog>
      )}
    </Container>
  );
}

export default Feed;
