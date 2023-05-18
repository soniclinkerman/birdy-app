import {BsBellFill, BsHouseFill} from "react-icons/bs"
import {FaUser} from "react-icons/fa"
import {BiLogOut} from "react-icons/bi"
import SidebarLogo from "./SidebarLogo"
import SideBarItem from "./SideBarItem";
import SidebarTweetButton from "./SidebarTweetButton";
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
const Sidebar = () => {
    const {data: currentUser} = useCurrentUser();
    const items  = [
        {
            label: "Home",
            href: "/",
            icon: BsHouseFill,
        },
        {
            label: "Notifications",
            href: "/notifications",
            icon: BsBellFill,
            auth: true
        },
        {
            label: "Profile",
            href: "/users/123",
            icon: FaUser,
            auth: true
        }

    ];
    return (
        <div className="col-span-1 h-full pr-4 md:pr-6">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px]">
                    <SidebarLogo/>

                    {items.map((item) => (

                        <SideBarItem
                        key={item.href}
                        label={item.label}
                        href={item.href}
                        icon={item.icon}
                        auth={item.auth}
                        />
                    ))}
                    
                    {currentUser &&
                    (
                    <SideBarItem  
                    onClick={() => signOut()}
                    icon={BiLogOut} 
                    label="Logout"
                    />
                    
                    )}


                    <SidebarTweetButton/>
      

              

                </div>
            </div>
        </div>

    )
}

export default Sidebar
