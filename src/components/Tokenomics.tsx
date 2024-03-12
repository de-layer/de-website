import React from "react";

type SectionProps = {
    title: string;
    percentage: string;
    color: string;
    squareBgColor: string;
    squarePosition: string;
};

const Tokenomics = () => {
    const Section: React.FC<SectionProps> = ({ title, percentage, color, squareBgColor, squarePosition }) => {
        return (
            <div className={`max-w-[500px] mt-8 mx-auto w-full h-[68px] relative flex flex-row ${color}`}>
                <p className={`text-white px-4 items-center text-xl lg:text-2xl flex flex-row justify-between w-full`}>
                    <span className="text-left">{title}</span>
                    <span className="ml-auto">{percentage}</span>
                </p>
                <div className={`ml-auto h-full aspect-square ${squarePosition} ${squareBgColor}`} />
            </div>
        );
    };

    return (
        <div id="tokenomics" className="w-full mx-auto px-2 max-w-[750px] 2xl:max-w-full pt-20 my-20">
            <div className="max-w-[1200px] mx-auto w-full flex text-primary items-center flex-col 2xl:flex-row space-x-0 2xl:space-x-20 space-y-20 2xl:space-y-0">
                <div className="flex flex-col text-left px-2">
                    <p className="text-[16px] uppercase">Tokenomics</p>
                    <p className="text-[36px] mt-4 leading-10 uppercase">Launched on <span className="text-accent">ethereum</span>,
                        bridged to <span className="text-accent">all chains</span></p>
                    <p className="text-[16px] mt-4 max-w-[600px]">De Layer is an EVM-compatible multichain protocol which started on Ethereum. 72 hours after the stealth launch, smart contracts of the token were also deployed on Base, Arbitrum, Optimism, BNB Chain, Polygon and Avalanche.</p>
                    <div className="gap-4 sm:gap-4 flex flex-col sm:flex-row">
                        <a target="_blank" rel="noreferrer" href="https://www.dextools.io/app/en/ether/pair-explorer/0xe2baaa8eefc273ad8c126d0ec40cb6059cdc12a1?t=1710079015737">
                            <button className="bg-accent mt-6 w-[208px] h-[46px] text-white">
                                BUY TOKEN
                            </button>
                        </a>
                        <a target="_blank" rel="noreferrer" href="https://docs.delayer.network/token/tokenomics">
                            <button className="bg-primary sm:mt-6 w-[208px] h-[46px] text-white">
                                Learn More
                            </button>
                        </a>
                    </div>
                </div>
                <div className="text-black text-4xl max-w-[500px] flex flex-col w-full uppercase text-center">
                    <p className="text-center">Total supply<br />100 000 000</p>
                    <div className="flex flex-col ">
                        <Section title="LIQUIDITY" percentage="50%" color="bg-primary" squareBgColor="bg-white" squarePosition="top-right" />
                        <Section title="PROTOCOL REWARDS" percentage="35%" color="bg-primary" squareBgColor="bg-black" squarePosition={""} />
                        <Section title="TEAM" percentage="10%" color="bg-primary" squareBgColor="bg-black" squarePosition={""} />
                        <Section title="LIQUIDITY RESERVE" percentage="5%" color="bg-primary" squareBgColor="bg-white" squarePosition="right-bottom" />
                        <Section title="TAX" percentage="5/5" color="bg-accent" squareBgColor="bg-white" squarePosition="top-right" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tokenomics;
