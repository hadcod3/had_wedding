import PacketCategoryFilter from "@/components/shared/PacketCategoryFilter"
import Collection from "@/components/shared/PacketCollection"
import Search from "@/components/shared/Search"
import { getAllPackets } from "@/lib/actions/packet.actions"
import { SearchParamProps } from "@/types"

const Packets = async ({ searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    const category = (searchParams?.category as string) || '';
    
    const packets = await getAllPackets({
        query: searchText,
        category,
        page,
        limit: 15 
    })

    return (
        <>
            <section className="wrapper my-8 flex flex-col md:gap-12">
                <h2 className="h2-bold">Trusted by <br/> Thousands of Customers</h2>
                <div className="flex w-full flex-col gap-5 py-5 md:flex-row">
                    <Search placeholder="Search Packets"/>
                    <PacketCategoryFilter/>
                </div>
                <Collection
                data={packets?.data}
                emptyTitle="No Packets Found"
                emptyStateSubtext="Check later"
                collectionType="All_Events"
                limit={15}
                page={page}
                totalPages={packets?.totalPages}
                />
            </section>
        </>
    )
}

export default Packets
