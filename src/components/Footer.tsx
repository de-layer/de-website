import Email from "../../public/email.png";
import GitHub from "../../public/git_white.png";
import Telegram from "../../public/telegram.png";
import Twitter from "../../public/twitter.png";

const Footer = () => {
    return (
        <div className="w-full mt-24 mx-auto flex flex-row justify-center bg-primary">
            <div className="w-0 sm:w-[25rem] h-[100px] top-left bg-white" />
            <div className="w-full max-h-[333px]  pt-24 pb-12 max-w-[1500px] px-4 bg-primary">
                <div className="lg:max-w-[800px] mx-auto items-center flex text-secondary flex-col lg:flex-row justify-between">
                    <div className="flex flex-col text-left space-y-4">
                        <p className="text-[16px] uppercase">Contact Addresses</p>
                        <div className="flex flex-col text-sm">
                            <p className="uppercase break-all"><span className="text-white/50">ETH</span> 0xd849882983f1ba8a3c23b16b65bb0173a7f63b63</p>
                            <p className="uppercase break-all"><span className="text-white/50">BASE</span> 0x95d486af638a6972f9c0be2c29d281e404acb08a</p>
                        </div>
                        <div className="flex flex-row space-x-4">
                            <img src={Email.src} className="w-[30px]" alt="email" />
                            <p>hello@delayer.network</p>
                        </div>
                    </div>
                    <div className="flex flex-row lg:flex-col gap-4 h-auto my-4 lg:my-0  items-center">
                        <a href="https://twitter.com/delayerevm" target="_blank" rel="noreferrer">
                            <img alt="twitter" src={Twitter.src} className="max-w-[25px]" />
                        </a>
                        <a href="https://t.me/delayerevm" target="_blank" rel="noreferrer">
                            <img alt="telegram" src={Telegram.src} className="max-w-[25px]" />
                        </a>
                        <a href="https://github.com/de-layer/de" target="_blank" rel="noreferrer">
                            <img alt="github" src={GitHub.src} className="max-w-[25px]" />
                        </a>
                    </div>
                </div>
                <p className="text-center text-[16px] mt-4 text-secondary">
                    © 2024 All Rights Reserved.
                </p>
                <p className="text-[24px] opacity-50 text-center text-white mx-auto">
                    ⌏ = 0 ⌌ = 1
                </p>
            </div>
            <div className="w-0 sm:w-[25rem] h-[100px] top-right bg-white" />
        </div>
    );
};

export default Footer;
