import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import { GoogleLogin } from 'react-google-login';
import { setAuthStatus, setUser } from './store/slices/userSlice';
import Chat from './pages/Chat';
import Intro from './pages/Intro';

export default function Whatsapp() {

    const authStatus = useSelector((state) => state.user.authStatus);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!localStorage.getItem('GOOGLE-OAUTH-TOKEN')) {
            dispatch(setAuthStatus('INVALID'));
        }
    })

    const onGoogleSuccess = (response) => {
        dispatch(setUser(response.profileObj));
        dispatch(setAuthStatus('VALID'));
    }

    const onGoogleFaild = (response) => {
        console.log(response);
    }
    return (
        <Router>
            <GoogleLogin
                clientId="355099773482-gt2aiicupmumi36f4c2v4nre3lcgjnqd.apps.googleusercontent.com"
                onSuccess={onGoogleSuccess}
                onFailure={onGoogleFaild}
                cookiePolicy={'single_host_origin'}
                render={renderProps => null}
                isSignedIn={true}
            />

            {
                authStatus === 'PENDING' ? 'loading' : (
                    <Routes>
                        {authStatus === 'INVALID' && <Route path='/login' element={<Login />} />}
                        {authStatus === 'INVALID' && <Route path="*" element={<Navigate to='/login' />} />}
                        {authStatus === 'VALID' && (
                            <Route path="/" element={<Main />}>
                                <Route path="/" element={<Intro />} />
                                <Route path="/chat" element={<Chat />} />
                            </Route>
                        )}
                    </Routes>
                )
            }

        </Router>
    )
}
