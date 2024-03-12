import LogoBig from "../../public/logobig.png";

const BigButton = () => {
    return (
        <div id="faq" className="w-full max-w-[1400px] py-24 min-h-[500px] h-full bg-primary relative sm:px-24">
            <img src={LogoBig.src} className="absolute right-0 h-full top-0 min-w-[500px]" />
            <div className="relative h-full backdrop-blur-xl xl:backdrop-blur-none p-2 space-y-3 mt-2 flex text-secondary flex-col justify-center w-full">
                <p className="text-[16px] text-accent uppercase">Developers</p>
                <p className="text-[36px] leading-10 uppercase max-w-[550px]">START BUILDING ON De LAYER
                    USING THE FAMILIAR TOOLS</p>
                <p className="text-[16px] text-light mr-auto text-gray max-w-[600px]">De Layer is a subnet of Bittensor which is compatible with EVM code. You can develop decentralized applications and smart contracts using the tools you know and love. Read the docs to learn more.</p>
                <a href="https://docs.delayer.network/overview/introduction" target="_blank" rel="noreferrer">
                    <button className="bg-accent cursor-pointer mt-20 w-[171px] h-[46px] text-secondary mr-auto text-[24px]">
                        READ DOCS
                    </button>
                </a>
            </div>
        </div>
    );
};

export default BigButton;
