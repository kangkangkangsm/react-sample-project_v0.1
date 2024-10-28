import React, { useEffect, useState } from 'react'; 
import axios from 'axios'; 
import { jwtDecode } from 'jwt-decode'; 
import Slider from 'react-slick'; 
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
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
  const [open, setOpen] = useState(false); // 모달의 열림 상태
  const [selectedFeed, setSelectedFeed] = useState(null); // 선택된 피드
  const [comments, setComments] = useState([]); // 댓글 목록
  const [newComment, setNewComment] = useState(''); // 새로운 댓글 텍스트
  const [feeds, setFeeds] = useState([]); // 피드 목록
  const [user, setUser] = useState(null); // 사용자 정보

  // 피드 목록을 가져오는 비동기 함수
  const fnList = async () => { 
    const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
    try {
      // 피드 데이터를 요청
      const res = await axios.get('http://localhost:3100/feed', { headers: { token } }); 
      if (res.data.success) {
        setFeeds(res.data.list); // 성공 시 피드 목록 설정
      } else {
        console.log("에러"); // 에러 처리
      }
    } catch (err) {
      console.log("에러"); // 에러 처리
    }
  };

  useEffect(() => { 
    fnList(); // 컴포넌트 마운트 시 피드 목록 가져오기
    const token = localStorage.getItem("token"); 
    if (token) { 
      try {
        // 토큰을 디코딩하여 사용자 정보 설정
        const decodedToken = jwtDecode(token); 
        setUser(decodedToken); 
      } catch (err) {
        console.log("토큰 디코딩 에러:", err); // 디코딩 에러 처리
      }
    }
  }, []); 

  // 모달을 열기 위한 함수
  const handleClickOpen = (feed) => { 
    setSelectedFeed(feed); // 선택된 피드 설정
    setOpen(true); // 모달 열기
    setComments([]); // 댓글 초기화
    setNewComment(''); // 새 댓글 초기화
  };

  // 모달을 닫기 위한 함수
  const handleClose = () => { 
    setOpen(false); // 모달 닫기
    setSelectedFeed(null); // 선택된 피드 초기화
    setComments([]); // 댓글 초기화
  };

  // 댓글 추가를 위한 함수
  const handleAddComment = () => { 
    if (newComment.trim()) { // 댓글이 비어있지 않은 경우
      setComments([...comments, { id: 'currentUser', text: newComment }]); // 댓글 목록에 추가
      setNewComment(''); // 새 댓글 초기화
    } 
  };

  // 슬라이더 설정
  const sliderSettings = { 
    dots: true, // 페이지네이션 표시
    infinite: true, // 무한 슬라이드
    speed: 500, // 슬라이드 전환 속도
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 수
    slidesToScroll: 1 // 한 번에 스크롤할 슬라이드 수
  };

  return (
    <Container maxWidth="md"> 
      <Box mt={4}> 
        <Grid container spacing={3}> 
          {feeds.map((feed) => ( 
            <Grid item xs={12} sm={6} md={4} key={feed.id}> 
              <Card style={{ cursor: 'pointer' }}> 
                {feed.img_paths && feed.img_paths.split(',').length > 1 ? ( 
                  <Slider {...sliderSettings}> 
                    {feed.img_paths.split(',').map((imgPath, index) => ( 
                      <div key={index}> 
                        <img onClick={() => handleClickOpen(feed)} 
                          src={`http://localhost:3100/img/${imgPath.replace(/\\/g, '/').split('/').pop()}`} 
                          alt={`피드 이미지 ${index}`} 
                          style={{ width: '100%', height: '200px', objectFit: 'cover' }} // 이미지 스타일
                        /> 
                      </div>
                    ))} 
                  </Slider>
                ) : ( 
                  <img 
                    src={`http://localhost:3100/img/${feed.img_paths.split(',')[0].replace(/\\/g, '/').split('/').pop()}`} 
                    alt="피드 이미지" 
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
                    onClick={() => handleClickOpen(feed)} // 이미지 클릭 시 모달 열기
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
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg"> 
          <DialogTitle>
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
          <DialogContent>
            <Slider {...sliderSettings}> 
              {selectedFeed.img_paths.split(',').map((imgPath, index) => ( 
                <img
                  key={index} 
                  src={`http://localhost:3100/img/${imgPath.replace(/\\/g, '/').split('/').pop()}`} 
                  alt={`슬라이드 이미지 ${index}`} 
                  style={{ width: '100%', height: 'auto' }} // 이미지 스타일
                />
              ))} 
            </Slider>
            <Typography 
              variant="body1" 
              sx={{ mt: 2 }} 
              style={{ lineHeight: '1.6', color: '#555' }} 
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
                label="댓글을 입력하세요" // 댓글 입력 필드
                variant="outlined"
                fullWidth
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)} // 댓글 텍스트 변경 시 상태 업데이트
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddComment} // 댓글 추가 버튼 클릭 시
                sx={{ marginTop: 1 }}
              >댓글달기
            
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
