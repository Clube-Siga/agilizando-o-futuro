import Row from "../../Components/Row/Row";
import Title from "../../Components/Title/Title";

import { Head, Link, useForm } from '@inertiajs/react';

export default function Register({registerClass, imgCtaUrl}) {
  
    return (
        <>
            <section id="register" className={registerClass}>
                <div className="flex flex-col justify-center py-8 px-4 mx-auto lg:py-16 lg:px-6 ">
                    <div className="grid gap-4 mb-6 lg:mb-16 md:grid-cols-1">
                        <Row rowClass={"w-full flex justify-center"}>
                            <Title
                                titleClass={
                                    "mb-2 text-4xl tracking-tight font-extrabold font-body text-secondary dark:text-defaultW"
                                }
                                titleContent={"Seja um Aluno do Projeto"}
                            />
                        </Row>
                    </div>
                    <div className="gap-8 items-center py-4 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                        <img className="w-full dark:hidden" src={imgCtaUrl} alt="Curso Agile Developer"/>
                        <img className="w-full hidden dark:block" src={imgCtaUrl} alt="Curso Agile Developer"/>
                        <div className="mt-4 md:mt-0">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Upskill de Graça! Invista no Seu Futuro - Aberto a Todos!</h2>
                            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">Vagas Limitadas! Enfrentando barreiras financeiras para a educação? Podemos ajudar. Inscreva-se hoje e veja se você se qualifica para nosso programa gratuito.</p>
                            <Link href={route('register')} className="inline-flex items-center text-white bg-blue-900 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
                                Inscreva-se Agora
                                <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
