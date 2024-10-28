import React, { useEffect, useState } from 'react'; 
import axios from 'axios'; 
import { jwtDecode } from 'jwt-decode'; 
import Slider from 'react-slick'; 
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import './../Feed.css'; // CSS 파일 추가
import {
  Container, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  IconButton, 
  DialogActions, 
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

  // 피드 목록을 가져오는 함수
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

  // 컴포넌트가 마운트될 때 피드 목록과 사용자 정보를 가져옴
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
    setComments([]); 
    setNewComment(''); 
  };

  const handleClose = () => { 
    setOpen(false); 
    setSelectedFeed(null); 
    setComments([]); 
  };

  const handleAddComment = () => { 
    if (newComment.trim()) { 
      setComments([...comments, { id: 'currentUser', text: newComment }]); 
      setNewComment(''); 
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
      <Box mt={4}> 
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
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg" className="feed-dialog"> 
          <DialogTitle className="dialog-title">
            {selectedFeed.title} 
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
          <DialogContent className="dialog-content" style={{ paddingBottom: '16px' }}>
            <Slider {...sliderSettings}> 
              {selectedFeed.img_paths.split(',').map((imgPath, index) => ( 
                <img
                  key={index} 
                  src={`http://localhost:3100/img/${imgPath.replace(/\\/g, '/').split('/').pop()}`} 
                  alt={`슬라이드 이미지 ${index}`} 
                  className="slide-image"
                  style={{ width: '100%', height: '400px', objectFit: 'cover' }} // 슬라이드 이미지 크기 조정
                />
              ))} 
            </Slider>
            <Typography 
              variant="body1" 
              sx={{ mt: 2 }} 
              className="dialog-description"
            >
              {selectedFeed.content} 
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">댓글</Typography>
              <List>
                {comments.map((comment, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar>{comment.id.charAt(0).toUpperCase()}</Avatar> 
                    </ListItemAvatar>
                    <ListItemText primary={comment.text} secondary={comment.id} /> 
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
                댓글달기
              </Button>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary"> 
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}

export default Feed; 
