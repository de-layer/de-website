import Arrow from "../../public/arrow.png";
import Github from "../../public/assets/icons/github.png";

const SmallButtons = () => {
    const sections = [
        { content: "EXPLORE THE CODE", desc: "View De Layer’s code repositories to check the progress of the project and contribute to push it further", height: "h-[220px]" },
        { content: "Github", height: "h-[76px]", link: "https://github.com/de-layer/de   " },
        { content: "READ THE OFFICIAL LITEPAPER", desc: "Learn the initial concepts of De Layer by reading the litepaper. It will help you understand the vision of the project.", height: "h-[220px]" },
        { content: "LITEPAPER", height: "h-[76px]", link: "https://docs.delayer.network/overview/litepaper" },
        { content: "DIVE INTO THE DOCS", desc: "Learn all about De Layer by reading the official documentation. Check back for new updates, since we’re often sharing new improvements there.", height: "h-[220px]" },
        { content: "DOCS", height: "h-[76px]", link: "https://docs.delayer.network/overview/introduction" },
    ];

    return (
        <div className="w-full max-w-[1300px] flex flex-col xl:flex-row px-2 items-center mt-4 h-full relative gap-4">
            <div>
                <div className="flex flex-col gap-4 md:flex-row items-center mx-auto text-secondary w-full justify-between">
                    {sections.slice(0, 1).map((section, index) => (
                        <div
                            key={index}
                            className={`bg-black w-full sm:w-[420px] ${section.height} p-8 flex flex-col    `}
                        >
                            <span className="text-[20px]">{section.content}</span>
                            <span className="text-[16px] text-[#bababa] my-auto"> {section.desc}</span>
                        </div>
                    ))}
                </div>


                <div className="flex flex-col xl:flex-row gap-2 items-center mx-auto mt-4 text-secondary w-full justify-between">
                    {sections.slice(1, 2).map((section, index) => (
                        <a key={index + 3} target="_blank" rel="noreferrer" href={section.link}>
                            <div

                                className={`bg-black w-full sm:w-[420px] h-[${section.height}] p-4 flex flex-row items-center gap-6 sm:gap-0 justify-between`}
                            >
                                {section.content.toLowerCase() === 'github' && <img src={Github.src} className="w-[20px] mr-2" />}
                                <span className="mr-auto">{section.content}</span>
                                <img src={Arrow.src} className="w-[20px] z-50    cursor-pointer" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
            <div>
                <div className="flex flex-col gap-4 md:flex-row items-center mx-auto text-secondary w-full justify-between">
                    {sections.slice(2, 3).map((section, index) => (
                        <div
                            key={index}
                            className={`bg-black w-full sm:w-[420px] ${section.height} p-8 flex flex-col    `}
                        >
                            <span className="text-[20px]">{section.content}</span>
                            <span className="text-[16px] text-[#bababa] my-auto"> {section.desc}</span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col xl:flex-row gap-2 items-center mx-auto mt-4 text-secondary w-full justify-between">
                    {sections.slice(3, 4).map((section, index) => (
                        <a key={index + 3} target="_blank" rel="noreferrer" href={section.link}>
                            <div
                                className={`bg-black w-full sm:w-[420px] h-[${section.height}] p-4 flex flex-row items-center gap-6 sm:gap-0 justify-between`}
                            >
                                {section.content.toLowerCase() === 'github' && <img src={Github.src} className="w-[20px] mr-2" />}
                                <span className="mr-auto">{section.content}</span>
                                <img src={Arrow.src} className="w-[20px] z-50    cursor-pointer" />
                            </div>
                        </a>
                    ))}
                </div>
            </div> <div>
                <div className="flex flex-col gap-4 md:flex-row items-center mx-auto text-secondary w-full justify-between">
                    {sections.slice(4, 5).map((section, index) => (
                        <div
                            key={index}
                            className={`bg-black w-full sm:w-[420px] ${section.height} p-8 flex flex-col    `}
                        >
                            <span className="text-[20px]">{section.content}</span>
                            <span className="text-[16px] text-[#bababa] my-auto"> {section.desc}</span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col xl:flex-row gap-2 items-center mx-auto mt-4 text-secondary w-full justify-between">
                    {sections.slice(5, 6).map((section, index) => (
                        <a key={index + 3} target="_blank" rel="noreferrer" href={section.link}>
                            <div
                                className={`bg-black w-full sm:w-[420px] h-[${section.height}] p-4 flex flex-row items-center gap-6 sm:gap-0 justify-between`}
                            >
                                {section.content.toLowerCase() === 'github' && <img src={Github.src} className="w-[20px] mr-2" />}
                                <span className="mr-auto">{section.content}</span>
                                <img src={Arrow.src} className="w-[20px] z-50    cursor-pointer" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SmallButtons;
