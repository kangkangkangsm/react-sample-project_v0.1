const express = require('express')
const router = express.Router();
const connection = require('../db');
const jwtAuthentication = require('../jwtAuth');

router.route("/")
  .get(jwtAuthentication, (req, res)=>{
      const query = 'SELECT * FROM rp_TBL_FEED';
      connection.query(query, (err, results) => {
        if (err) {
          console.error('피드 조회 실패:', err);
          return res.json({ success: false, message: '서버 오류가 발생했습니다.' });
        }
        
        res.json({ success: true, list: results });
      });
  })
  .post((req, res) => {
    const { content,userId } = req.body; // 피드의 내용

    // 피드 먼저 등록
    const feedQuery = 'INSERT INTO tbl_feed (userId, content) VALUES (?, ?)';


    connection.query(feedQuery, [userId, content], (err, feedResult) => {
      if (err) {
        console.error('피드 등록 실패:', err);
        return res.json({ success: false, message: "피드 등록 실패" });
      }

      const feed_id = feedResult.insertId; // 등록된 피드의 ID 가져오기

      // 이제 이미지를 등록할 차례
      // const files = req.files;

      // if (!files || files.length === 0) {
      //   return res.json({ success: false, message: "파일이 업로드되지 않았습니다." });
      // }

      // // 이미지 경로들을 DB에 저장
      // const imgQuery = 'INSERT INTO tbl_feed_img (feed_id, img_path) VALUES ?';
      // const imgData = files.map(file => [feed_id, file.path]);

      // connection.query(imgQuery, [imgData], (err, imgResult) => {
      //   if (err) {
      //     console.error('이미지 저장 실패:', err);
      //     return res.status(500).json({ success: false, message: "이미지 저장 실패" });
      //   }

      //   res.json({ success: true, message: "피드 및 파일이 성공적으로 저장되었습니다!" });
      // });
    });
  });

router.route("/:id")
  .delete((req, res)=>{
    const id = req.params.id;
    const query = 'DELETE FROM rp_TBL_FEED WHERE id = ?';
  
    connection.query(query, [ id ], (err, results) => {
      if (err) {
        return res.json({success : false, message : "db 오류"});
      };
      res.json({success : true, message : "삭제 됨!"});
    });
  });

router.route("/like/:id")
    .put((req, res)=>{
        const id = req.params.id;
        const query = 'UPDATE rp_tbl_feed SET favorite = favorite + 1 WHERE id = ?';

        connection.query(query, [ id ], (err, results) => {
        if (err) {
        return res.json({success : false, message : "db 오류"});
        };
        res.json({success : true, message : "좋아요!!"});
    });
});

module.exports = router;