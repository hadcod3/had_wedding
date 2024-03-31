import CheckoutButton from '@/components/shared/CheckoutButton';
import Collection from '@/components/shared/PacketCollection';
import { getPacketById, getRelatedPacketsByCategory } from '@/lib/actions/packet.actions'
import { SearchParamProps } from '@/types'
import Image from 'next/image';

const PackageDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
    const packet = await getPacketById(id);

    const relatedPackets = await getRelatedPacketsByCategory({
        categoryId: packet.category._id,
        packetId: packet._id,
        page: searchParams.page as string,
    })

    return (
        <>
            <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
                    <Image 
                    src={packet.imageUrl}
                    alt="packet thumbnail"
                    width={1000}
                    height={1000}
                    className="h-full min-h-[300px] object-cover object-center"
                />

                <div className="flex w-full flex-col gap-8 p-5 md:p-10">
                    <div className="flex flex-col gap-6">
                        <h2 className='h2-bold'>{packet.title}</h2>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="flex gap-3">
                                <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                                    Rp{parseInt(packet.price).toLocaleString()}
                                </p> 
                                <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                                    {packet.category.name}
                                </p>
                            </div>
                        </div>
                    </div>

                <CheckoutButton value={packet} buttonType="Packet" />

                <div className="flex flex-col gap-2">
                    <p className="p-bold-20 text-grey-600">Description:</p>
                    <p className="p-medium-16 lg:p-regular-18">{packet.description}</p>
                    <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">{packet.url}</p>
                </div>
            </div>
        </div>
            </section>

            {/* Packets with the same category */}
            <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
            <h2 className="h2-bold">Related Packets</h2>

            <Collection 
                data={relatedPackets?.data}
                emptyTitle="No Packets Found"
                emptyStateSubtext="Come back later"
                collectionType="All_Events"
                limit={3}
                page={searchParams.page as string}
                totalPages={relatedPackets?.totalPages}
                />
            </section>
        </>
    )
}

export default PackageDetails