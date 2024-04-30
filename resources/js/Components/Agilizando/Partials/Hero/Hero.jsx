import Button from "../../Components/Button/Button";
import Headline from "../../Components/Headline/Headline";
import Image from "../../Components/Image/Image";
export default function Hero(){
    return (
<<<<<<< HEAD
        <section className="bg-white dark:bg-gray-900 flex-wrap">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <Headline headline={"Agilizando o futuro"} />
                    <Button buttonClass={"inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"} path={"#about"} title={"Comece aqui"} />
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex lg:max-w-screen-lg sm:flex sm:mt-0 sm:col-span-1 sm:max-w-screen-sm">
                    <Image altText={"mockup"} imgPath={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"}/>
=======
        <section className={heroClass}>
            <Row rowClass={"flex flex-col justify-center w-full px-4 py-8 mt-12 mx-auto gap-4 items-center md:flex-row md:space-around md:min-w-screen-md lg:gap-8 xl:gap-0 lg:py-16"}>
                <div className="items-center justify-center w-5/6 ml-6 mb-2 flex-1 flex-col md:space-around lg:col-span-7">
                    <Headline headline={"Agilizando o Futuro. Capacitação em tecnologia para todos!"} />
                    <Button buttonClass={"flex items-center justify-center self-center mb-2 h-3/6 w-7/12 px-2 mr-1 text-sm font-body font-small text-center text-defaultW rounded-3xl bg-primary hover:border hover:border-secondary hover:text-secondary hover:bg-defaultW focus:ring-4 focus:ring-defaultW dark:focus:ring-secondary sm:px-5 sm:py-3 sm:mr-3 md:text-lg"} path={"#cta"} title={"Comece aqui"} />
                </div>
                <div className="flex mt-0 col-span-1 max-w-sm flex-1 md:mt-0 md:col-span-5 md:flex md:max-w-screen-md">
                    <Image altText={"hero image"} imgPath={"https://raw.githubusercontent.com/Clube-Siga/agilizando-o-futuro/dae4887685c4aaa76769f3a96c6e54f97af21aa0/resources/images/image-hero.png"}/>
>>>>>>> jean
                </div>
            </div>
        </section>
    )
}
