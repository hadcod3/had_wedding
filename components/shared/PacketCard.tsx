import { IPacket } from '@/lib/database/models/packet.model'
import Link from 'next/link'
import React from 'react'

type CardProps = {
  item: IPacket
}

const Card = ({ item }: CardProps) => {

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link 
        href={`/packets/${item._id}`}
        style={{backgroundImage: `url(${item.imageUrl})`}}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />

      <div
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
      > 
        <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-primary-200 px-4 py-1 text-primary-500">
                Rp{parseInt(item.price).toLocaleString()}
            </span>
            <p className="p-semibold-14 w-min rounded-full bg-primary-100 px-4 py-1 text-primary-400 line-clamp-1">
                {item.category?.name}
            </p>
        </div>

        <Link href={`/packets/${item._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1  text-primary-500">{item.title}</p>
        </Link>

        <p className="line-clamp-4 text-primary-500">
            {item.description}
        </p>

      </div>
    </div>
  )
}

export default Card