'use client';
import Link from "next/link";
import React from "react";
import { stack as Menu } from "react-burger-menu";
import LogoSmall from "../../public/smallLogo.png";

const navLinks = [
    { title: "HOME", link: "/" },
    { title: "TOKENOMICS", link: "/#tokenomics" },
    { title: "FEATURES", link: "/#features" },
    { title: "ROADMAP", link: "/#roadmap" },
    { title: "FAQ", link: "/#faq" },
];

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = React.useState(false);

    return (
        <div className='relative z-50 w-full mx-auto '>
            <div className='block md:hidden fixed top-4 right-4 z-[1200] border-gray-200 bg-black rounded text-black'>
                <div className='flex flex-row justify-between z-[1200] relative items-center mx-auto'>
                    <div
                        onClick={() => setMenuOpen((old) => !old)}
                        className='flex justify-center flex-col items-center z-[1200] relative space-y-1 rounded-2xl ml-auto w-8 h-8 '>
                        <span className='block w-4 h-0.5 bg-white'></span>
                        <span className='block w-4 h-0.5 bg-white'></span>
                        <span className='block w-4 h-0.5 bg-white'></span>
                    </div>
                </div>
            </div>
            <nav className="text-[14px] backdrop-blur-2xl z-30 md:fixed top-0 p-2 sm:p-4 left-0 right-0 mx-auto w-full hidden md:block text-secondary bg-black/50">
                <div className="mx-auto max-w-[1295px] flex gap-2 flex-col sm:flex-row justify-center items-center">
                    <div className="mr-auto space-x-6 w-[5rem] lg:w-[14rem]">
                        <img alt="" src={LogoSmall.src} className="mr-auto w-[30px]" />
                    </div>
                    <div className="flex justify-center items-center text-white z-[100] space-x-6 xl:space-x-20">
                        {
                            navLinks.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.link}
                                >
                                    {item.title}
                                </a>
                            ))
                        }
                    </div>
                    <div className="sm:ml-auto space-x-6 justify-end flex flex-row items-center">
                        <a target="_blank" rel="noreferrer" href="https://www.dextools.io/app/en/ether/pair-explorer/0xe2baaa8eefc273ad8c126d0ec40cb6059cdc12a1?t=1710079015737">
                            LIVE CHART
                        </a>
                        <Link className="bg-accent mx-auto w-[144px] h-[27px] duration-200 text-secondary justify-center items-center flex flex-col" href="/dapp">
                            LAUNCH APP
                        </Link>
                    </div>
                </div>
            </nav>
            <Menu
                noOverlay
                right
                isOpen={isMenuOpen}
                customCrossIcon={false}
                customBurgerIcon={false}
                width='100%'
                className='w-full z-[40] md:hidden outline-none outline-0 h-full backdrop-blur-md focus-within:outline-none fixed bottom-0 flex flex-col'>

                <div className='w-full h-full bg-black text-white bg-opacity-75 space-y-8 md:w-auto justify-center items-center flex flex-col' onClick={(e) => { setMenuOpen(false); e.stopPropagation(); }}>
                    <div className="mx-auto space-x-6 pt-4">
                        <img alt="" src={LogoSmall.src} className="mx-auto w-[30px]" />
                    </div>
                    <div className="flex flex-col text-4xl items-center gap-4">
                        {navLinks.map((item, index) => (
                            <a
                                key={index}
                                href={item.link}
                            >
                                {item.title}
                            </a>
                        ))}
                    </div>
                    <div className="space-y-2 text-4xl mx-auto justify-center flex flex-col items-center">
                        <a href="https://www.coingecko.com/en/coins/de-layer" target="_blank" rel="noreferrer"
                        >
                            LIVE CHART
                        </a>
                        <Link className="bg-accent mx-auto w-[270px] h-[70px] md:w-[144px] md:h-[27px] duration-200 text-secondary flex flex-col items-center justify-center" href="/dapp">
                            LAUNCH APP
                        </Link>
                    </div>
                </div>

            </Menu>
        </div>
    );
};

export default Navbar;
