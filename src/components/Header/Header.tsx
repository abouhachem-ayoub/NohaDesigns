'use client';
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { useContext } from "react";
import ThemeContext from "@/context/themeContext";
import { MdOutlineLightMode } from "react-icons/md";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Header = () => {
 const {darkTheme,setDarkTheme} = useContext(ThemeContext);
 const {data:session} = useSession();
  return (
    <header className="py-10 px-4 container mx-auto text-xl md:flex-nowrap items-center justify-between">
        <div className="flex items-center w-full md:w-3/4 lg:w-[100%] sm:w-1/4">
            <Link href="/" className="font-black text-tertiary-dark">
                Noha's Designs
            </Link>
            <ul className="flex items-center ml-5 ">
                <li className="flex items-center">
                {session?.user?(
                    <Link href={`/users/${session.user.id}`}>
                    {session.user.image?
                    (<div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image src={session.user.image} 
                            alt={session.user.name!}
                            width={40}
                            height={40}
                            className="img scale-animation"
                        />
                    </div>):
                    (<FaUserCircle  className="cursor-pointer"/>)
                }
                    </Link>
                ):(
                <Link href="/auth">
                <FaUserCircle className="cursor-pointer"/>
                </Link>
                )
            }
                </li>
                <li className="ml-5">
                    {darkTheme ? <MdOutlineLightMode className="cursor-pointer" 
                    onClick={()=>{
                        setDarkTheme(false);
                        localStorage.removeItem("noha-theme");
                    }}
                    /> 
                    :
                     <MdDarkMode className="cursor-pointer"
                     onClick = {()=>{
                        setDarkTheme(true);
                        localStorage.setItem('noha-theme','true');    
                     }}
                     /> }
                    
                </li>
            </ul>
        </div>

           <ul className="flex items-center justify-between w-full md:w-1/3 ms-auto sm:w-[100%]">
                <li className="hover:translate-y-2 duration-500 transition-all me-[50px]">
                    <Link href="/">Home</Link>
                </li>
                <li className="hover:translate-y-2 duration-500 transition-all me-[50px]">
                    <Link href="/products">Products</Link>
                </li>
                <li className="hover:translate-y-2 duration-500 transition-all">
                    <Link href="/">Freebies</Link>
                </li>
            </ul>
            
    </header>
  )
}
export default Header