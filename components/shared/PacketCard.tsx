import { IPacket } from '@/lib/database/models/packet.model'
import Link from 'next/link'
import React from 'react'
import { auth } from '@clerk/nextjs'
import { DeleteConfirmation } from './DeleteConfirmation'
import Image from 'next/image'

type PacketProps = {
    item: IPacket,
    organized: boolean,
}

const PacketCard = ({ item, organized }: PacketProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    const isOrganizer = userId === item.organizer._id.toString();
    
    return (
        <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
        <Link 
            href={`/packets/${item._id}`}
            style={{backgroundImage: `url(${item.imageUrl})`}}
            className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
        />

        {/* IS PACKET ORGANIZER */}
        {isOrganizer && organized === true && (
            <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
                <Link href={`/packets/${item._id}/update`}>
                    <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
                </Link>
                <DeleteConfirmation itemId={item._id} deleteType="Packet"/>
            </div>
        )}

            <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"> 
                <div className="flex gap-2">
                    <span className="p-semibold-14 rounded-full bg-primary-200 px-4 py-1 text-primary-500">
                        Rp{parseInt(item.price).toLocaleString()}
                    </span>
                    <p className="p-semibold-14 rounded-full bg-primary-100 px-4 py-1 text-primary-400 line-clamp-1">
                        {item.category?.name}
                    </p>
                </div>
                <Link href={`/packets/${item._id}`}>
                    <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-primary-500">{item.title}</p>
                </Link>
                <p className="p-medium-14 md:p-medium-16 text-primary-500">{item.organizer.firstName} {item.organizer.lastName}</p>
                <p className="line-clamp-4 text-primary-500">{item.description}</p>
            </div>
        </div>
    )
}

export default PacketCard