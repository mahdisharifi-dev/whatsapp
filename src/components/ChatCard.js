import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Parse from 'parse/dist/parse.min.js';
import ContactSkeleton from "./ContactSkeleton";

export default function ChatCard(props) {
    const [guest, setGuest] = useState(undefined);
    const user = useSelector((state) => state.user.user);
    useEffect(() => {
        const query = new Parse.Query('User');
        query.contains('objectId', props.chat.get('users').filter((item) => item !== user.id)[0]);
        query.first().then((response) => {
            setGuest(response);
        });
    }, [])
    return (
        <>
            {
                guest ? (
                    <Link to={'/chat/' + props.chat.id} key={guest.get('email')} className='px-4 py-3 cursor-pointer transition-all flex items-center border-b border-gray-200 hover:bg-gray-200'>
                        <img src={guest.get('imageUrl')} alt={guest.get('name')} className='w-10 rounded-full mr-2' />
                        <span className='text-gray-800 font-bold text-sm'>{guest.get('name')}</span>
                    </Link>
                ) : <ContactSkeleton />
            }
        </>
    )
}