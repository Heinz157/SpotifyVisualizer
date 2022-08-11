import { ChevronDownIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const colors = [
    "from-red-500",
    "from-orange-500",
    "from-yellow-500",
    "from-green-500",
    "from-teal-500",
    "from-blue-500",
    "from-indigo-500",
    "from-purple-500",
    "from-pink-500",
];

function Center() {
    const { data: session } = useSession();

    useEffect(() => {
        
    })
    return (
        <div className="flex-grow text-white">
            <header className='absolute top-5 right-8'>
                <div className='flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
                    <img className="rounded-full w-10 h-10" src={session?.user.image} alt=""/>
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className='h-5 w-5'/>
                </div>
            </header>

            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black from-red-500 h-80 text-white padding-8`}>
                <h1>adsfa</h1>
            </section>
        </div>
    )
}

export default Center