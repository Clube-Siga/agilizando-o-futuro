import BigCard from "../../Components/BigCard/BigCard";
import Button from "../../Components/Button/Button";
import Image from "../../Components/Image/Image";

export default function About() {
    return (
        <>
            <section class="bg-white dark:bg-gray-900">
                <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                <div class="grid gap-4 mb-6 lg:mb-16 md:grid-cols-2">
                         <Image altText={"dashboard image"} imgPath={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"} />
                         <div class="flex flex-col justify-center">
                            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Let's create more tools and ideas that brings us together.</h2>
                            <p class="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">Flowbite helps you connect with friends and communities of people who share your interests. Connecting with your friends and family as well as discovering new ones is easy with features like Groups.</p>
                         </div>
                         
                    </div>
                    <div class="grid gap-8 mb-6 lg:mb-16 md:grid-cols-4">
                        <BigCard
                            altText={"Bonnie Avatar"}
                            contentText={
                                "Bonnie drives the technical strategy of the flowbite platform and brand."
                            }
                            imgPath={
                                "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
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
                            titleContent={"Michael Gough"}
                        />
                        <BigCard
                            altText={"Sofia Avatar"}
                            contentText={
                                "Sofia drives the technical strategy of the flowbite platform and brand."
                            }
                            imgPath={
                                "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sofia-mcguire.png"
                            }
                            titleContent={"Sofia Mcguire"}
                        />
                        <BigCard
                            altText={"Lana Avatar"}
                            contentText={
                                "Lana drives the technical strategy of the flowbite platform and brand."
                            }
                            imgPath={
                                "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/lana-byrd.png"
                            }
                            titleContent={"Lana Byrd"}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
