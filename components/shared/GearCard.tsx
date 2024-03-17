import { IGear } from '@/lib/database/models/gear.model'
import Link from 'next/link'
import React from 'react'

type CardProps = {
  event: IGear
}

const GearCard = ({ event }: CardProps) => {

  return (
    <div className="relative flex min-h-[270px] w-[180px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg ">
      <Link 
        href={`/gears/${event._id}`}
        style={{backgroundImage: `url(${event.imageUrl})`}}
        className="flex-center flex-grow bg-gray-50 bg-contain bg-no-repeat bg-center text-grey-500 w-full max-h-[180px]"
      />

      <div className="flex max-h-[130px] flex-col gap-1 p-2 md:gap-1"> 
        <Link href={`/gears/${event._id}`}>
          <p className="p-medium-16 line-clamp-1 flex-1 text-black">{event.title}</p>
        </Link>

        <span className="font-semibold text-base">
            Rp {parseInt(event.price).toLocaleString()}
        </span>

        <div className="flex-between w-full">
          <p className="p-medium-14 text-grey-600">
            Stock: {event.stock}
          </p>
        </div>
      </div>
    </div>
  )
}

export default GearCard