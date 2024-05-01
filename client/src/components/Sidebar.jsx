import { useState } from "react";
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command";
import { CircleUser, Combine, LogOut, PackageSearch,  } from "lucide-react";
import UserItem from "./userItem";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux";

export default function Sidebar () {
    const [expand, setExpand] = useState();
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);
    const navigate  = useNavigate();
 
    const pathname = window.location.pathname;

    const handleLogout = async () => {
        dispatch(logout());
        if(!currentUser) {
            navigate('/');
        }
    };

    const menuList = [
        {
            group: "General",
            items: [
                {
                    link: "/products",
                    icon: <PackageSearch />,
                    text: "Product"
                },
                {
                    link: "/categories",
                    icon: <Combine />,
                    text: "Category"
                },
            ]
        },
        {
            group: "Settings",
            items: [
                {
                    link: "/login",
                    icon: <CircleUser />,
                    text: "Login"
                }
            ]
        }
    ];

    const handleExpand = (groupName) => {
        setExpand((prevState) => ({
            ...prevState,
            [groupName]: !prevState[groupName]
        }));
    };

    return (
        <div className="w-[250px] flex flex-col gap-4 min-h-screen p-4 border-r-[1.5px] border-borderDashboard bg-white z-50">
            <div className="w-full h-16 mt-5 flex items-center justify-center cursor-pointer hover:opacity-85">
                <h1 className="text-2xl font-bold">Product Inventory</h1>
            </div>
            <div>
                <UserItem />
            </div>
            <div className="grow">
                <Command style={{ overflow: 'visible' }}>
                    <CommandList style={{ overflow: 'visible' }}>
                        {menuList.map((menu, key) => (
                            <CommandGroup key={key} heading={menu.group}>
                                {menu.items.map((option, optionKey) => (
                                    <div key={optionKey}>
                                        {option.dropdown ? (
                                            <>
                                                <div
                                                    onClick={() => handleExpand(option.text)}
                                                    className="text-sm font-medium transition-colors hover:text-primary"
                                                >
                                                    <CommandItem className="flex justify-between gap-4 cursor-pointer">
                                                        <div className="flex gap-4">
                                                            {option.icon}
                                                            {option.text}
                                                        </div>
                                                        <div>
                                                            {expand[option.text] ? '-' : '+'}
                                                        </div>
                                                    </CommandItem>
                                                </div>
                                                {expand[option.text] && (
                                                    <div className="ml-2">
                                                        {option.dropdown.map((item, itemKey) => (
                                                            <Link key={itemKey} to={item.link} className="text-sm font-medium hover:text-primary">
                                                                <CommandItem className={`ml2 flex gap-2 cursor-pointer ${pathname === item.link ? "bg-slate-50" : ""}`}>
                                                                    {item.icon}
                                                                    {item.text}
                                                                </CommandItem>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <Link key={optionKey} to={option.link} className="text-sm font-medium hover:text-primary active:bg-none">
                                                <CommandItem key={optionKey} className={` flex gap-4 cursor-pointer ${pathname === option.link ? "bg-slate-50" : ""}`}>
                                                    {option.icon}
                                                    {option.text}
                                                </CommandItem>
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </CommandGroup>
                        ))}
                    </CommandList>
                </Command>
            </div>
            <div onClick={handleLogout} className="text-sm font-medium transition-colors hover:text-primary">
                <div className="flex gap-4 cursor-pointer">
                    <LogOut />
                    <p>Logout</p>
                </div>
            </div>
        </div >
    );
}
