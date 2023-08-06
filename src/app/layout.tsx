"use client";
import './globals.css';
import { useState } from 'react';
import colorContext from '../context/colorContext';
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { HomeIcon, UserCircleIcon, BriefcaseIcon, PhoneArrowDownLeftIcon } from '@heroicons/react/24/outline';


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [color, setColor] = useState<string>("bg-[#FF0066]");
    const PathName = usePathname();
    console.log("Current path: ", PathName);
    const SideBarLinks = [
        {
            label: <HomeIcon className="h-8 w-8 text-white stroke-2" />,
            href: "/",
            bgColor: "bg-[#FF0066]",
            tooltip: "Home 🏠"
        },
        {
            label: <UserCircleIcon className="h-8 w-8 text-white stroke-2" />,
            href: "/about",
            bgColor: "bg-[#00FF00]",
            tooltip: "About ℹ️"
        },
        {
            label: <BriefcaseIcon className="h-8 w-8 text-white stroke-2" />,
            href: "/projects",
            bgColor: "bg-[#FF0000] ",
            tooltip: "Projects 🛠️"
        },
        {
            label: <PhoneArrowDownLeftIcon className="h-8 w-8 text-white stroke-2" />,
            href: "/contact",
            bgColor: "bg-[#00FFFF]",
            tooltip: "Contact 📞"
        }
    ];

    const handleLinkClick = (path: string, bgColor: string, pathname: string) => {
        if (path == pathname) {
            setColor(bgColor);
        }
    }
    return (
        <html lang="en">
            <body className="bg-black text-white m-0 p-0 flex h-screen md:flex-row flex-col">
                <nav className="md:border-r border-white md:h-full md:w-40 p-0 ">
                    <ul className="list-none m-0 p-0 flex h-full w-full justify-around align-center flex-row md:flex-col">
                        <colorContext.Provider value={{ color, setColor }}>
                            {
                                SideBarLinks.map((link, index) => {
                                    return (
                                        <>
                                            <li key={index} className="m-0 p-0 flex align-center justify-center">
                                                <Link
                                                    href={link.href}
                                                    data-tooltip-id="my-tooltip"
                                                    data-tooltip-content={link.tooltip}
                                                    className={
                                                        `text-white flex items-center justify-center w-full p-2 font-bold ${(PathName === link.href ? link.bgColor : "")}`
                                                    }
                                                    onClick=
                                                    {
                                                        () => {
                                                            handleLinkClick(link.href, link.bgColor, link.href)
                                                        }
                                                    }
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                            <Tooltip id="my-tooltip" key={index + "tooltip"} className="p-0" />
                                        </>
                                    );
                                })
                            }
                        </colorContext.Provider>
                    </ul>
                </nav>
                {children}
            </body>
        </html >
    );
}