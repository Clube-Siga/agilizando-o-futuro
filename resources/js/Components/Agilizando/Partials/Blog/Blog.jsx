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
                                imgPath={
                                    "https://raw.githubusercontent.com/Clube-Siga/agilizando-o-futuro/dae4887685c4aaa76769f3a96c6e54f97af21aa0/resources/images/image-blog.png"
                                }
                                titleClass={
                                    "text-xl font-bold tracking-tight text-defaultW dark:text-white mb-4 mt-2"
                                }
                                titleContent={"Conheça a primeira turma do Agilizando o Futuro"}
                            />
                    </Carousel>
                </div>
            </section>
        </>
    )
}
