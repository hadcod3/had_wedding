import CheckoutButton from '@/components/shared/CheckoutButton';
import GearCollection from '@/components/shared/GearCollection';
import { Input } from '@/components/ui/input';
import { getGearById, getRelatedGearsByCategory } from '@/lib/actions/gear.actions';
import { SearchParamProps } from '@/types'
import Image from 'next/image';
import { auth } from '@clerk/nextjs'

const GearDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
    const gear = await getGearById(id);

    const relatedGears = await getRelatedGearsByCategory({
        categoryId: gear.category._id,
        gearId: gear._id,
        page: searchParams.page as string,
    })

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    const isOrganizer = userId === gear.organizer._id.toString();

    return (
        <>
            <section className="flex justify-center bg-primary-100/30 bg-dotted-pattern bg-contain">
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
                    <Image 
                    src={gear.imageUrl}
                    alt="gear thumbnail"
                    width={1000}
                    height={1000}
                    className="h-full min-h-[300px] object-cover object-center"
                    />

                    <div className="flex w-full flex-col gap-8 p-5 md:p-10">
                    <div className="flex flex-col gap-6">
                        <h2 className='h2-bold'>{gear.title}</h2>
                        <h5 className='text-base text-slate-500'>Stock : {gear.stock}</h5>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <p className="text-4xl font-bold">
                                Rp {parseInt(gear.price).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {!isOrganizer && (
                        <CheckoutButton value={gear} buttonType="Gear" amount={2}/>
                    )}
                    <Input type='number' placeholder='pcs'/>
                
                    <div className="flex flex-col gap-2">
                        <p className="p-bold-20 text-grey-600">Description:</p>
                        <p className="p-medium-16 lg:p-regular-18">{gear.description}</p>
                        <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">{gear.url}</p>
                    </div>
                    </div>
                </div>
            </section>

            {/* Gears with the same category */}
            <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
            <h2 className="h2-bold">Related Gears</h2>

            <GearCollection 
                data={relatedGears?.data}
                emptyTitle="No Gears Found"
                emptyStateSubtext="Come back later"
                collectionType="All_Gears"
                limit={3}
                page={searchParams.page as string}
                totalPages={relatedGears?.totalPages}
                />
            </section>
        </>
    )
}

export default GearDetails