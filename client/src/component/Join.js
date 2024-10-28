import React, { useRef, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Join() {
  const userIdRef = useRef();
  const emailRef = useRef();
  const pwdRef = useRef();
  const confirmPwdRef = useRef();
  const nameRef = useRef();
  const [userId, setUserId] = useState('');
  const [userPwd, setUserPwd] = useState('');
  const [userIdError, setUserIdError] = useState('');
  const [userPwdError, setUserPwdError] = useState('');
  const [userPwdCheck, setUserPwdCheck] = useState('');
  const [userPwdCHeckError, setuserPwdCHeckError] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userEmailError, setuserEmailError] = useState('');
  const [join2, setJoin2] = useState(1);
  const navigate = useNavigate();
  
//회원가입 
async function fnJoin() {
  const name = nameRef.current.value;
  if(!userId || userIdError){
    alert("아이디 확인하세요");
    userIdRef.current.focus();
    return;
  }
  if(!userPwd || userPwdError){
    alert("비밀번호 확인하세요");
    pwdRef.current.focus(); 
    return;
  }
  if(!userPwdCheck || userPwdCHeckError){
    alert("비밀번호 일치가 확인되지 않습니다. ");
    confirmPwdRef.current.focus();
    return;
  }
  if(!name){
    alert('이름 입력하세요.');
    nameRef.current.focus();
    return;
  }
  if(!userEmail || userEmailError){
    alert("이메일 확인하세요.");
    emailRef.current.focus();
    return;
  }
  try {
    const res = await axios.post("http://localhost:3100/user/join", {userId,password : userPwd, email : userEmail, username : name});
    if (res.data.success) {
      alert("회원가입에 성공하셨습니다. 로그인페이지로 이동합니다."); 
      navigate("/login");
    } else {
      alert("회원가입 실패!");
    }
  } catch (error) {
    console.log("서버 호출 중 오류 발생");
  }
}

// 아이디 체크 
async function fnIdCheck(e) {
  const newUserId = e.target.value; 
  setUserId(newUserId); 
  const idPattern = /^[A-Za-z0-9]+$/;
  if (newUserId.length < 6) {
    setUserIdError("아이디는 6자 이상이어야 합니다."); 
    return;
  }else{
    if (!idPattern.test(newUserId)) {
      setUserIdError("아이디는 영어와 숫자만 사용할 수 있습니다."); 
      return;
    }
    try {
      const res = await axios.post("http://localhost:3100/user/check/id", { userId: newUserId});
      setUserIdError(res.data.message); 
    } catch (error) {
      console.log("서버 호출 중 오류 발생");
    }
  }
}
// 이메일 체크 
async function fnUserEmail(e) {
  const newEmail = e.target.value;
  setUserEmail(newEmail); 
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;// 이메일 정규 표현식
  if (!emailPattern.test(newEmail)) {
    setuserEmailError("유효한 이메일 주소를 입력하세요."); 
    return;
  }
  try {
      const res = await axios.post("http://localhost:3100/user/check/email", { email: newEmail});
      setuserEmailError(res.data.message); 
    } catch (error) {
      console.log("서버 호출 중 오류 발생");
    }
  }
// 비밀번호 체크 
async function fnPwdCheck(e) {
  const pwdPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
  const newUserPwd = e.target.value;
  setUserPwd(newUserPwd);
  if (newUserPwd.length < 8) {
    setUserPwdError("비밀번호는 8자 이상이어야 합니다.");
    return;
  }else{
    if (!pwdPattern.test(newUserPwd)) {
      setUserPwdError("비밀번호는 영어, 숫자, 특수문자를 포함해야 합니다.");
      return;
    }
    setUserPwdError("");
  }
}

// 비밀번호 같은지 체크 
async function fnPwdSameCheck(e) {
  const newUserPwdCheck = e.target.value; 
  setUserPwdCheck(newUserPwdCheck); 
  if (newUserPwdCheck.length >= 8 && (userPwd !== newUserPwdCheck)) {
    setuserPwdCHeckError("비밀번호가 서로 다릅니다.");
  } else {
    setuserPwdCHeckError(""); 
  }
}

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{ padding: 3 }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '400px',
          padding: '20px',
          backgroundColor: '#fff',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px'
        }}
      >
        <Typography variant="h4" mb={3} align="center">
          회원가입
        </Typography>
        <TextField
          inputRef={userIdRef} label="아이디" variant="outlined" fullWidth margin="normal" value={userId} onChange={fnIdCheck}
          error={!!userIdError} helperText={userIdError}
        />
        <TextField inputRef={pwdRef} label="비밀번호" variant="outlined" type="password" value={userPwd} fullWidth margin="normal" onChange={fnPwdCheck}
         error={!!userPwdError} helperText={userPwdError}/>
        <TextField inputRef={confirmPwdRef} label="비밀번호 확인" variant="outlined" value={userPwdCheck} onChange={fnPwdSameCheck} type="password" fullWidth margin="normal" 
        error={!!userPwdCHeckError} helperText={userPwdCHeckError}/>
        <TextField inputRef={nameRef} label="이름" variant="outlined" type="text" fullWidth margin="normal" />
        <TextField inputRef={emailRef} label="이메일" variant="outlined" value={userEmail} onChange={fnUserEmail} type="text" fullWidth margin="normal"
        error={!!userEmailError} helperText={userEmailError}/>
        <Button onClick={fnJoin} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          회원가입
        </Button>
        <Typography mt={2} align="center">
          이미 계정이 있으신가요? <a href="/login">로그인</a>
        </Typography>
      </Box>
    </Box>
  );
}

export default Join;
