import Chain from "../../public/assets/features/chain.png";
import Coin from "../../public/assets/features/coin.png";
import Community from "../../public/assets/features/community.png";
import Puzzle from "../../public/assets/features/puzzle.png";

const Features = () => {
    const Features = [
        { title: "A growing ecosystem of applications", photo: Community.src, desc: 'Since De Layer’s base architecture is compatible with all EVM smart contracts, it is very easy to integrate the network to all great blockchain apps. Soon you’ll be able to enjoy all the best applications from Ethereum, Polygon, BNB Chain and others on De Layer.' },
        { title: "Multichain Bridge", photo: Chain.src, desc: 'The token of De Layer - $DEAI was initially launched on Ethereum with the idea to make it truly multichain. You can use the dedicated bridge to move your $DEAI tokens between networks with ease and finesse.' },
        { title: "OPENLY ENGINEERED $DEAI TOKEN", photo: Coin.src, desc: 'The $DEAI token which powers the De Layer ecosystem was launched on Ethereum. $DEAI will be the native token of De Layer. It will be used as the main currency used for transactions and gas fees.' },
        { title: "WELL-known FOR DEVELOPERS, easy for users", photo: Puzzle.src, desc: 'De Layer is EVM-compatible, which means that at the core it works just like Ethereum or any layer 2 blockchain. That makes it a familiar place for developers, since the technology used for smart contracts is exactly the same as on other EVM chains.' },
    ];

    return (
        <div id="features" className="text-center w-full 2xl:h-[900px] bg-black">
            <div className="flex flex-row h-full w-full">
                <div className="w-[5rem] lg:w-[10rem] xl:w-[20rem] flex flex-col justify-between">
                    <div className="aspect-square top-left bg-white" />
                    <div className="aspect-square left-bottom bg-white" />
                </div>
                <div className="flex flex-col mx-auto pt-10 w-full max-w-[1500px]">
                    <p className="text-[16px] text-accent uppercase">ECOSYSTEM</p>
                    <p className="text-[36px] mt-4 text-white leading-10 uppercase">what powers de layer?</p>
                    <div className="mx-auto flex justify-center items-center w-full">
                        <div className="w-full grid  grid-cols-1 2xl:grid-cols-2 items-center  content-center shadow-2xl my-20 gap-20 min-h-[543px]">
                            {Features.map((item, index) => (
                                <div key={index} className="flex mx-auto w-full gap-10 max-w-[800px] 2xl:max-w-full h-full text-primary items-center justify-center flex-col sm:flex-row">
                                    <img src={item.photo} className=" aspect-square max-w-[220px]" />
                                    <div className="flex flex-col justify-center  space-y-4 2xl:space-y-0 2xl:justify-between h-full 2xl:py-6 text-left">
                                        <p className="text-[20px] uppercase text-white">
                                            {item.title}
                                        </p>
                                        <p className="text-[14px] text-light">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
                <div className="w-[5rem] lg:w-[10rem] xl:w-[20rem] flex flex-row">
                    <div className="w-1/3 h-full">
                        <div className="mx-auto w-[1px] bg-white h-1/2" />
                    </div>
                    <div className="w-1/3 h-1/2 my-auto">
                        <div className="mx-auto w-[1px] h-full mt-auto bg-white" />
                    </div>
                    <div className="w-1/3 h-1/2 mt-auto">
                        <div className="mx-auto w-[1px] h-full bg-white" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
