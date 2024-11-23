import Link from "next/link";
import { BiMessageDetail } from "react-icons/bi";
import { BsFillSendFill, BsTelephoneOutbound } from "react-icons/bs";
const Footer = () => {
  return (
    <footer className="mt-16">
        <div className="container mx-auto px-4">
            <Link href="/" className="font-black text-tertiary-dark">
                Noha's Designs
            </Link>
        </div>
        <h2 className="font-semibold text-[40px] py-6 ">
         Contact
        </h2>
        <div className="flex flex-wrap gap-16 items-center justify-between">
            <div className="flex-1">
                <p className="ms-10">Meknes, Morocco</p>
                <div className="flex items-center py-4">
                    <BsFillSendFill className="me-5"/>
                    <p>Noha's Awesome Design!</p>
                </div>
                <div className="flex items-center py-4">
                    <BsTelephoneOutbound className="me-5"/>
                    <p>+212 - xx xx xx xx</p>
                </div>
                <div className="flex items-center pt-4">
                    <BiMessageDetail className="me-5"/>
                    <p> Visit my upwork account</p>
                </div>
          
        </div>
        <div className="flex-1 md:text-right">
                <p className="pb-4">My Story</p>
                <p className="pb-4">Get in touch</p>
                <p className="pb-4">Our privacy commitement</p>
                <p className="pb-4">Our terms of services</p>
                <p>Customer assistance</p>
        </div>

        <div className="flex-1 md:text-right pt-4">
                <p className="pb-4">My Calenders</p>
                <p className="pb-4">My Meal planners</p>
                <p className="pb-4">My Notebooks</p>
                <p className="pb-4">My Children's books</p>
                <p>My Freebies</p>
        </div>
        </div>
        <div className="bg-tertiary-light h-10 md:h-[70px] mt-16 w-full bottom-0 left-0 ">
        </div>
    </footer>
  )
}

export default Footer
