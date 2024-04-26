import BigCard from "../../Components/BigCard/BigCard";
import Image from "../../Components/Image/Image";
import Row from "../../Components/Row/Row";
import Text from "../../Components/Text/Text";
import Title from "../../Components/Title/Title";

export default function About({aboutClass}) {
    return (
        <>
            <section id="about" className={aboutClass}>
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                    <Row rowClass={"grid gap-8 mb-6 lg:mb-16 md:grid-cols-2"}>
                        <Image
                            altText={"dashboard image"}
                            imgPath={
                                "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"
                            }
                        />
                        <div className="flex flex-col justify-center">
                            <Title
                                titleClass={
                                    "mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
                                }
                                titleContent={"Sobre o Projeto"}
                            />
                            <Text
                                textClass={
                                    "mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400"
                                }
                                textContent={
                                    "Flowbite helps you connect with friends and communities of people who share your interests. Connecting with your friends and family as well as discovering new ones is easy with features like Groups."
                                }
                            />
                        </div>
                    </Row>
                    {/*Row*/}
                    <Row
                        rowClass={
                            "grid grid-rows-3 gap-8 mb-6 sm:mb-16 sm:flex sm:flex-row"
                        }
                    >
                        <BigCard
                            altText={"Bonnie Avatar"}
                            contentText={
                                "Bonnie drives the technical strategy of the flowbite platform and brand."
                            }
                            imgPath={
                                "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                            }
                            titleClass={
                                "text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 mt-2"
                            }
                            titleContent={"Bonnie Green"}
                        />
                        <BigCard
                            altText={"Jese Avatar"}
                            contentText={
                                "Jese drives the technical strategy of the flowbite platform and brand."
                            }
                            imgPath={
                                "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                            }
                            titleClass={
                                "text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 mt-2"
                            }
                            titleContent={"Jese Leos"}
                        />
                        <BigCard
                            altText={"Michael Avatar"}
                            contentText={
                                "Michael drives the technical strategy of the flowbite platform and brand."
                            }
                            imgPath={
                                "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                            }
                            titleClass={
                                "text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 mt-2"
                            }
                            titleContent={"Michael Gough"}
                        />
                    </Row>
                </div>
            </section>
        </>
    );
}
