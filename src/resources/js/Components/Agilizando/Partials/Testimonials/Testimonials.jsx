import { Link } from "@inertiajs/react";
import Testimonial from "../../Components/Testimonial/Testimonial";
import Text from "../../Components/Text/Text";
import Title from "../../Components/Title/Title";
import Content from "../../Components/Content/Content";

export default function Testimonials({testimonialsClass}){
    return(<>


        <section className={testimonialsClass}>
                <Content contentClass={"py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6"}>
                    <Content contentClass={"mx-auto max-w-screen-sm"}>
                        <Title titleClass={"mb-4 text-4xl tracking-tight font-extrabold text-primary-900 dark:text-white"} titleContent={"Testimonials"}/>
                        <Text textClass={"mb-8 font-light text-primary-500 lg:mb-16 sm:text-xl dark:text-primary-400"} textContent={"Explore the whole collection of open-source web components and elements built with the utility classes from Tailwind"}/>
                    </Content>
                    <Content contentClass={"grid mb-8 lg:mb-12 lg:grid-cols-2"}>
                        <Testimonial personImgPath={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"} personName={"Bonnie Green"} personRole={"Developer at Open AI"} testimonialP1={"'I recently got my hands on Flowbite Pro, and holy crap, I'm speechless with how easy this was to integrate within my application. Most templates are a pain, code is scattered, and near impossible to theme."} testimonialP2={"Flowbite has code in one place and I'm not joking when I say it took me a matter of minutes to copy the code, customise it and integrate within a Laravel + Vue application."} testimonialP3={"If you care for your time, I hands down would go with this.'"} testimonialTitle={"Speechless with how easy this was to integrate"}/>
                        <Testimonial personImgPath={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"} personName={"Bonnie Red"} personRole={"Developer at Open AI"} testimonialP1={"'I recently got my hands on Flowbite Pro, and holy crap, I'm speechless with how easy this was to integrate within my application. Most templates are a pain, code is scattered, and near impossible to theme."} testimonialP2={"Flowbite has code in one place and I'm not joking when I say it took me a matter of minutes to copy the code, customise it and integrate within a Laravel + Vue application."} testimonialP3={"If you care for your time, I hands down would go with this.'"} testimonialTitle={"Speechless with how easy this was to integrate"}/>
                        <Testimonial personImgPath={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"} personName={"Bonnie Yellow"} personRole={"Developer at Open AI"} testimonialP1={"'I recently got my hands on Flowbite Pro, and holy crap, I'm speechless with how easy this was to integrate within my application. Most templates are a pain, code is scattered, and near impossible to theme."} testimonialP2={"Flowbite has code in one place and I'm not joking when I say it took me a matter of minutes to copy the code, customise it and integrate within a Laravel + Vue application."} testimonialP3={"If you care for your time, I hands down would go with this.'"} testimonialTitle={"Speechless with how easy this was to integrate"}/>
                        <Testimonial personImgPath={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"} personName={"Bonnie Purple"} personRole={"Developer at Open AI"} testimonialP1={"'I recently got my hands on Flowbite Pro, and holy crap, I'm speechless with how easy this was to integrate within my application. Most templates are a pain, code is scattered, and near impossible to theme."} testimonialP2={"Flowbite has code in one place and I'm not joking when I say it took me a matter of minutes to copy the code, customise it and integrate within a Laravel + Vue application."} testimonialP3={"If you care for your time, I hands down would go with this.'"} testimonialTitle={"Speechless with how easy this was to integrate"}/>
                    </Content>
                    <Content contentClass={"text-center"}>
                        <Link
                            href="#"
                            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-primary-900 focus:outline-none bg-white rounded-lg border border-primary-200 hover:bg-primary-100 hover:text-secondary-700 focus:z-10 focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-700 dark:bg-primary-800 dark:text-primary-400 dark:border-primary-600 dark:hover:text-white dark:hover:bg-primary-700"
                        >
                            Show more...
                        </Link>
                    </Content>
                </Content>
            </section>
    </>)
}
