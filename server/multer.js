// multer.js
const multer = require('multer');
const path = require('path');

// 파일 저장 경로 및 이름 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'img/'); // 서버 내 img 폴더 경로 설정
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // 파일 확장자 추출
    cb(null, Date.now() + ext); // 파일명: 날짜 + 확장자
  },
});


module.exports = upload;