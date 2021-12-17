import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
    Navigate
} from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import { GoogleLogin } from 'react-google-login';
import { setAuthStatus, setUser } from './store/slices/userSlice';

export default function Whatsapp() {

    const authStatus = useSelector((state) => state.user.authStatus);

    const dispatch = useDispatch();
    // const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('GOOGLE-OAUTH-TOKEN')) {
            dispatch(setAuthStatus('INVALID'));
            // navigate('/login');
        }
    })

    const onGoogleSuccess = (response) => {
        const { googleId, name, email, imageUrl } = response.profileObj;
        console.log(response)
        dispatch(setUser({
            googleId,
            name,
            email,
            imageUrl
        }));
        dispatch(setAuthStatus('VALID'))
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
                        {authStatus === 'INVALID' && <Route path={'/login'} element={Login} />}
                        {/* {authStatus === 'INVALID' && <Route path="/" render={() => <Navigate to="/login" replace />} />} */}
                        {
                            authStatus === 'VALID' && <Route path="/" element={<Main />} />
                        }
                    </Routes>
                )
            }

        </Router>
    )
}
