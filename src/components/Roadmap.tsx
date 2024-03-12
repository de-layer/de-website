/* eslint-disable react/no-unescaped-entities */
import ScrollContainer from 'react-indiana-drag-scroll';

const Roadmap = () => {
    return (
        <div id="roadmap" className="w-full text-center mt-10">
            <p className="text-[16px] text-accent uppercase">Roadmap</p>
            <p className="text-[36px] text-primary mt-4 leading-10 uppercase px-2 max-w-[550px] text-center mx-auto">What we are working on right now </p>
            <div className="relative flex items-center justify-center w-full mt-10">
                <div className="w-full mx-auto h-[1px] bg-black absolute my-auto" />
                <ScrollContainer className="scroll-container overflow-hidden max-w-full pr-96">
                    <div className="flex flex-col min-w-[1500px] sm:min-w-[1500px] xl:min-w-[1800px] max-w-[1500px] xl:max-w-[2000px] mx-auto sm:items-center my-40">
                        <div className="min-w-[1000px] sm:min-w-[1400px] mx-auto w-full flex flex-row">
                            <div className="w-1/3 h-40 mr-[50vw] sm:mr-0 relative">
                                <div className="absolute bg-accent h-[40px] aspect-square mx-auto left-0 right-0" >
                                    <div className="mx-auto w-[20rem] text-left bottom-0 left-20 absolute">
                                        <p className="font-novanew text-[20px] flex flex-row items-center">De <span className="text-[#bababa] text-[10px] ml-2">"The active expression of Tao is called De"</span></p>
                                        <ul className="list-disc ml-4">
                                            <li>Stealth launch on Ethereum</li>
                                            <li>Initial website</li>
                                            <li>Litepaper release</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="w-[1px] h-40 bg-[#1E1E1E] mx-auto" />
                            </div>
                            <div className="w-1/3 h-40 mr-[50vw] sm:mr-0 relative">
                                <div className="absolute bg-black h-[40px] aspect-square mx-auto left-0 right-0" >
                                    <div className="mx-auto w-[25rem] text-left -bottom-10 left-20 absolute">
                                        <p className="font-novanew text-[20px] mb-4 flex flex-row items-center max-w-[20rem]">TAO <span className="text-[#bababa] text-[10px] ml-2">“Taoists view self-cultivation as a way for emotions and self to partake in divinity, and a smaller subset of these view some mythological beings such as xian as being divine”</span></p>
                                        <ul className="list-disc ml-4">
                                            <li>Mainnet launch</li>
                                            <li>DEX</li>
                                            <li>Easy to use DeFi protocols</li>
                                            <li>Layer0 integration</li>
                                            <li>Developer support program</li>
                                            <li className="text-xs">⌌⌌ ⌌⌏⌌ ⌌⌌⌏⌏⌏ ⌌⌌⌏⌏ ⌌⌏⌏⌌ ⌌⌏⌏⌌⌌ ⌌⌏⌌⌏⌏ ⌌⌏⌏⌌ ⌌⌌⌌⌏ ⌌⌌⌌</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="w-[1px] h-40 bg-[#1E1E1E] mx-auto" />
                            </div>
                            <div className="w-1/3 h-40 mr-[50vw] sm:mr-0 relative">
                                <div className="absolute bg-black h-[40px] aspect-square mx-auto left-0 right-0" >
                                    <div className="mx-auto w-[20rem] text-left bottom-0 left-20 absolute">
                                        <p className="font-novanew text-[20px] mb-4 flex flex-row items-center">ZIRAN <span className="text-[#bababa] text-[10px] ml-2">“Ziran refers to the fact that there is thus no ultimate cause to make things what they are. The universe exists by itself and of itself; it is existence just as it is. Nothing can be added or substracted from it; it is entirely sufficient upon itself"</span></p>
                                        <ul className="list-disc ml-4">
                                            <li>🔒</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="w-[1px] h-40 bg-[#1E1E1E] mx-auto" />
                            </div>
                        </div>
                        <div className="bg-[#1E1E1E] h-[1px] w-full" />
                        <div className="mx-auto w-full flex flex-row justify-center">
                            <div className="w-1/3 h-40 mr-[50vw] sm:mr-0 relative">
                                <div className="absolute bg-black h-[40px] aspect-square mx-auto bottom-0 left-0 right-0" >
                                    <div className="mx-auto w-[20rem] text-left -bottom-20 left-20 absolute">
                                        <p className="font-novanew text-[20px] mb-4 flex flex-row items-center">Te <span className="text-[#bababa] text-[10px] ml-2">“Tao Te Ching is actually a multi-vocal anthology consisting of a variety of historical and textual layers”</span></p>
                                        <ul className="list-disc ml-4">
                                            <li>Docs release</li>
                                            <li>Bridge launch</li>
                                            <li>8 network launch</li>
                                            <li>Testnet launch</li>
                                            <li>Community Testing</li>
                                            <li className="text-xs max-w-[400px] ">⌌⌌⌌⌏ ⌌⌏⌌⌏⌌ ⌌⌌⌏⌏ ⌌⌏⌌⌏⌏ ⌌⌏⌏⌌ ⌌⌏⌏⌏⌏ ⌌⌌⌏⌏ ⌌⌏⌏⌌ ⌌⌏⌏⌏⌌ ⌌⌏⌌⌏⌌ ⌌⌏⌏⌌ ⌏⌏⌌ ⌌⌏⌏⌌ ⌌⌏⌌⌏⌏ ⌌⌏⌏⌌ ⌌⌏⌌ ⌌⌏⌏⌌⌌</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="w-[1px] h-40 bg-[#1E1E1E] mx-auto" />
                            </div>
                            <div className="w-1/3 h-40 mr-[50vw] sm:mr-0 relative">
                                <div className="absolute bg-black h-[40px] aspect-square mx-auto bottom-0 left-0 right-0" >
                                    <div className="mx-auto w-[30rem] text-left bottom-0 left-20 absolute">
                                        <p className="font-novanew text-[20px] mb-4 flex flex-row items-center"><span className="w-[220px]">WU WEI </span><span className="text-[#bababa] text-[10px]">“Wu wei refers to letting go of egoistic concerns and to abstain from forceful and interfering measures that cause tensions and disruption in favor of gentleness, adaptation, and ease."</span></p>
                                        <ul className="list-disc ml-4">
                                            <li>🔒 </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="w-[1px] h-40 bg-[#1E1E1E] mx-auto" />
                            </div>
                        </div>
                    </div>
                </ScrollContainer>
            </div>
        </div>
    );
};

export default Roadmap;
