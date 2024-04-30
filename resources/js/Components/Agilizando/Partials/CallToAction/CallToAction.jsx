import Button from "../../Components/Button/Button";
import Image from "../../Components/Image/Image";
import Title from "../../Components/Title/Title";

export default function CallToAction(){
    return (
        

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

            </section>
     
    )
}
