import Button from "../../Components/Button/Button";
import Image from "../../Components/Image/Image";
import Row from "../../Components/Row/Row";
import Text from "../../Components/Text/Text";
import Title from "../../Components/Title/Title";

export default function CallToAction({ctaClass}){
    return (
        <>
            <section id="cta" className={ctaClass}>
                <Row rowClass={"gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6"}>
                    <div className="mt-4 md:mt-0">
                        <Title titleClass={"mb-4 text-4xl tracking-tight font-extrabold text-primary dark:text-defaultW"} titleContent={"Let's create more tools and ideas that brings us together."}/>
                        <Text textClass={"mb-3 font-light text-primary md:text-lg dark:text-defaultW"} textContent={"Flowbite helps you connect with friends and communities of people who share your interests. Connecting with your friends and family as well as discovering new ones is easy with features like Groups."}/>
                        <Button buttonClass={"inline-flex items-center justify-center px-5 py-3 mr-3 mb-3 text-base font-medium text-center text-white rounded-lg bg-support hover:bg-secondary focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"} path={"#"} title={"Comece aqui"} />
                    </div>
                    <Image altText={"dashboard image"} imgPath={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"} />
                    {/* <img className="w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg" alt="dashboard image" />
                    <img className="w-full hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg" alt="dashboard image" /> */}
                </Row>
            </section>
        </>
    )
}
