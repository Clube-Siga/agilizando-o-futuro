import Card from "../../Components/Card/Card";
import Carousel from "../../Components/Carousel/Carousel";
import Row from "../../Components/Row/Row";
import Title from "../../Components/Title/Title";
export default function Courses({coursesClass}){
    return (
        <>
            <section className={coursesClass}>
                <div className="flex flex-col justify-center py-8 px-4 mx-auto lg:py-16 lg:px-6 ">
                    <div className="grid gap-4 mb-6 lg:mb-16 md:grid-cols-1">
                        <Row rowClass={"w-full flex justify-center"}>
                            <Title
                                titleClass={
                                    "mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
                                }
                                titleContent={"Nosso Cursos"}
                            />
                        </Row>
                    </div>
                    <Carousel>
                        {/*Row*/}
                        <Row rowClass={"grid grid-cols-3 gap-8 mb-6 lg:mb-16 md:grid-cols-3"}>
                            <Card
                                altText={"Bonnie Avatar"}
                                contentText={
                                    "Bonnie drives the technical strategy of the flowbite platform and brand."
                                }
                                imgPath={
                                    "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                                }
                                titleClass={
                                    "text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 mt-2"
                                }
                                titleContent={"Bonnie Green"}
                            />
                            <Card
                                altText={"Jese Avatar"}
                                contentText={
                                    "Jese drives the technical strategy of the flowbite platform and brand."
                                }
                                imgPath={
                                    "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                                }
                                titleClass={
                                    "text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 mt-2"
                                }
                                titleContent={"Jese Leos"}
                            />
                            <Card
                                altText={"Michael Avatar"}
                                contentText={
                                    "Michael drives the technical strategy of the flowbite platform and brand."
                                }
                                imgPath={
                                    "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                                }
                                titleClass={
                                    "text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 mt-2"
                                }
                                titleContent={"Michael Gough"}
                            />
                        </Row>
                        <Row rowClass={"grid grid-cols-3 gap-8 mb-6 lg:mb-16 md:grid-cols-3"}>
                            <Card
                                altText={"Helene Avatar"}
                                contentText={
                                    "Helene drives the technical strategy of the flowbite platform and brand."
                                }
                                imgPath={
                                    "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"
                                }
                                titleClass={
                                    "text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 mt-2"
                                }
                                titleContent={"Helene Engels"}
                            />
                            <Card
                                altText={"Joseph Avatar"}
                                contentText={
                                    "Joseph drives the technical strategy of the flowbite platform and brand."
                                }
                                imgPath={
                                    "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
                                }
                                titleClass={
                                    "text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 mt-2"
                                }
                                titleContent={"Joseph McFall"}
                            />
                            <Card
                                altText={"Sofia Avatar"}
                                contentText={
                                    "Sofia drives the technical strategy of the flowbite platform and brand."
                                }
                                imgPath={
                                    "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sofia-mcguire.png"
                                }
                                titleClass={
                                    "text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 mt-2"
                                }
                                titleContent={"Sofia McGuire"}
                            />
                        </Row>
                        <Row rowClass={"grid grid-cols-3 gap-8 mb-6 lg:mb-16 md:grid-cols-3"}>
                            <Card
                                altText={"Thomas Avatar"}
                                contentText={
                                    "Thomas drives the technical strategy of the flowbite platform and brand."
                                }
                                imgPath={
                                    "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/thomas-lean.png"
                                }
                                titleClass={
                                    "text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 mt-2"
                                }
                                titleContent={"Thomas Lean"}
                            />
                            <Card
                                altText={"Neil Avatar"}
                                contentText={
                                    "Neil drives the technical strategy of the flowbite platform and brand."
                                }
                                imgPath={
                                    "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png"
                                }
                                titleClass={
                                    "text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 mt-2"
                                }
                                titleContent={"Neil Sims"}
                            />
                        </Row>
                    </Carousel>
                </div>
            </section>
        </>
    )
}
