import Button from "../../Components/Button/Button";
import Headline from "../../Components/Headline/Headline";
import Image from "../../Components/Image/Image";
import Row from "../../Components/Row/Row";
export default function Hero({heroClass}){
    return (
        <section className={heroClass}>
            <Row rowClass={"grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12"}>
                <div className="mr-auto place-self-center lg:col-span-7">
                    <Headline headline={"Vencer"} />
                    <Button buttonClass={"inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"} path={"#about"} title={"Comece aqui"} />
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex lg:max-w-screen-lg sm:flex sm:mt-0 sm:col-span-1 sm:max-w-screen-sm">
                    <Image altText={"mockup"} imgPath={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"}/>
                </div>
            </Row>
        </section>
    )
}
