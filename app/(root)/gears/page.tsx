import ProductCollection from "@/components/shared/ProductCollection"
import Search from "@/components/shared/Search"
import { getAllGears } from "@/lib/actions/gear.action"
import { SearchParamProps } from "@/types"

const Gears = async ({ searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    const category = (searchParams?.category as string) || '';
    
    const events = await getAllGears({
        query: searchText,
        category,
        page,
        limit: 15
    })

    return (
        <>
            <section className="wrapper my-8 flex flex-col md:gap-12">
                <div className="flex justify-between w-full py-5 flex-col sm:flex-row">
                    <h2 className="h2-bold">Trusted by <br/> Thousands of customers</h2>
                    <div className="py-4">
                        <Search placeholder="Search Product"/>
                    </div>
                </div>
                <ProductCollection
                    data={events?.data}
                    emptyTitle="No Product Found"
                    emptyStateSubtext="Check later"
                    collectionType="All_Products"
                    limit={15}
                    page={page}
                    totalPages={events?.totalPages}
                />
            </section>
            </>
    )
}

export default Gears
