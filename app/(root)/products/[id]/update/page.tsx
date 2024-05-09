import AbandonedPage from "@/components/shared/AbandonedPage";
import ProductForm from "@/components/shared/ProductForm"
import { getProductById } from "@/lib/actions/product.actions"
import { auth } from "@clerk/nextjs";

type UpdateProductProps = {
    params: {
        id: string
    }
}

const UpdateProduct = async ({ params: { id } }: UpdateProductProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    const product = await getProductById(id)

    return (
        <>
            { product.organizer._id !== userId ? (
                <AbandonedPage/>
            ) : (
                <>
                    <div className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                        <h3 className="wrapper h3-bold text-center sm:text-left">Update Product</h3>
                    </div>
        
                    <div className="wrapper my-8">
                        <ProductForm 
                        type="Update" 
                        product={product} 
                        productId={product._id} 
                        userId={userId} 
                        />
                    </div>
                </>
            )}
        </>
    )
}

export default UpdateProduct