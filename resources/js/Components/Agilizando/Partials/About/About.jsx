import BigCard from "../../Components/BigCard/BigCard";
import Button from "../../Components/Button/Button";
import Image from "../../Components/Image/Image";
import Title from "../../Components/Title/Title";

export default function About() {
    return (
        <>
<<<<<<< HEAD
            <section class="bg-white dark:bg-gray-900">
                <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                <div class="grid gap-4 mb-6 lg:mb-16 md:grid-cols-2">
                         <Image altText={"dashboard image"} imgPath={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"} />
                         <div class="flex flex-col justify-center">
                            <Title titleContent={'Sobre o projeto'} />
                            <p class="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">Flowbite helps you connect with friends and communities of people who share your interests. Connecting with your friends and family as well as discovering new ones is easy with features like Groups.</p>
                         </div>
                         
                    </div>
                    <div class="grid gap-8 mb-6 lg:mb-16 md:grid-cols-4">
=======
            <section id="about" className={aboutClass}>
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                    <Row rowClass={"grid gap-8 mb-6 lg:mb-16 md:grid-cols-2"}>
                        <Image
                            altText={"about image"}
                            imgPath={
                                "https://raw.githubusercontent.com/Clube-Siga/agilizando-o-futuro/dae4887685c4aaa76769f3a96c6e54f97af21aa0/resources/images/image-about.png"
                            }
                        />
                        <div className="flex flex-col justify-center">
                            <Title
                                titleClass={
                                    "font-body mb-4 text-4xl tracking-tight font-extrabold text-defaultW dark:text-defaultW"
                                }
                                titleContent={"Sobre o Projeto"}
                            />
                            <Text
                                textClass={
                                    "font-body mb-6 font-light text-defaultW md:text-lg dark:text-primary"
                                }
                                textContent={
                                    "O Agilizando o Futuro é um projeto social criado para preparar jovens e adultos para o mercado de trabalho na área de desenvolvimento de software. Através de cursos gratuitos e treinamentos práticos, o projeto visa democratizar o acesso à educação tecnológica e preparar indivíduos para carreiras promissoras na era digital."
                                }
                            />
                        </div>
                    </Row>
                    {/*Row*/}
                    <Row
                        rowClass={
                            "grid grid-rows-3 gap-8 mb-6 sm:mb-16 sm:flex sm:flex-row sm:flex-3"
                        }
                    >
>>>>>>> jean
                        <BigCard
                            altText={"mission image"}
                            contentText={
                                "A missão do Agilizando o Futuro é qualificar jovens e adultos de comunidades carentes e abri-lhes portas para um futuro promissor na área de desenvolvimento de software. Através da educação de qualidade e do treinamento prático, o projeto busca transformar vidas e impulsionar o desenvolvimento social."
                            }
                            imgPath={
                                "https://raw.githubusercontent.com/Clube-Siga/agilizando-o-futuro/1bcf63a5f2a5fbd625f57b6fb40a4c25d0a919c0/resources/images/image-card-mission.jpg"
                            }
<<<<<<< HEAD
=======
                            titleClass={
                                "text-xl font-bold font-body tracking-tight text-defaultW dark:text-defaultB mb-4 mt-2"
                            }
>>>>>>> jean
                            titleContent={"Missão"}
                        />
                        <BigCard
                            altText={"objective image"}
                            contentText={
                                "O objetivo principal do Agilizando o Futuro é capacitar jovens e adultos, oferecendo cursos gratuitos de desenvolvimento de software e treinamentos práticos em tecnologias relevantes para o mercado. O projeto também visa criar uma rede de apoio para seus participantes, conectando-os a oportunidades de emprego e estágios."
                            }
                            imgPath={
                                "https://raw.githubusercontent.com/Clube-Siga/agilizando-o-futuro/1bcf63a5f2a5fbd625f57b6fb40a4c25d0a919c0/resources/images/image-card-objective.jpg"
                            }
<<<<<<< HEAD
=======
                            titleClass={
                                "text-xl font-bold font-body tracking-tight text-defaultW dark:text-defaultB mb-4 mt-2"
                            }
>>>>>>> jean
                            titleContent={"Objetivo"}
                        />
                        <BigCard
                            altText={"team image"}
                            contentText={
                                "O 'Agilizando o Futuro' é composto por uma equipe dedicada, formada por profissionais experientes em desenvolvimento de software, educação e gestão social. Acreditamos que a educação é a chave para a transformação social e estamos comprometidos em oferecer oportunidades que possibilitem a inclusão e o desenvolvimento profissional de jovens e adultos."
                            }
                            imgPath={
                                "https://raw.githubusercontent.com/Clube-Siga/agilizando-o-futuro/1bcf63a5f2a5fbd625f57b6fb40a4c25d0a919c0/resources/images/image-card-team.jpeg"
                            }
<<<<<<< HEAD
                            titleContent={"Team"}
=======
                            titleClass={
                                "text-xl font-bold font-body tracking-tight text-defaultW dark:text-defaultB mb-4 mt-2"
                            }
                            titleContent={"Time"}
>>>>>>> jean
                        />
                      
                    
                    </div>
                </div>
            </section>
        </>
    );
}
