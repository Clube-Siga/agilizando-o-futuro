import Button from "../../Components/Button/Button";
import Image from "../../Components/Image/Image";
import Title from "../../Components/Title/Title";

export default function CallToAction(){
    return (
        <>
<<<<<<<<< Temporary merge branch 1
            <section id="cta" className={ctaClass}>
                <Row rowClass={"gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6"}>
                    <div className="mt-4 md:mt-0">
                        <Title titleClass={"font-body mb-4 text-4xl tracking-tight font-extrabold text-defaultW dark:text-defaultW"} titleContent={"Faça uma doação e ajude o projeto!"}/>
                        <Text textClass={"font-body mb-3 font-light text-defaultW md:text-lg dark:text-defaultW"} textContent={"Contribua para o Agilizando o Futuro e faça a diferença na vida de jovens e adultos!"}/>
                        <Button buttonClass={"font-body inline-flex items-center justify-center px-5 py-3 mr-3 mb-3 text-base font-medium text-center text-secondary rounded-3xl bg-defaultW hover:bg-secondary hover:text-defaultW focus:ring-2 focus:ring-defaultW dark:focus:ring-primary"} path={"#"} title={"Apoie aqui"} />
                    </div>
                    <Image altText={"cta image"} imgPath={"https://raw.githubusercontent.com/Clube-Siga/agilizando-o-futuro/dae4887685c4aaa76769f3a96c6e54f97af21aa0/resources/images/image-cta.png"} />
                    {/* <img className="w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg" alt="dashboard image" />
                    <img className="w-full hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg" alt="dashboard image" /> */}
                </Row>
=========
            <section class="bg-white dark:bg-gray-900">
                <div class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                    <div class="mt-4 md:mt-0">
                        <Title titleContent={'Faça sua doação'}/>
                        <p class="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">Flowbite helps you connect with friends and communities of people who share your interests. Connecting with your friends and family as well as discovering new ones is easy with features like Groups.</p>
                        <Button buttonClass={"inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"} path={"#about"} title={"Comece aqui"} />
                    </div>
                    {/* <Image altText={"dashboard image"} imgPath={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"} /> */}
                    <Image altText={"dashboard image"} imgPath={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"} />
                    {/* <img class="w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg" alt="dashboard image" />
                    <img class="w-full hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg" alt="dashboard image" /> */}
                </div>
>>>>>>>>> Temporary merge branch 2
            </section>
        </>
    )
}
