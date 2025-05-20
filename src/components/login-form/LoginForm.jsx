import React from 'react';
import { useForm } from 'react-hook-form';
import { InputBox, Button } from '../index';
import { authService } from '../../appwrite/auth';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router';
import { login as authLogin } from '../../redux/authSlice'

const LoginForm = () => {

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = React.useState('');

    const login = async (values) => {
        setError("");
        try {
            const session = await authService.login(values);
            if(session){
                const userData = await authService.getCurrentUser();
                if(userData){
                    dispatch(authLogin(userData))
                    navigate("/")
                }
            }
        } catch (error) {
            console.error("Login failed ::", error);
            setError(error);;
        } 
    }

    return (
            <div className='flex w-full items-center justify-center'>
                <div className='w-full bg-gray-100 mx-auto max-w-lg rounded-xl p-10 border border-black/10'>
                    <h2 className='text-center text-2xl font-bold'>Sign in to your account.</h2>
                </div>
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <InputBox 
                        label='Email'
                        type='email'
                        placeholder='Enter Email'
                        {...register('email',{
                            required: true,
                            validate : {
                                matchPattern: (value) => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.
                                    test(value) || "Email address must be a valid address"
                        }})}
                    />

                    <InputBox 
                        label='Password'
                        type='password'
                        placeholder='Enter Password'
                        {...register('password',{
                            required: true,
                            validate : {
                                matchPattern: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.
                                    test(value) || "Password must be at least 8 characters long and contain both letters and numbers"
                        }})}
                    />
                    {error && <p className='text-red-600 text-center'>{error}.</p>}

                    <Button type='submit'>Sign In</Button>
                </form>
                <div>Don't have an Account <Link to="/signup" className='duration-200 font-medium transition-all text-primary hover:underline'>Signup</Link></div>
            </div>

    )
}

export default LoginForm;