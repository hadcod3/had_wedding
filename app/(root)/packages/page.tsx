
import CategoryFilter from "@/components/shared/CategoryFilter"
import Collection from "@/components/shared/Collection"
import Search from "@/components/shared/Search"
import { getAllEvents } from "@/lib/actions/event.actions"
import { SearchParamProps } from "@/types"

const Packages = async ({ searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    const category = (searchParams?.category as string) || '';
    
    const events = await getAllEvents({
        query: searchText,
        category,
        page,
        limit: 15
    })

    return (
        <>
            <section className="wrapper my-8 flex flex-col md:gap-12">
                <h2 className="h2-bold">Trusted by <br/> Thousands of Events</h2>
                <div className="flex w-full flex-col gap-5 md:flex-row">
                    <Search />
                    <CategoryFilter/>
                </div>
                <Collection
                data={events?.data}
                emptyTitle="No Packages Found"
                emptyStateSubtext="Check later"
                collectionType="All_Events"
                limit={15}
                page={page}
                totalPages={events?.totalPages}
                />
            </section>
        </>
    )
}

export default Packages
