import Button from "../../Components/Button/Button";
import Headline from "../../Components/Headline/Headline";
import Image from "../../Components/Image/Image";
import Row from "../../Components/Row/Row";
export default function Hero({heroClass}){
    return (
        <section className={heroClass}>
            <Row rowClass={"flex flex-col justify-center w-full px-4 py-8 mt-12 mx-auto gap-4 items-center md:flex-row md:space-around md:min-w-screen-md lg:gap-8 xl:gap-0 lg:py-16"}>
                <div className="items-center justify-center w-5/6 ml-6 mb-2 flex-1 flex-col md:space-around lg:col-span-7">
                    <Headline headline={"Agilizando o Futuro. Capacitação em tecnologia para todos!"} />
                    <Button buttonClass={"flex items-center justify-center self-center mb-2 h-3/6 w-7/12 px-2 mr-1 text-sm font-body font-small text-center text-defaultW rounded-3xl bg-primary hover:border hover:border-secondary hover:text-secondary hover:bg-defaultW focus:ring-4 focus:ring-defaultW dark:focus:ring-secondary sm:px-5 sm:py-3 sm:mr-3 md:text-lg"} path={"#cta"} title={"Comece aqui"} />
                </div>
                <div className="flex mt-0 col-span-1 max-w-sm flex-1 md:mt-0 md:col-span-5 md:flex md:max-w-screen-md">
                    <Image altText={"hero image"} imgPath={"https://raw.githubusercontent.com/Clube-Siga/agilizando-o-futuro/dae4887685c4aaa76769f3a96c6e54f97af21aa0/resources/images/image-hero.png"}/>
                </div>
            </Row>
        </section>
    )
}