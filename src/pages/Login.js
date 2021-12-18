import React from 'react';
import logo from '../assets/logo.png';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { setAuthStatus, setUser } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import Parse from 'parse/dist/parse.min.js';

export default function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const onGoogleSuccess = async (response) => {
        const user = new Parse.User();
        user.set('username', response.profileObj.email);
        user.set('email', response.profileObj.email);
        user.set('name', response.profileObj.name);
        user.set('imageUrl', response.profileObj.imageUrl);
        try {
            await user.linkWith('google', {
                authData: { id: response.googleId, id_token: response.tokenId },
            });
            dispatch(setAuthStatus('VALID'));
            navigate('/');
        } catch {
            alert('error');
        }
    }

    const onGoogleFaild = (response) => {
        console.log(response);
    }

    return (
        <React.Fragment>
            <div className='h-screen flex justify-center items-center'>
                <div className='flex items-center flex-col'>
                    <div>
                        <img src={logo} alt="Whatsapp Logo" className='w-28 mb-4' />
                    </div>
                    <GoogleLogin
                        clientId="355099773482-gt2aiicupmumi36f4c2v4nre3lcgjnqd.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={onGoogleSuccess}
                        onFailure={onGoogleFaild}
                        cookiePolicy={'single_host_origin'}
                        render={renderProps => (
                            <button className='bg-green-500 text-white p-3 border-0 rounded-md transition-all hover:bg-green-600' onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google !</button>
                        )}
                    />
                </div>
            </div>
        </React.Fragment>
    )
}
