import {formatPhoneNumber } from '@/Utils/utils';
import { useForm } from '@inertiajs/react';
import Content from "../../Components/Content/Content";
import Label from "../../Components/Label/Label";
import Text from "../../Components/Text/Text";
import Title from "../../Components/Title/Title";
import {formatPhoneNumber} from "@/Utilis/utilis";

export default function Contact({contactClass}){
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        email: '',
        subject: '',
        formMessage: '',
    });
    
    function submit(e) {
        e.preventDefault(); // Prevent default form submission

        // Send form data to the server using Inertia
        post(route('contact.store'), data, {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                },
                onError: () => {
                    errors();
                },

            }
        );
    }
    
    return (
        <>
            <section id="contact" className={contactClass}>
<<<<<<< HEAD
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <Title titleClass={"mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white"} titleContent={"Contacte-nos"}/>
                    <Text textClass={"mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl"} textContent={"Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know."}/>
                    
                    <form onSubmit={submit} className="space-y-8">

                    <div>
=======
                <div className="py-8 px-4 mx-auto max-w-screen-md lg:py-16">
                    <Title titleClass={"font-body mb-4 text-4xl tracking-tight font-extrabold text-center text-defaultW dark:text-defaultW"} titleContent={"Entre em Contanto"}/>
                    <Text textClass={"font-body mb-8 font-light text-center text-defaultW lg:mb-16 sm:text-xl dark:text-primary"} textContent={"Está com algum problema técnico? Gostaria de enviar um feedback sobre a plataforma? Gostaria de mais detalhes sobre o projeto? Fale conosco"}/>

                    <form onSubmit={submit} className="space-y-3">
                        <div>
>>>>>>> jean
                            <Label objective={"name"}>
                                Seu nome
                            </Label>
                            <input
                                value={data.name}
                                onChange={(event) => setData('name', event.target.value)}
                                type="name"
                                id="name"
                                className="font-body shadow-sm bg-defaultW border border-secondary text-defaultB text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-secondary dark:border-primary placeholder-primary dark:placeholder-primary-400 dark:text-defaultW dark:focus:ring-primary dark:focus:border-primary dark:shadow-sm-light"
                                placeholder="Seu nome aqui"
                                required
                            />
                             {errors.name && <div>{errors.name}</div>}
                        </div>

                        <div>
                            <Label objective={"phone"}>
                                Seu whatsapp
                            </Label>
                            <input
                                value={formatPhoneNumber(data.phone)}
                                onChange={(event) => setData('phone', event.target.value)}
                                type="phone"
                                id="phone"
                                className="font-body shadow-sm bg-defaultW border border-secondary text-defaultB text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-secondary dark:border-primary placeholder-primary dark:placeholder-primary-400 dark:text-defaultW dark:focus:ring-primary dark:focus:border-primary dark:shadow-sm-light"
                                placeholder="(99) 99999-9999"
                                required
                            />
                             {errors.phone && <div>{errors.phone}</div>}
                        </div>

                        <div>
                            <Label objective={"email"}>
                                Seu email
                            </Label>
                            <input
                                value={data.email}
                                onChange={(event) => setData('email', event.target.value)}
                                type="email"
                                id="email"
<<<<<<< HEAD
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                placeholder="nome@agilizando.com"
=======
                                className="font-body shadow-sm bg-defaultW border border-secondary text-defaultB text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-secondary dark:border-primary placeholder-primary dark:placeholder-primary-400 dark:text-defaultW dark:focus:ring-primary dark:focus:border-primary dark:shadow-sm-light"
                                placeholder="agilizando@clubesiga.com"
>>>>>>> jean
                                required
                            />
                             {errors.email && <div>{errors.email}</div>}
                        </div>
                        <div>
                            <Label objective={"subject"}>
                               Assunto
                            </Label>
                            <input
                                value={data.subject}
                                onChange={(event) => setData('subject', event.target.value)}
                                type="text"
                                id="subject"
<<<<<<< HEAD
                                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                placeholder="Deixe-nos saber como podemos ajudá-lo"
=======
                                className=" font-body block p-3 w-full text-sm text-defaultW bg-defaultW rounded-lg border border-secondary shadow-sm focus:ring-primary focus:border-primary dark:bg-secondary dark:border-primary placeholder-primary dark:placeholder-primary dark:text-defaultW dark:focus:ring-primary dark:focus:border-primary dark:shadow-sm-light"
                                placeholder="Nos informe o assunto da mensagem"
>>>>>>> jean
                                required
                            />
                            {errors.subject && <div>{errors.subject}</div>}
                        </div>
                        <Content contentClass={"sm:col-span-2"}>
                            <Label objective={"formMessage"}>
                               Sua mensagem 
                            </Label>
                            <textarea
                                value={data.formMessage}
                                onChange={(event) => setData('formMessage', event.target.value)}
                                id="formMessage"
                                rows="6"
<<<<<<< HEAD
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Menssagem de no maximo 500 caracteres"
                            ></textarea>
                        </Content>

                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
=======
                                className=" font-body block p-2.5 w-full text-sm text-defaultW bg-defaultW rounded-lg shadow-sm border border-secondary focus:ring-primary focus:border-primary dark:bg-secondary dark:border-primary placeholder-primary dark:placeholder-primary dark:text-defaultW dark:focus:ring-primary dark:focus:border-primary"
                                placeholder="Envie sua mensagem em até 500 caracteres"
                            ></textarea>
                        </Content>

                        <button type="submit" className="font-body text-defaultW bg-primary hover:text-primary hover:bg-defaultW focus:ring-4 focus:ring-secondary font-medium rounded-3xl text-sm px-5 py-2.5 me-2 mb-2 dark:bg-secondary dark:hover:bg-defaultW focus:outline-none dark:focus:ring-secondary">
>>>>>>> jean
                            Enviar
                        </button>

                    </form>

                </div>
            </section>
        </>
    )
}
