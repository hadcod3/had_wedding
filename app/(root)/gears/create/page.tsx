import GearForm from "@/components/shared/GearForm"
import { auth } from "@clerk/nextjs"

const CreateGear = () => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
 
    return (
        <>
            <section className="bg-primary-100 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <h3 className="wrapper h3-bold text-center sm:text-left">
                    Create Gears
                </h3>
            </section>

            <div className="wrapper my-8">
                <GearForm userId={userId} type="Create"/>
            </div>
        </>
    )
}

export default CreateGear
