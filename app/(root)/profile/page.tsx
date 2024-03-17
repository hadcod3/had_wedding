import { Button } from '@/components/ui/button'
// import { getOrdersByUser } from '@/lib/actions/order.actions'
import { SearchParamProps } from '@/types'
// import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const Profile = () => {
//   const { sessionClaims } = auth();
//   const userId = sessionClaims?.userId as string;

//   const ordersPage = Number(searchParams?.ordersPage) || 1;
//   const packetsPage = Number(searchParams?.packetsPage) || 1;

//   const orders = await getOrdersByUser({ userId, page: ordersPage})

  return (
    <>
        <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
            <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
            <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#packets">
                Explore More Packets
            </Link>
            </Button>
        </div>
        </section>
    </>
  )
}

export default Profile