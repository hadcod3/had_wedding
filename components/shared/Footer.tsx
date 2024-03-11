import Image from "next/image"
import Link from "next/link"

const Footer = () => {
    return (
        // <footer className={`${styles.greeting_container} bg-gray-200`}>
        //     <section className={styles.greeting_box}>
        //         <div className={styles.circle_box}>
        //             <div className={styles.title}>
        //                 <h5 className="text-lg">wedding agency</h5>
        //                 <Image
        //                 src={"/assets/images/text_logo.png"}
        //                 className={styles.text_logo}
        //                 alt="text logo"
        //                 width={300}
        //                 height={50}
        //                 />
        //             </div>
        //             <div className={styles.flower_border}>
        //                 <Image
        //                 src={"/assets/images/clover.png"}
        //                 className={`${styles.flower_image} ${styles.fi_1}`}
        //                 alt="clover"
        //                 width={180}
        //                 height={300}
        //                 />
        //                 <Image
        //                 src={"/assets/images/clover.png"}
        //                 className={`${styles.flower_image} ${styles.fi_2}`}
        //                 alt="clover"
        //                 width={180}
        //                 height={300}
        //                 />
        //             </div>
        //         </div>
        //         <div className={`${styles.square_box} bg-gray-300`}></div>
        //     </section>
        // </footer>
        <footer className="border-t">
            <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
                <Link href='/'>
                <Image 
                    src="/assets/images/logo.png"
                    alt="logo"
                    width={150}
                    height={50}
                />
                </Link>

                <p>2023 Had Code. All Rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
