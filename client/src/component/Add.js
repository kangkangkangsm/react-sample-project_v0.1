import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, IconButton, Button, Divider } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';  // axios import 추가
import {jwtDecode} from 'jwt-decode';  // jwtDecode import 수정

const AddPost = () => {
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const contentRef = useRef(null);

  const imageChange = (e) => {
    setImages(e.target.files);
    setImage(URL.createObjectURL(e.target.files[0]));  // 첫 번째 이미지를 미리보기로 설정
  };

  const fnSubMit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      const response = await axios.post('http://localhost:3100/feed', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);
    } catch (error) {
      console.error('피드 등록 오류:', error);
    }
  };

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
    <Box display="flex" flexDirection="row" width="100%" height="80vh" padding={3} sx={{ backgroundColor: '#f9f9f9' }}>
      {/* Left Side: Image Upload Preview */}
      <Box width="60%" height="100%" display="flex" justifyContent="center" alignItems="center" sx={{ backgroundColor: '#000' }}>
        {image ? (
          <img src={image} alt="uploaded" style={{ maxHeight: '80%', maxWidth: '80%' }} />
        ) : (
          <Button
            variant="contained"
            component="label"
            startIcon={<AddPhotoAlternateIcon />}
            sx={{ color: 'white', backgroundColor: '#ff5722', padding: '10px 20px' }}
          >
            사진을 선택하세요
            <input type="file" hidden accept="image/*" multiple onChange={imageChange} />
          </Button>
        )}
      </Box>

      {/* Right Side: Post Details */}
      <Box width="40%" padding={2} display="flex" flexDirection="column" justifyContent="space-between">
        <Box>
          <Typography variant="h6" gutterBottom>
            새 게시물 만들기
          </Typography>
          <Divider />
          <Box mt={2} display="flex" alignItems="center">
            <Typography variant="subtitle1">  {user && user.name}({user && user.userId}) </Typography>
          </Box>
          <TextField
            placeholder="문구 입력..."
            multiline
            rows={4}
            inputRef={contentRef}
            value={content}
            fullWidth
            variant="outlined"
            sx={{ marginY: 2 }}
            onChange={(e) => setContent(e.target.value)}
          />
          <Typography variant="caption" color="textSecondary">
            {content?.length || 0}/2200
          </Typography>
          <Divider sx={{ my: 2 }} />
          <IconButton color="primary">
            <LocationOnIcon />
            <Typography variant="body2" sx={{ marginLeft: 1 }}>위치 추가</Typography>
          </IconButton>
          <IconButton color="primary">
            <PersonAddIcon />
            <Typography variant="body2" sx={{ marginLeft: 1 }}>사람 태그</Typography>
          </IconButton>
        </Box>
        <Box>
          <Button variant="contained" color="primary" onClick={fnSubMit} fullWidth>
            공유하기
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddPost;
