import MiddleLogo from "../../public/landingLogo.png";

const CTA = () => {
    return (
        <div className="w-full py-40 sm:max-h-[538px] bg-primary relative z-10 ">
            <div className="left-bottom absolute left-0 bottom-0 h-40 w-40 bg-black xl:bg-white" />
            <div className="max-w-[1150px] mx-auto relative px-2 z-10">
                <img alt="" src={MiddleLogo.src} className="absolute w-[350px] z-20 bg-black left-[10%]  -top-20 hidden lg:block" />
                <div className="max-w-[1150px] mx-auto items-center relative hidden xl:flex text-secondary flex-row z-10 justify-between bg-white border-landing">
                    <div className="bg-black flex flex-row items-center relative m-[1px] border-landing w-full p-4 sm:p-10 z-10">
                        <div className="flex flex-col p-2 backdrop-blur-sm z-10 sm:max-h-[200px] h-full relative space-y-3 space-between ietms-end ml-auto text-right">
                            <p className="text-[36px] leading-10 relative uppercase">LEARN MORE ABOUT DE LAYER</p>
                            <p className="text-[16px] text-light ml-auto text-gray max-w-[600px]">Read our extensive documentation to learn the ins and outs of De Layer. This includes information about the ecosystem, smart contract technologies and EVM compatibility. You’ll also learn the details about the decentralized applications coming to De Layer in the near future.</p>
                            <a href="https://de-layer.gitbook.io/de-layer/overview/introduction" target="_blank" rel="noreferrer">
                                <button className="bg-accent cursor-pointer w-[171px] h-[46px] text-secondary ml-auto text-[24px]">
                                    READ DOCS
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="max-w-[1150px] mx-auto items-center relative flex xl:hidden text-secondary flex-row z-10 justify-between bg-white ">
                    <div className="bg-black flex flex-row items-center relative m-[1px] w-full p-4 sm:p-10 z-10">
                        <img alt="" src={MiddleLogo.src} className="absolute top-0 bottom-0 my-auto left-20 w-[150px] lg:block" />
                        <div className="flex flex-col p-2 backdrop-blur-sm z-10 sm:max-h-[200px] h-full relative space-y-3 space-between ietms-end ml-auto text-right">
                            <p className="text-[36px] leading-10 relative uppercase">LEARN MORE ABOUT DE LAYER</p>
                            <p className="text-[16px] text-light ml-auto text-gray max-w-[600px]">Read our extensive documentation to learn the ins and outs of De Layer. This includes information about the ecosystem, smart contract technologies and EVM compatibility. You’ll also learn the details about the decentralized applications coming to De Layer in the near future.</p>
                            <a href="https://de-layer.gitbook.io/de-layer/overview/introduction" target="_blank" rel="noreferrer">
                                <button className="bg-accent cursor-pointer w-[171px] h-[46px] text-secondary ml-auto text-[24px]">
                                    READ DOCS
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CTA;
