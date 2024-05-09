import AbandonedPage from "@/components/shared/AbandonedPage";
import GearForm from "@/components/shared/GearForm"
import { getGearById } from "@/lib/actions/gear.actions"
import { auth } from "@clerk/nextjs";

type UpdateGearProps = {
    params: {
        id: string
    }
}

const UpdateGear = async ({ params: { id } }: UpdateGearProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    const gear = await getGearById(id)

    return (
        <>
            { gear.organizer._id !== userId ? (
                <AbandonedPage/>
            ) : (
                <>
                    <div className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                        <h3 className="wrapper h3-bold text-center sm:text-left">Update Gear</h3>
                    </div>
        
                    <div className="wrapper my-8">
                        <GearForm 
                        type="Update" 
                        gear={gear} 
                        gearId={gear._id} 
                        userId={userId} 
                        />
                    </div>
                </>
            )}
        </>
    )
}

export default UpdateGear