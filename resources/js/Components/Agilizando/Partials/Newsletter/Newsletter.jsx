import { Link } from "@inertiajs/react";
import Button from "../../Components/Button/Button";
import Content from "../../Components/Content/Content";
import Text from "../../Components/Text/Text";
import Title from "../../Components/Title/Title";

export default function Newsletter({newsletterClass}){
    return(<>
        <section id="newsletter" className={newsletterClass}>
                <Content contentClass={"py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6"}>
                    <Content contentClass={"mx-auto max-w-screen-md sm:text-center"}>
                        <Title titleClass={"mb-4 text-3xl tracking-tight font-extrabold text-primary-900 sm:text-4xl dark:text-white"} titleContent={"Sign up for our newsletter"}/>
                        <Text textClass={"mx-auto mb-8 max-w-2xl font-light text-primary-500 md:mb-12 sm:text-xl dark:text-primary-400"} textContent={"Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to sign up with your email."}/>
                        <form action="#">
                            <Content contentClass={"items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0"}>
                                <Content contentClass={"relative w-full"}>
                                    <label
                                        for="email"
                                        className="hidden mb-2 text-sm font-medium text-primary-900 dark:text-primary-300"
                                    >
                                        Email address
                                    </label>
                                    <Content contentClass={"flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"}>
                                        <svg
                                            className="w-5 h-5 text-primary-500 dark:text-primary-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                        </svg>
                                    </Content>
                                    <input
                                        className="block p-3 pl-10 w-full text-sm text-primary-900 bg-primary-50 rounded-lg border border-primary-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Enter your email"
                                        type="email"
                                        id="email"
                                        required=""
                                    />
                                </Content>
                                <Content>
                                    <Button
                                        type={"submit"}
                                        buttonClass={"py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"} title={"Subscribe"}
                                    />
                                </Content>
                            </Content>
                            <Content contentClass={"mx-auto max-w-screen-sm text-sm text-left text-primary-500 newsletter-form-footer dark:text-primary-300"}>
                                We care about the protection of your data.{" "}
                                <Link
                                    href="#"
                                    className="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                                >
                                    Read our Privacy Policy
                                </Link>
                                .
                            </Content>
                        </form>
                    </Content>
                </Content>
        </section>
    </>)
}
