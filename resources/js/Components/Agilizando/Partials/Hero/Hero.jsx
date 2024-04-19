import Button from "../../Components/Button/Button";
import Headline from "../../Components/Headline/Headline";
import Image from "../../Components/Image/Image";
export default function Hero(){
    return (
        <section className="bg-white dark:bg-gray-900 flex-wrap">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <Headline headline={"Payments tool for software companies"} />
                    <Button path={"#about"} title={"Comece aqui"} />
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex lg:max-w-screen-lg sm:flex sm:mt-0 sm:col-span-1 sm:max-w-screen-sm">
                    <Image altText={"mockup"} imgPath={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"}/>
                </div>
            </div>
        </section>
    )
}
