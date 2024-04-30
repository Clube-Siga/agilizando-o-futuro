import Content from "../../Components/Content/Content";
import Question from "../../Components/Question/Question";
import Title from "../../Components/Title/Title";

export default function FAQ({faqClass}){
    return(<>
        <section id="faq" className={faqClass}>
                <Content contentClass={"py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6"}>
                    <Title titleClass={"mb-8 text-4xl tracking-tight font-extrabold text-primary-900 dark:text-white"} titleContent={"Frequently asked questions"}/>
                    <Content contentClass={"grid pt-8 text-left border-t border-primary-200 md:gap-16 dark:border-primary-700 md:grid-cols-2"}>
                        <Content>
                            <Question questionAnswer={"You will have access to download the full Figma project including all of the pages, the components, responsive pages, and also the icons, illustrations, and images included in the screens."} questionTitle={"What do you mean by 'Figma assets'?"}/>
                            <Question questionAnswer={"Once you have purchased either the design, code, or both packages, you will have access to all of the future updates based on the roadmap, free of charge."} questionTitle={"What does 'lifetime access' exactly mean?"}/>
                            <Question questionAnswer={"We're aware of the importance of well qualified support, that is why we decided that support will only be provided by the authors that actually worked on this project."} questionTitle={"How does support work?"}/>
                            <Question questionAnswer={"You can use Windster for an unlimited amount of projects, whether it's a personal website, a SaaS app, or a website for a client. As long as you don't build a product that will directly compete with Windster either as a UI kit, theme, or template, it's fine."} questionTitle={"I want to build more than one project. Is that allowed?"}/>
                        </Content>
                        <Content>
                            <Question questionAnswer={"You will have access to download the full Figma project including all of the pages, the components, responsive pages, and also the icons, illustrations, and images included in the screens."} questionTitle={"What do you mean by 'Figma assets'?"}/>
                            <Question questionAnswer={"Once you have purchased either the design, code, or both packages, you will have access to all of the future updates based on the roadmap, free of charge."} questionTitle={"What does 'lifetime access' exactly mean?"}/>
                            <Question questionAnswer={"We're aware of the importance of well qualified support, that is why we decided that support will only be provided by the authors that actually worked on this project."} questionTitle={"How does support work?"}/>
                            <Question questionAnswer={"You can use Windster for an unlimited amount of projects, whether it's a personal website, a SaaS app, or a website for a client. As long as you don't build a product that will directly compete with Windster either as a UI kit, theme, or template, it's fine."} questionTitle={"I want to build more than one project. Is that allowed?"}/>
                        </Content>
                    </Content>
                </Content>
            </section>
    </>)
}
