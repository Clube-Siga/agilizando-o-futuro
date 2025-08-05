import Image from "../../Components/Image/Image";
import Row from "../../Components/Row/Row";
import Text from "../../Components/Text/Text";
import Title from "../../Components/Title/Title";

export default function Section({sectionClass}){
    return(<>
        <section className={sectionClass}>
                <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                    <Row rowClass={"font-light text-primary-500 sm:text-lg dark:text-primary-400"}>
                        <Title titleClass={"mb-4 text-4xl tracking-tight font-extrabold text-primary-900 dark:text-white"} titleContent={"We didn't reinvent the wheel"}/>
                        <Text textClass={"mb-4"} textContent={"We are strategists, designers and developers.                          Innovators and problem solvers. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need."}/>
                        <Text textContent={"We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick."}/>
                    </Row>
                    <Row rowClass={"grid grid-cols-2 gap-4 mt-8"}>
                        <Image altText={"office content 1"} imgClass={"w-full rounded-lg"} imgPath={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"}/>
                        <Image altText={"office content 2"} imgClass={"mt-4 w-full lg:mt-10 rounded-lg"} imgPath={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"}/>
                    </Row>
                </div>
            </section>
    </>)
}
