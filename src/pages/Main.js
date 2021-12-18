import { faComment, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Parse from 'parse/dist/parse.min.js';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import ChatCard from '../components/ChatCard';
import ContactSkeleton from '../components/ContactSkeleton';
import { setAuthStatus, setUser } from '../store/slices/userSlice';

export default function Main() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [chats, setChats] = useState(undefined);
    useEffect(() => {
        const query = new Parse.Query('Chat');
        // query.containedIn('users', [user.id]);
        query.find().then((response) => {
            setChats(response);
        });
    }, []);
    const handleLogout = () => {
        Parse.User.logOut();
        dispatch(setAuthStatus('INVALID'));
    }
    return (
        <React.Fragment>
            <div className='h-screen relative p-16 bg-gray-100'>
                <div className='bg-white shadow-md w-full h-full flex'>
                    <div className='w-60 bg-white h-full flex flex-col border-r border-gray-300'>
                        <div className='w-full h-16 bg-gray-200'>
                            <div className='flex justify-between items-center h-full p-4'>
                                <img src={Parse.User.current().get("imageUrl")} alt={Parse.User.current().get('name')} className='w-10 rounded-full' />
                                <div className='flex'>
                                    <FontAwesomeIcon icon={faComment} className='text-gray-400' />
                                    <FontAwesomeIcon icon={faSignOutAlt} className='text-gray-400 ml-4 cursor-pointer' onClick={handleLogout} />
                                </div>
                            </div>
                        </div>
                        <div className='relative flex items-center border-b border-gray-200 px-4'>
                            <FontAwesomeIcon icon={faSearch} className='absolute text-gray-400' />
                            <input type="text" className='w-full pl-6 bg-transparent h-12 outline-none text-sm text-gray-400' placeholder='Search for contacts' />
                        </div>
                        <div className='w-ful flex-1 overflow-auto'>
                            {
                                chats ? chats.length ? chats.map((item) => <ChatCard chat={item} />) : 'no contact' : Array.from(Array(5).keys()).map(() => <ContactSkeleton />)
                            }
                        </div>
                    </div>
                    {
                        <Outlet />
                    }
                </div>
            </div>
        </React.Fragment>
    )
}
