const express = require('express')
const router = express.Router();
const connection = require('../db');
const jwtAuthentication = require('../jwtAuth');

router.route("/")
  .get(jwtAuthentication, (req, res)=>{
      const query = 'SELECT * FROM TBL_FEED';
      connection.query(query, (err, results) => {
        if (err) {
          console.error('피드 조회 실패:', err);
          return res.json({ success: false, message: '서버 오류가 발생했습니다.' });
        }
        
        res.json({ success: true, list: results });
      });
  })
  
router.route("/:id")
  .delete((req, res)=>{
    const id = req.params.id;
    const query = 'DELETE FROM TBL_FEED WHERE id = ?';
  
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
        const query = 'UPDATE tbl_feed SET favorite = favorite + 1 WHERE id = ?';

        connection.query(query, [ id ], (err, results) => {
        if (err) {
        return res.json({success : false, message : "db 오류"});
        };
        res.json({success : true, message : "좋아요!!"});
    });
});

module.exports = router;