import GearCollection from '@/components/shared/GearCollection'
import PacketCollection from '@/components/shared/PacketCollection'
import ProductCollection from '@/components/shared/ProductCollection'
import { Button } from '@/components/ui/button'
import { getGearsByUser } from '@/lib/actions/gear.actions'
import { getOrdersByUser } from '@/lib/actions/order.actions'
import { getPacketsByUser } from '@/lib/actions/packet.actions'
import { getProductsByUser } from '@/lib/actions/product.actions'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const Profile = async ({ searchParams }: SearchParamProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const ordersPage = Number(searchParams?.ordersPage) || 1;
    const packetsPage = Number(searchParams?.packetsPage) || 1;
    const productsPage = Number(searchParams?.productsPage) || 1;
    const gearsPage = Number(searchParams?.gearsPage) || 1;
    const orders = await getOrdersByUser({ userId, page: ordersPage})
    const organizedPackets = await getPacketsByUser({ userId, page: packetsPage })
    const organizedProducts = await getProductsByUser({ userId, page: productsPage })
    const organizedGears = await getGearsByUser({ userId, page: gearsPage })

    return (
        <>
            {/* PACKETS CONTAINER START */}
            
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <div className="wrapper flex items-center justify-center sm:justify-between">
                    <h3 className='h3-bold text-center sm:text-left'>Packets Organized</h3>
                    <Button asChild size="lg" className="button bg-primary-400 hidden sm:flex">
                        <Link href="/packets/create">
                            Packet +
                        </Link>
                    </Button>
                </div>
            </section>

            <section className="wrapper my-8">
                <PacketCollection 
                data={organizedPackets?.data}
                emptyTitle="No packets have been created yet"
                emptyStateSubtext="Go create some now"
                collectionType="Packets_Organized"
                limit={3}
                page={packetsPage}
                urlParamName="packetsPage"
                totalPages={organizedPackets?.totalPages}
                />
            </section>
            
            {/* PACKETS CONTAINER END*/}

            {/* PRODUCTS CONTAINER START */}
            
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <div className="wrapper flex items-center justify-center sm:justify-between">
                    <h3 className='h3-bold text-center sm:text-left'>Products Organized</h3>
                    <Button asChild size="lg" className="button bg-primary-400 hidden sm:flex">
                        <Link href="/products/create">
                            Product +
                        </Link>
                    </Button>
                </div>
            </section>

            <section className="wrapper my-8">
                <ProductCollection 
                data={organizedProducts?.data}
                emptyTitle="No products have been created yet"
                emptyStateSubtext="Go create some now"
                collectionType="Products_Organized"
                limit={5}
                page={productsPage}
                urlParamName="productsPage"
                totalPages={organizedProducts?.totalPages}
                />
            </section>

            {/* PRODUCTS CONTAINER END*/}

            {/* GEARS CONTAINER START */}
            
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <div className="wrapper flex items-center justify-center sm:justify-between">
                    <h3 className='h3-bold text-center sm:text-left'>Gears Organized</h3>
                    <Button asChild size="lg" className="button bg-primary-400 hidden sm:flex">
                        <Link href="/gears/create">
                            Gear +
                        </Link>
                    </Button>
                </div>
            </section>

            <section className="wrapper my-8">
                <GearCollection 
                data={organizedGears?.data}
                emptyTitle="No gears have been created yet"
                emptyStateSubtext="Go create some now"
                collectionType="Gears_Organized"
                limit={5}
                page={gearsPage}
                urlParamName="gearsPage"
                totalPages={organizedGears?.totalPages}
                />
            </section>

            {/* GEARS CONTAINER END*/}
        </>
    )
}

export default Profile

