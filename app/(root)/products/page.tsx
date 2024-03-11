import CategoryFilter from "@/components/shared/CategoryFilter"
import Collection from "@/components/shared/Collection"
import Search from "@/components/shared/Search"

const Products = () => {
    return (
        <>
            <section className="wrapper my-8 flex flex-col md:gap-12">
                <h2 className="h2-bold">Trusted by <br/> Thousands of Events</h2>
                <div className="flex w-full flex-col gap-5 md:flex-row">
                    <Search />
                    <CategoryFilter/>
                </div>
                {/* <Collection
                data={events?.data}
                emptyTitle="No Packages Found"
                emptyStateSubtext="Check later"
                collectionType="All_Events"
                limit={15}
                page={page}
                totalPages={events?.totalPages}
                /> */}
            </section>
            </>
    )
}

export default Products
