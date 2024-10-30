const express = require('express');
const router = express.Router();
const connection = require('../db');
const jwtAuthentication = require('../jwtAuth');
const multer = require('multer');
const path = require('path');

// 댓글 작성
router.route("/comment")
  .post((req, res) => {
    const { postId, userId, comment } = req.body;
    const query = 'INSERT INTO rp_tbl_comment(postId_cc, userId_cc, comment) VALUES(?,?,?)';

    connection.query(query, [postId, userId, comment], (err, results) => {
      if (err) {
        return res.json({ success: false, message: "db 오류" });
      }
      res.json({ success: true, message: '댓글 저장 완료!' });
    });
  });

// 특정 게시물의 댓글 조회
router.route("/comment/:postId")
  .get((req, res) => {
    const postId = req.params.postId;
    const query = `
     SELECT * FROM rp_tbl_comment rtc
    INNER JOIN rp_tbl_user rtu
    ON rtc.userId_CC = rtu.userId
    WHERE postId_cc = ?
    ORDER BY created_C DESC
    `;
    console.log(postId);
    connection.query(query, [postId], (err, results) => {
      if (err) {
        console.error("댓글 조회 실패:", err);
        return res.status(500).json({ success: false, message: "서버 오류가 발생했습니다." });
      }
      res.json({ success: true, comments: results });
    });
  });

// 파일 저장 경로 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../img'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

// 정적 파일 제공 설정
router.use('/img', express.static(path.join(__dirname, '../img')));

// 피드 조회 및 생성
router.route("/")
  .post(upload.array('images'), (req, res) => {
    const { content, userId } = req.body;
    const feedQuery = 'INSERT INTO rp_tbl_feed (userId_FC, content) VALUES (?, ?)';

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
  })
  .get(jwtAuthentication, (req, res) => {
    const query = `
     SELECT rtf.*, GROUP_CONCAT(rtfi.img_path) AS img_paths , rtu.username
      FROM rp_tbl_feed rtf
      LEFT JOIN rp_tbl_feed_img rtfi ON rtf.id = rtfi.feed_id
      INNER JOIN rp_tbl_user rtu ON rtf.userId_FC = rtu.userId
      GROUP BY rtf.id,rtu.username
    `;
    connection.query(query, (err, results) => {
      if (err) {
        console.error('피드 조회 실패:', err);
        return res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
      }
      res.json({ success: true, list: results });
    });
  });

// 피드 삭제
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

// 좋아요 증가
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

module.exports = router;
