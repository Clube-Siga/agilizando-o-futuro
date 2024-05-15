import Button from "../../Components/Button/Button";
import Image from "../../Components/Image/Image";
import Row from "../../Components/Row/Row";
import Text from "../../Components/Text/Text";
import Title from "../../Components/Title/Title";

export default function DonationSection2({sectionClass}){
    return(<>
        <section className={sectionClass}>
                    <Row rowClass={"grid grid-cols-2 gap-4 mt-8"}>
                        <Image altText={"office content 1"} imgClass={"w-full rounded-lg"} imgPath={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"}/>
                        <Image altText={"office content 2"} imgClass={"mt-4 w-full lg:mt-10 rounded-lg"} imgPath={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"}/>
                    </Row>
                    <Row rowClass={"font-light text-defaultW sm:text-lg dark:text-primary-400"}>
                        <Title titleClass={"mb-4 text-4xl tracking-tight font-extrabold text-primary-900 dark:text-white"} titleContent={"Faça doações mensais"}/>
                        <Text textClass={"mb-4"} textContent={"Doe um valor da sua escolha de forma mensal. Com a assinatura mensal você pode gerar um plano onde será debitado o valor escolhido. Assim você pode ajudar constantemente na transformação de vidas."}/>
                        <button className="font-body inline-flex items-center justify-center px-5 py-3 mr-3 mb-3 text-base font-medium text-center text-defaultW rounded-3xl bg-primary hover:bg-secondary hover:text-defaultW focus:ring-2 focus:ring-defaultW dark:focus:ring-primary" title={"Doe aqui"}><a href="https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=2c9380848f6159a1018f66fa600a01c8" target="_blank">Doe aqui</a></button>
                    </Row>
            </section>
    </>)
}
