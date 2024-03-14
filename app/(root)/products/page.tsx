
import ProductCollection from "@/components/shared/ProductCollection"
import Search from "@/components/shared/Search"
import { getAllProducts } from "@/lib/actions/product.action"
import { SearchParamProps } from "@/types"

const Products = async ({ searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    const category = (searchParams?.category as string) || '';
    
    const events = await getAllProducts({
        query: searchText,
        category,
        page,
        limit: 15
    })

    return (
        <>
            <section className="wrapper my-8 flex flex-col md:gap-12">
                <h2 className="h2-bold">Trusted by <br/> Thousands of Events</h2>
                <div className="w-full py-5">
                    <Search placeholder="Search Product"/>
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

export default Products