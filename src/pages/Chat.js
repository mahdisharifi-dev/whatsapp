import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Parse from 'parse/dist/parse.min.js';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom";

export default function Chat() {
    const user = useSelector((state) => state.user.user);
    const [messages, setMessages] = useState(undefined);
    const [guest, setGuest] = useState(undefined);
    const params = useParams();
    useEffect(() => {
        const query = new Parse.Query('Chat');
        query.equalTo('objectId', params.id);
        query.first().then((response) => {
            const query2 = new Parse.Query('User');
            query2.contains('objectId', response.get('users').filter((item) => item !== user.id)[0]);
            query2.first().then((response2) => {
                setGuest(response2);
            });
        });
    }, []);
    return (
        <div className="flex-1 flex flex-col">
            <div className='w-full h-16 bg-gray-200'>
                <div className='flex justify-between items-center h-full p-4'>
                    {
                        guest && <div className="flex items-center">
                            <img src={guest.get('imageUrl')} alt={guest.get('name')} className='w-10 rounded-full mr-2' />
                            <span>{guest.get('name')}</span>
                        </div>
                    }
                    <div className='flex'>
                        <FontAwesomeIcon icon={faEllipsisV} className='text-gray-400' />
                    </div>
                </div>
            </div>
            <div className="overflow-auto flex-1">
                {
                    messages ? messages.lenght ? 'no chat' : messages.map((item) => <div>{item.message}</div>) : null
                }
            </div>
        </div>
    )
}