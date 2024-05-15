import Button from "../../Components/Button/Button";
import Image from "../../Components/Image/Image";
import Row from "../../Components/Row/Row";
import Text from "../../Components/Text/Text";
import Title from "../../Components/Title/Title";

export default function DonationSection({sectionClass}){
    return(<>
        <section className={sectionClass}>
                <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                    <Row rowClass={"font-light text-primary-500 sm:text-lg dark:text-primary-400"}>
                        <Title titleClass={"mb-4 text-4xl tracking-tight font-extrabold text-primary-900 dark:text-white"} titleContent={"Faça uma simples doação"}/>
                        <Text textClass={"mb-4"} textContent={"Doe de forma rápida e prática, quanto e quando puder. Sua colaboração irá ajudar a transformar o futuro de jovens e adultos por meio da capacitação em tecnologia."}/>
                        <button className="font-body inline-flex items-center justify-center px-5 py-3 mr-3 mb-3 text-base font-medium text-center text-defaultW rounded-3xl bg-primary hover:bg-secondary hover:text-defaultW focus:ring-2 focus:ring-defaultW dark:focus:ring-primary" title={"Doe aqui"}><a href="https://link.mercadopago.com.br/agilizandoofuturo" target="_blank">Doe aqui</a></button>
                    </Row>
                    <Row rowClass={"grid grid-cols-2 gap-4 mt-8"}>
                        <Image altText={"office content 1"} imgClass={"w-full rounded-lg"} imgPath={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"}/>
                        <Image altText={"office content 2"} imgClass={"mt-4 w-full lg:mt-10 rounded-lg"} imgPath={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"}/>
                    </Row>
                </div>
            </section>
    </>)
}
