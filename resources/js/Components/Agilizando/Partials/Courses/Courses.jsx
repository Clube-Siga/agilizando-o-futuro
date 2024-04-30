import CarouselCard from "../../Components/CarouselCard/CarouselCard";
import Carousel from "../../Components/Carousel/Carousel";
import Row from "../../Components/Row/Row";
import Title from "../../Components/Title/Title";
export default function Courses({coursesClass}){
    return (
        <>
            <section id="courses" className={coursesClass}>
                <div className="flex flex-col justify-center py-8 px-4 mx-auto lg:py-16 lg:px-6 ">
                    <div className="grid gap-4 mb-6 lg:mb-16 md:grid-cols-1">
                        <Row rowClass={"w-full flex justify-center"}>
                            <Title
                                titleClass={
                                    "mb-4 text-4xl tracking-tight font-extrabold font-body text-secondary dark:text-defaultW"
                                }
                                titleContent={"Nosso Cursos"}
                            />
                        </Row>
                    </div>
                    <Carousel className={"grid grid-rows-1 mx-4"}>
                        {/*Row*/}
                            <CarouselCard
                                altText={"Bonnie Avatar"}
                                buttonPath={"#"}
                                buttonTitle={"Curso HTML"}
                                contentText={
                                    "Aprenda HTML do zero e torne-se capaz de criar páginas web completas e estruturadas, utilizando as últimas práticas e recursos."
                                }
                                imgPath={
                                    "https://danieldigital.com.br/wp-content/uploads/2019/06/html5-tags-semanticas-estrutura-site-seo.jpg"
                                }
                                titleClass={
                                    "ml-3 mb-3 text-xl font-extrabold tracking-tight text-defaultB sm:mr-2 dark:text-defaultB"
                                }
                                titleContent={"Domine a linguagem base da web e construa sites incríveis!"}
                            />
                            <CarouselCard
                            buttonPath={"#"}
                            buttonTitle={"Inscreva-se"}
                                altText={"Curso CSS"}
                                contentText={
                                    "Domine as técnicas de CSS para estilizar seus sites, criar layouts profissionais e proporcionar uma ótima experiência do usuário."
                                }
                                imgPath={
                                    "https://www.devmedia.com.br/arquivos/cursos/css_intro_2426/thumb.png"
                                }
                                titleClass={
                                    "ml-3 mb-3 text-xl font-extrabold tracking-tight text-defaultB sm:mr-2 dark:text-defaultB"
                                }
                                titleContent={"Dê vida aos seus sites com CSS e torne-os visualmente atraentes!"}
                            />
                            <CarouselCard
                                altText={"Curso JavaScript"}
                                buttonPath={"#"}
                                buttonTitle={"Inscreva-se"}
                                contentText={
                                    "Aprenda JavaScript e adicione funcionalidades interativas aos seus sites, criando efeitos visuais, animações e elementos dinâmicos."
                                }
                                imgPath={
                                    "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                                }
                                titleClass={
                                    "ml-3 mb-3 text-xl font-extrabold tracking-tight text-defaultB sm:mr-2 dark:text-defaultB"
                                }
                                titleContent={"Interaja com seus sites e torne-os dinâmicos com JavaScript!"}
                            />
                            <CarouselCard
                                altText={"Curso PHP"}
                                buttonPath={"#"}
                                buttonTitle={"Inscreva-se"}
                                contentText={
                                    "Aprenda PHP e conecte seus sites a bancos de dados MySQL para criar páginas dinâmicas, sistemas de login e outras funcionalidades avançadas."
                                }
                                imgPath={
                                    "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"
                                }
                                titleClass={
                                    "ml-3 mb-3 text-xl font-extrabold tracking-tight text-defaultB sm:mr-2 dark:text-defaultB"
                                }
                                titleContent={"Crie sites dinâmicos e interativos com PHP e MySQL!"}
                            />
                            <CarouselCard
                                altText={"Curso MySQL"}
                                buttonPath={"#"}
                                buttonTitle={"Inscreva-se"}
                                contentText={
                                    "Aprenda MySQL, um dos sistemas de gerenciamento de banco de dados mais utilizados, para armazenar, organizar e consultar dados de forma eficiente."
                                }
                                imgPath={
                                    "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
                                }
                                titleClass={
                                    "ml-3 mb-3 text-xl font-extrabold tracking-tight text-defaultB sm:mr-2 dark:text-defaultB"
                                }
                                titleContent={"Armazene e gerencie dados com eficiência utilizando MySQL!"}
                            />
                            <CarouselCard
                                altText={"Curso Java"}
                                buttonPath={"#"}
                                buttonTitle={"Inscreva-se"}
                                contentText={
                                    "Aprenda Java, uma das linguagens de programação mais populares do mundo, e torne-se capaz de criar aplicações web, desktop e mobile."
                                }
                                imgPath={
                                    "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sofia-mcguire.png"
                                }
                                titleClass={
                                    "ml-3 mb-3 text-xl font-extrabold tracking-tight text-defaultB sm:mr-2 dark:text-defaultB"
                                }
                                titleContent={"Domine a linguagem Java e desenvolva aplicações robustas e escaláveis!"}
                            />
                            <CarouselCard
                                altText={"Curso Git e Github"}
                                buttonPath={"#"}
                                buttonTitle={"Inscreva-se"}
                                contentText={
                                    "Aprenda a usar Git e Github para versionar seu código, controlar alterações, colaborar com outros desenvolvedores e hospedar seus projetos em nuvem."
                                }
                                imgPath={
                                    "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/thomas-lean.png"
                                }
                                titleClass={
                                    "ml-3 mb-3 text-xl font-extrabold tracking-tight text-defaultB sm:mr-2 dark:text-defaultB"
                                }
                                titleContent={"Versionamento de código e colaboração em equipe com Git e Github!"}
                            />
                            <CarouselCard
                            buttonPath={"#"}
                            buttonTitle={"Inscreva-se"}
                                altText={"Curso Primeiros Passos"}
                                contentText={
                                    "Aprenda os conceitos básicos da programação, lógica e algoritmos, utilizando uma linguagem de programação de sua preferência."
                                }
                                imgPath={
                                    "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png"
                                }
                                titleClass={
                                    "ml-3 mb-3 text-xl font-extrabold tracking-tight text-defaultB sm:mr-2 dark:text-defaultB"
                                }
                                titleContent={"Dê seus primeiros passos no mundo da programação e desvende seus segredos!"}
                            />
                    </Carousel>
                </div>
            </section>
        </>
    )
}
