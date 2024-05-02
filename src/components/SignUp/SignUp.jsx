
//forms
import { useForm } from 'react-hook-form';
import { useState } from 'react';
//mui
import { 
  Typography,
  Button, 
  TextField,
  FormControl,
  FormHelperText,
  InputLabel, 
  OutlinedInput, 
  IconButton, 
  InputAdornment,
  CssBaseline,
  Avatar,
  Paper,
  Box,
  Stack,
  Grid,
  CircularProgress,
} from '@mui/material';
//icons
import { 
  Visibility, 
  VisibilityOff,
} from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// route
import { NavLink, useNavigate  } from "react-router-dom";
//auth
import { useAuth } from "../../hooks/Context/AuthProvider/useAuth";
//img
import imgLeft from "../../assets/pexels-selim-can-ik-5860937.jpg";
//util
import { validateUserName, validateEmail } from '../../util/util';


const changeTextFieldStyles = (isErrorMessageExists) => ({
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: isErrorMessageExists ? '#f44336' : '#858585',
  },
  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: isErrorMessageExists ? '#f44336' : '#f2f0f0',
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: isErrorMessageExists ? '#f44336' : '#f2f0f0',
  },
  "& .MuiInputLabel-outlined.Mui-focused": {
    color: isErrorMessageExists ? '#f44336' : '#f2f0f0',
  },
  "& .MuiFormHelperText-root.Mui-focused": {
    color: isErrorMessageExists ? '#f44336' : '#f2f0f0',
  },
  "& .MuiInputLabel-asterisk": {
    color: isErrorMessageExists ? '#f44336' : '#f2f0f0',
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: isErrorMessageExists ? '#f44336' : '#f2f0f0',
  },
  "& .MuiInputBase-input.MuiOutlinedInput-input": {
    color: isErrorMessageExists ? '#f44336' : '#f2f0f0',
  },
  "& .MuiInputBase-input::placeholder": {
    color: isErrorMessageExists ? '#f44336' : '#f2f0f0',
  },
  "& .MuiInputLabel-formControl" : {
    color: isErrorMessageExists ? '#f44336' : '#f2f0f0',
  },
  "& .MuiSvgIcon-root": {
    color: isErrorMessageExists ? '#f44336' : '#f2f0f0',
  }
});


