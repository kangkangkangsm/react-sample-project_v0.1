import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, Button, Divider } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete'; // 삭제 아이콘 추가
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
  const [images, setImages] = useState([]);
  const [user, setUser] = useState(null);
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const contentRef = useRef(null);

  const imageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [
      ...prevImages,
      ...files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      })),
    ]);
  };

  // 이미지 삭제 함수
  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const fnSubMit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      alert("업로드할 이미지를 선택하세요.");
      return;
    }
    const formData = new FormData();
    formData.append('content', content);
    formData.append('userId', user.userId);
    images.forEach((imageObj) => formData.append('images', imageObj.file));

    try {
      const response = await axios.post('http://localhost:3100/feed', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);
      navigate("/main");
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
        contentRef.current.focus();
      } catch (err) {
        console.log("토큰 디코딩 에러:", err);
      }
    }
  }, []);

  return (
    <Box display="flex" flexDirection="row" width="100%" height="80vh" padding={3} sx={{ backgroundColor: '#f9f9f9' }}>
      <Box width="60%" height="100%" display="flex" justifyContent="center" alignItems="center" sx={{ backgroundColor: '#000' }}>
        {images.length > 0 ? (
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
              {images.map((imgObj, index) => (
                <Box key={index} position="relative">
                  <img src={imgObj.preview} alt={`uploaded-${index}`} style={{ maxHeight: '150px', maxWidth: '150px' }} />
                  <Button
                    onClick={() => removeImage(index)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: -20,
                      color: 'white',
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </Button>
                </Box>
              ))}
            </Box>
            <Button
              variant="contained"
              component="label"
              startIcon={<AddPhotoAlternateIcon />}
              sx={{ color: 'white', backgroundColor: '#ff5722', padding: '10px 20px' }}
            >
              사진 추가하기
              <input type="file" hidden accept="image/*" multiple onChange={imageChange} />
            </Button>
          </Box>
        ) : (
          <Button
            variant="contained"
            component="label"
            startIcon={<AddPhotoAlternateIcon />}
            sx={{ color: 'white', backgroundColor: '#ff5722', padding: '10px 20px', mt: 2 }}
          >
            사진을 선택하세요
            <input type="file" hidden accept="image/*" multiple onChange={imageChange} />
          </Button>
        )}
      </Box>

      <Box width="40%" padding={2} display="flex" flexDirection="column" justifyContent="space-between">
        <Box>
          <Typography variant="h6" gutterBottom>
            새 게시물 만들기
          </Typography>
          <Divider />
          <Box mt={2} display="flex" alignItems="center">
            <Typography variant="subtitle1"> {user && user.name} ({user && user.userId}) </Typography>
          </Box>
          <TextField
            placeholder="문구 입력..."
            multiline
            rows={16}
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
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={fnSubMit}
            fullWidth
            disabled={images.length === 0} // 이미지가 없으면 버튼 비활성화
          >
            공유하기
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddPost;
