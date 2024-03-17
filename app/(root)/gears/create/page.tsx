import GearForm from "@/components/shared/GearForm";
 
const CreateGear = () => {

    return (
        <>
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <h3 className="wrapper h3-bold text-center sm:text-left">
                    Input Gear
                </h3>
            </section>

            <div className="wrapper my-8">
                <GearForm type="Create"/>
            </div>
        </>
    )
}

export default CreateGear