const SignUp = () => {
  
  const [showPassword, setShowPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);

  const { 
    register, 
    handleSubmit,
    formState: {
      errors, isSubmitting
    },
    watch
  } = useForm();

  const password = watch("password");

  const navigate = useNavigate();

  const auth = useAuth();

  const onSubmit = async (formData) => {
    try {
      //const response = await api.post('/api/v1/auth/register', formData);
      
      const response = await auth.register(
        formData.name,
        formData.userName,
        formData.email,
        formData.password,
        formData.confirmPassword
      );
      console.log(response);
      //setError(false);

      navigate('/login'); // Navigate to login page

    } catch (error) {
      //setError(true);
      console.log("Erro ao fazer o registro.", error);
      //navigate('/error');
    }
  }


  return (
    <Grid container 
      component="main" 
      sx={{ 
        height: '100vh', 
        backgroundColor: "#141414", 
      }}
    >
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${imgLeft})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} 
        component={Paper} 
        elevation={6} 
        square 
        sx={{ 
          padding: "0 2rem 0",
          backgroundColor: "#141414", 
          color: "#f2f0f0",
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, backgroundColor: "#F75F01" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography variant="h5" component="h1" align="center" mt={3} gutterBottom>
            Crie sua conta no <span style={{ fontWeight: 'bold' }}>StockMaster</span>
          </Typography>

          <form noValidate onSubmit={handleSubmit(onSubmit)} style={{ mt: 1 }} autoComplete="off">
            <TextField
              fullWidth
              required
              margin="normal"
              label="Nome"
              name="name"
              autoComplete="name"
              autoFocus
              sx={ changeTextFieldStyles(Boolean(errors?.name?.message)) }
              error={Boolean(errors?.name?.message)}
              helperText={errors?.name?.message}
              {...register("name", 
                { 
                  required: {
                    value: true,
                    message: "Nome é obrigatório.",
                  },
                  minLength: {
                    value: 3,
                    message: "Nome precisa ter mais de 3 letras."
                  },
                  maxLength: {
                    value: 40,
                    message: "Nome ultrapassou o limite de caracteres."
                  },
                })
              }
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Nome de Usuário"
              name="userName"
              autoComplete="name"
              sx={ changeTextFieldStyles(Boolean(errors?.userName?.message)) }
              error={Boolean(errors?.userName?.message)}
              helperText={errors?.userName?.message}
              {...register("userName", 
                { 
                  required: {
                    value: true,
                    message: "Nome de Usuário é obrigatório.",
                  },
                  minLength: {
                    value: 3,
                    message: "Nome de Usuário precisa ter mais de 3 letras."
                  },
                  maxLength: {
                    value: 40,
                    message: "Nome de Usuário ultrapassou o limite de caracteres."
                  },
                  validate: async (value) => {
                    const exists = await validateUserName(value);
                    return !exists || "Este nome de Usuário já existe.";
                  }
                })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              autoComplete="new-password"
              sx={ changeTextFieldStyles(Boolean(errors?.email?.message)) }
              error={Boolean(errors?.email)}
              helperText={errors?.email?.message}
              {...register("email", 
                {
                  required: {
                    value: true,
                    message: "Email é obrigatório." 
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/,
                    message: "Email não é válido. O email digitado precisa ser como example@email.com",
                  },
                  validate: async (value) => {
                    const exists = await validateEmail(value);
                    return !exists || "Este email já existe.";
                  }
                }
            )}
            />
            <FormControl 
              sx={{ 
                ...changeTextFieldStyles(Boolean(errors?.password?.message)), 
                mt: 2, 
                width: '100%' 
              }} 
            >
              <InputLabel htmlFor="outlined-adornment-password" required>Senha</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                label="Senha"
                name="password"
                autoComplete="password"
                error={Boolean(errors?.password)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                {...register("password", { 
                  required: "Senha é obrigatória.",
                  minLength: { 
                    value: 6, 
                    message: "Senha deve ter no mínimo 6 caracteres." 
                  },
                  maxLength: { 
                    value: 15,
                    message: "Senha deve ter no máximo 15 caracteres."
                  }
                })}
              />
            </FormControl>
            {errors?.password && (
              <FormHelperText sx={{ ml: 2 }} error>{errors?.password?.message}</FormHelperText>
            )}
            <FormControl 
              sx={{ 
                ...changeTextFieldStyles(Boolean(errors?.confirmPassword?.message)), 
                mt: 2, 
                width: '100%' 
              }} 
              variant="outlined"  
            >
              <InputLabel htmlFor="outlined-adornment-password" required>Confirmar Senha</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showSecondPassword ? 'text' : 'password'}
                name="confirmPassword"
                label="Confirmar Senha"
                autoComplete="new-password"
                error={Boolean(errors?.confirmPassword)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowSecondPassword(!showSecondPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showSecondPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                {...register("confirmPassword", { 
                  required: {
                    value: true ,
                    message: "Confirmação de Senha é obrigatória.",
                  },
                  validate: value => value === password || "As senhas não coincidem."
                })}
              />
            </FormControl>
            {errors?.confirmPassword && (
              <FormHelperText sx={{ ml: 2 }} error>{errors?.confirmPassword?.message}</FormHelperText>
            )}

            <Button
              sx={{ 
                mt: 3, 
                mb: 2,
              }}
              variant="contained"
              fullWidth
              type="submit"
              style={{
                textTransform: 'none',
                fontSize: "1.1rem",
                fontWeight: 'bold',
                backgroundColor: "#E07D15",
              }}
              disabled={isSubmitting}
            >
              {
                isSubmitting ? <CircularProgress color="inherit" size={24} /> : "Cadastrar"
              }
            </Button>
            <Stack mt={2}>
              <Typography variant="p" align="center" gutterBottom>
                Já tem uma conta? 
                <Button
                  component={NavLink}
                  to="/login"
                  sx={{
                    textDecoration: "underline",
                    textTransform: 'none', 
                    color: '#f2f0f0',
                    '&:hover': {
                      textDecoration: "underline",
                      color: '#E07D15',
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  Entrar
                </Button>
              </Typography>
            </Stack>

          </form>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SignUp;