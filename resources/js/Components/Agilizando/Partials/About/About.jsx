import BigCard from "../../Components/BigCard/BigCard";
import Image from "../../Components/Image/Image";
import Row from "../../Components/Row/Row";
import Text from "../../Components/Text/Text";
import Title from "../../Components/Title/Title";

export default function About({aboutClass}) {
    return (
        <>
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
                        <BigCard
                            altText={"mission image"}
                            contentText={
                                "A missão do Agilizando o Futuro é qualificar jovens e adultos de comunidades carentes e abri-lhes portas para um futuro promissor na área de desenvolvimento de software. Através da educação de qualidade e do treinamento prático, o projeto busca transformar vidas e impulsionar o desenvolvimento social."
                            }
                            imgPath={
                                "https://raw.githubusercontent.com/Clube-Siga/agilizando-o-futuro/1bcf63a5f2a5fbd625f57b6fb40a4c25d0a919c0/resources/images/image-card-mission.jpg"
                            }
                            titleClass={
                                "text-xl font-bold font-body tracking-tight text-defaultW dark:text-defaultB mb-4 mt-2"
                            }
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
                            titleClass={
                                "text-xl font-bold font-body tracking-tight text-defaultW dark:text-defaultB mb-4 mt-2"
                            }
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
                            titleClass={
                                "text-xl font-bold font-body tracking-tight text-defaultW dark:text-defaultB mb-4 mt-2"
                            }
                            titleContent={"Time"}
                        />
                    </Row>
                </div>
            </section>
        </>
    );
}
