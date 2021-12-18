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
import { setAuthStatus } from './store/slices/userSlice';
import Chat from './pages/Chat';
import Intro from './pages/Intro';
import Parse from 'parse/dist/parse.min.js';

export default function Whatsapp() {

    const authStatus = useSelector((state) => state.user.authStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!Parse.User.current()) {
            dispatch(setAuthStatus('INVALID'));
        } else {
            dispatch(setAuthStatus('VALID'));
        }
    }, []);

    return (
        <Router>
            {
                authStatus === 'PENDING' ? 'loading' : (
                    <Routes>
                        {authStatus === 'INVALID' && (
                            <>
                                <Route path='/login' element={<Login />} />
                                <Route path="*" element={<Navigate to='/login' />} />
                            </>
                        )}
                        {authStatus === 'VALID' && (
                            <>
                                <Route path="/" element={<Main />}>
                                    <Route path="/" element={<Intro />} />
                                    <Route path="/chat/:id" element={<Chat />} />
                                </Route>
                                <Route path="/login" element={<Navigate to='/' />} />
                            </>
                        )}
                    </Routes>
                )
            }
        </Router>
    )
}
