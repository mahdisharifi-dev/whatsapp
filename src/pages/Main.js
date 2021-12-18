import { faComment, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Parse from 'parse/dist/parse.min.js';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import { setAuthStatus, setUser } from '../store/slices/userSlice';

export default function Main(props) {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [users, setUsers] = useState(undefined);
    useEffect(() => {
        const query = new Parse.Query('User');
        query.find().then((response) => {
            setUsers(response.filter((item) => item.get('username') !== user.email));
        })
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('GOOGLE-OAUTH-TOKEN');
        dispatch(setUser(null));
        dispatch(setAuthStatus('INVALID'));
    }
    return (
        <React.Fragment>
            <div className='h-screen relative p-16 bg-gray-100'>
                <div className='bg-white shadow-md w-full h-full flex'>
                    <div className='w-60 bg-white h-full flex flex-col'>
                        <div className='w-full h-16 bg-gray-200'>
                            <div className='flex justify-between items-center h-full p-4'>
                                <img src={user.imageUrl} alt={user.name} className='w-10 rounded-full' />
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
                                users ? users.length ? users.map((item) => (
                                    <div key={item.get('username')} className='px-4 py-3 cursor-pointer transition-all flex items-center border-b border-gray-200 hover:bg-gray-200'>
                                        <img src={item.get('imageUrl')} alt={item.get('imageUrl')} className='w-10 rounded-full mr-2' />
                                        <span className='text-gray-800 font-bold text-sm'>{item.get('name')}</span>
                                    </div>
                                )) : 'no contact' : 'loading'
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
