import React from 'react';
import { Container, Box } from '@mui/material';
import LoginForm from '@modules/auth/login/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ marginTop: 5 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <LoginForm />
      </Box>
    </Container>
  );
};

export default LoginPage;
