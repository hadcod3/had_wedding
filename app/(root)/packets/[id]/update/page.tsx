import AbandonedPage from "@/components/shared/AbandonedPage";
import PacketForm from "@/components/shared/PacketForm"
import { getPacketById } from "@/lib/actions/packet.actions"
import { auth } from "@clerk/nextjs";

type UpdatePacketProps = {
    params: {
        id: string
    }
}

const UpdatePacket = async ({ params: { id } }: UpdatePacketProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    const packet = await getPacketById(id)

    return (
        <>
            { packet.organizer._id !== userId ? (
                <AbandonedPage/>
            ) : (
                <>
                    <div className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                        <h3 className="wrapper h3-bold text-center sm:text-left">Update Packet</h3>
                    </div>
        
                    <div className="wrapper my-8">
                        <PacketForm 
                        type="Update" 
                        packet={packet} 
                        packetId={packet._id} 
                        userId={userId} 
                        />
                    </div>
                </>
            )}
        </>
    )
}

export default UpdatePacket