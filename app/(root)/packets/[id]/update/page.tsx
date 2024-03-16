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
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Update Packet</h3>
      </section>

      <div className="wrapper my-8">
        <PacketForm 
          type="Update" 
          packet={packet} 
          packetId={packet._id} 
          userId={userId} 
        />
      </div>
    </>
  )
}

export default UpdatePacket