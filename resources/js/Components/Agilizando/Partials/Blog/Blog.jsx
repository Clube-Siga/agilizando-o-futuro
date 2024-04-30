import CarouselCard from "../../Components/CarouselCard/CarouselCard";
import Carousel from "../../Components/Carousel/Carousel";
import Title from "../../Components/Title/Title";

export default function Blog({blogClass}){
    return (
        <>
            <section id="blog" className={blogClass}>
                <div className="flex flex-col justify-center py-8 px-4 mx-auto lg:py-16 lg:px-6 ">
                    <div className="grid gap-4 mb-6 lg:mb-16 md:grid-cols-1">
                        <div className="w-full flex justify-center">
                            <Title
                                titleClass={
                                    "font-body mb-4 text-4xl tracking-tight font-extrabold text-secondary dark:text-defaultB"
                                }
                                titleContent={"Blog"}
                            />
                        </div>
                    </div>
                    <Carousel className={"grid grid-cols-3 mx-4"}>
                        {/*Row*/}
                            <CarouselCard
                                altText={"Bonnie Avatar"}
                                buttonPath={"#"}
                                buttonTitle={"Veja mais"}
                                contentText={
                                    "Bonnie drives the technical strategy of the flowbite platform and brand."
                                }
                                imgPath={
                                    "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                                }
                                titleClass={
                                    "text-xl font-bold tracking-tight text-primary-900 dark:text-white mb-4 mt-2"
                                }
                                titleContent={"Bonnie Green"}
                            />
                            <CarouselCard
                            buttonPath={"#"}
                            buttonTitle={"Veja mais"}
                                altText={"Jese Avatar"}
                                contentText={
                                    "Jese drives the technical strategy of the flowbite platform and brand."
                                }
                                imgPath={
                                    "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                                }
                                titleClass={
                                    "text-xl font-bold tracking-tight text-primary-900 dark:text-white mb-4 mt-2"
                                }
                                titleContent={"Jese Leos"}
                            />
                            <CarouselCard
                                altText={"Michael Avatar"}
                                buttonPath={"#"}
                                buttonTitle={"Veja mais"}
                                contentText={
                                    "Michael drives the technical strategy of the flowbite platform and brand."
                                }
                                imgPath={
                                    "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                                }
                                titleClass={
                                    "text-xl font-bold tracking-tight text-primary-900 dark:text-white mb-4 mt-2"
                                }
                                titleContent={"Michael Gough"}
                            />
                            <CarouselCard
                                altText={"Helene Avatar"}
                                buttonPath={"#"}
                                buttonTitle={"Veja mais"}
                                contentText={
                                    "Helene drives the technical strategy of the flowbite platform and brand."
                                }
                                imgPath={
                                    "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"
                                }
                                titleClass={
                                    "text-xl font-bold tracking-tight text-primary-900 dark:text-white mb-4 mt-2"
                                }
                                titleContent={"Helene Engels"}
                            />
                            <CarouselCard
                                altText={"Joseph Avatar"}
                                buttonPath={"#"}
                                buttonTitle={"Veja mais"}
                                contentText={
                                    "Joseph drives the technical strategy of the flowbite platform and brand."
                                }
                                imgPath={
                                    "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
                                }
                                titleClass={
                                    "text-xl font-bold tracking-tight text-primary-900 dark:text-white mb-4 mt-2"
                                }
                                titleContent={"Joseph McFall"}
                            />
                            <CarouselCard
                                altText={"Sofia Avatar"}
                                buttonPath={"#"}
                                buttonTitle={"Veja mais"}
                                contentText={
                                    "Sofia drives the technical strategy of the flowbite platform and brand."
                                }
                                imgPath={
                                    "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sofia-mcguire.png"
                                }
                                titleClass={
                                    "text-xl font-bold tracking-tight text-primary-900 dark:text-white mb-4 mt-2"
                                }
                                titleContent={"Sofia McGuire"}
                            />
                            <CarouselCard
                                altText={"Thomas Avatar"}
                                buttonPath={"#"}
                                buttonTitle={"Veja mais"}
                                contentText={
                                    "Thomas drives the technical strategy of the flowbite platform and brand."
                                }
                                imgPath={
                                    "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/thomas-lean.png"
                                }
                                titleClass={
                                    "text-xl font-bold tracking-tight text-primary-900 dark:text-white mb-4 mt-2"
                                }
                                titleContent={"Thomas Lean"}
                            />
                            <CarouselCard
                            buttonPath={"#"}
                            buttonTitle={"Veja mais"}
                                altText={"Neil Avatar"}
                                contentText={
                                    "Neil drives the technical strategy of the flowbite platform and brand."
                                }
                                imgPath={
                                    "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png"
                                }
                                titleClass={
                                    "text-xl font-bold tracking-tight text-primary-900 dark:text-white mb-4 mt-2"
                                }
                                titleContent={"Neil Sims"}
                            />
                    </Carousel>
                </div>
            </section>
        </>
    )
}
