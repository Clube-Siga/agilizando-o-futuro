import Button from "../../Components/Button/Button";
import Headline from "../../Components/Headline/Headline";
import Image from "../../Components/Image/Image";
import Row from "../../Components/Row/Row";
export default function Hero({heroClass}){
    return (
        <section className={heroClass}>
            <Row rowClass={"flex justify-center w-full px-4 py-8 mt-12 mx-auto gap-4 sm:flex-col sm:items-center md:flex-row md:space-around md:min-w-screen-md lg:gap-8 xl:gap-0 lg:py-16"}>
                <div className="flex justify-center w-full mr-auto flex-1 place-self-center sm:flex-col  sm:items-center md:space-around lg:col-span-7">
                    <Headline headline={"Agilizando o Futuro"} />
                    <Button buttonClass={"inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"} path={"#cta"} title={"Comece aqui"} />
                </div>
                <div className="hidden flex-1 md:mt-0 md:col-span-5 md:flex md:max-w-screen-md sm:flex sm:mt-0 sm:col-span-1 sm:max-w-sm">
                    <Image altText={"mockup"} imgPath={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"}/>
                </div>
            </Row>
        </section>
    )
}
