const express = require('express');
const router = express.Router();
const connection = require('../db');
const jwtAuthentication = require('../jwtAuth');
const multer = require('multer');
const path = require('path');

// 파일 저장 경로 및 이름 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../img')); // 절대 경로 사용
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // 파일 확장자
    cb(null, Date.now() + ext); // 날짜 데이터를 이용해서 파일 이름으로 저장
  },
});

// 파일 업로드 미들웨어 설정
const upload = multer({ storage: storage });

// 정적 파일 제공 설정
router.use('/img', express.static(path.join(__dirname, '../img')));

// 피드 조회 및 생성 엔드포인트
router.route("/")
  .get(jwtAuthentication, (req, res) => {
    const query = `
      SELECT * FROM rp_tbl_feed AS rtf
      LEFT JOIN rp_tbl_feed_img AS rtfi ON rtf.id = rtfi.feed_id
    `;
    connection.query(query, (err, results) => {
      if (err) {
        console.error('피드 조회 실패:', err);
        return res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
      }
      res.json({ success: true, list: results });
    });
  })
  .post(upload.array('images'), (req, res) => {
    const { content } = req.body;
    const feedQuery = 'INSERT INTO rp_tbl_feed (userId_FC, content) VALUES (?, ?)';
    const userId = "test"; // 실제 사용자 ID로 대체 필요

    connection.query(feedQuery, [userId, content], (err, feedResult) => {
      if (err) {
        console.error('피드 등록 실패:', err);
        return res.status(500).json({ success: false, message: "피드 등록 실패" });
      }

      const feed_id = feedResult.insertId;
      const files = req.files;

      if (!files || files.length === 0) {
        return res.json({ success: true, message: "피드 등록 완료" });
      }

      const imgQuery = 'INSERT INTO rp_tbl_feed_img (feed_id, img_path) VALUES ?';
      const imgData = files.map(file => [feed_id, file.path]);

      connection.query(imgQuery, [imgData], (err) => {
        if (err) {
          console.error('이미지 저장 실패:', err);
          return res.status(500).json({ success: false, message: "이미지 저장 실패" });
        }

        res.json({ success: true, message: "피드 및 이미지가 성공적으로 저장되었습니다!" });
      });
    });
  });

// 피드 삭제 엔드포인트
router.route("/:id")
  .delete((req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM rp_tbl_feed WHERE id = ?';

    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error('피드 삭제 실패:', err);
        return res.status(500).json({ success: false, message: "DB 오류" });
      }
      res.json({ success: true, message: "삭제 완료!" });
    });
  });

// 좋아요 증가 엔드포인트
router.route("/like/:id")
  .put((req, res) => {
    const id = req.params.id;
    const query = 'UPDATE rp_tbl_feed SET favorite = favorite + 1 WHERE id = ?';

    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error('좋아요 증가 실패:', err);
        return res.status(500).json({ success: false, message: "DB 오류" });
      }
      res.json({ success: true, message: "좋아요 증가!" });
    });
  });

// router.route("/img/:imageName").get((req, res) => {
//   const imageName = req.params.imageName;
//   console.log(`Image requested: ${imageName}`); // 로그 확인
//   res.sendFile(path.join(__dirname, '../img', imageName));
// });
module.exports = router;
