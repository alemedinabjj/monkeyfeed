import styles from './Login.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { api } from '../lib/api';
import { useNavigate } from "react-router-dom";

const schemaLogin = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: yup.string().required('Senha obrigatória'),
});

interface LoginData {
  email: string;
  password: string;
}

export function Login() {
  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(schemaLogin)
  })

  const navigate = useNavigate();

  const handleLoginData: SubmitHandler<LoginData> = async (data) => {
    console.log(data)
    const response = await api.post('/auth/login', data)

    const { token } = response.data

    if (token) {
      localStorage.setItem('@token-monkey', token)
      navigate('/')
      return 
    }

    
    console.log(response)

  }

  return (
    <form
      className={styles.formLogin}
      onSubmit={handleSubmit(handleLoginData)}
    >
      <input type='email' placeholder='E-mail'
        {...register('email')}
      />
      <input type='password' placeholder='Senha' 
        {...register('password')}
      />

      <button type='submit'>
        Entrar
      </button>
    </form>
  )
}