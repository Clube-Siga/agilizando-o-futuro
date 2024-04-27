import { useForm } from '@inertiajs/react';
import Content from "../../Components/Content/Content";
import Label from "../../Components/Label/Label";
import Text from "../../Components/Text/Text";
import Title from "../../Components/Title/Title";

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
                <div className="py-8 px-4 mx-auto max-w-screen-md lg:py-16">
                    <Title titleClass={"mb-4 text-4xl tracking-tight font-extrabold text-center text-primary dark:text-defaultW"} titleContent={"Entre em Contanto"}/>
                    <Text textClass={"mb-8 font-light text-center text-primary lg:mb-16 sm:text-xl dark:text-primary"} textContent={"Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know."}/>

                    <form onSubmit={submit} className="space-y-3">
                        <div>
                            <Label objective={"name"}>
                                Seu nome
                            </Label>
                            <input
                                value={data.name}
                                onChange={(event) => setData('name', event.target.value)}
                                type="name"
                                id="name"
                                className="shadow-sm bg-primary border border-secondary text-secondary text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-secondary dark:border-primary placeholder-defaultW dark:placeholder-primary-400 dark:text-defaultW dark:focus:ring-primary dark:focus:border-primary dark:shadow-sm-light"
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
                                value={data.phone}
                                onChange={(event) => setData('phone', event.target.value)}
                                type="phone"
                                id="phone"
                                className="shadow-sm bg-primary border border-secondary text-secondary text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-secondary dark:border-primary placeholder-defaultW dark:placeholder-primary-400 dark:text-defaultW dark:focus:ring-primary dark:focus:border-primary dark:shadow-sm-light"
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
                                className="shadow-sm bg-primary border border-secondary text-secondary text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-secondary dark:border-primary placeholder-defaultW dark:placeholder-primary-400 dark:text-defaultW dark:focus:ring-primary dark:focus:border-primary dark:shadow-sm-light"
                                placeholder="agilizando@clubesiga.com"
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
                                className="block p-3 w-full text-sm text-secondary bg-primary rounded-lg border border-secondary shadow-sm focus:ring-primary focus:border-primary dark:bg-secondary dark:border-primary placeholder-defaultW dark:placeholder-primary dark:text-defaultW dark:focus:ring-primary dark:focus:border-primary dark:shadow-sm-light"
                                placeholder="Nos informe o assunto da mensagem"
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
                                className="block p-2.5 w-full text-sm text-secondary bg-primary rounded-lg shadow-sm border border-secondary focus:ring-primary focus:border-primary dark:bg-secondary dark:border-primary placeholder-defaultW dark:placeholder-primary dark:text-defaultW dark:focus:ring-primary dark:focus:border-primary"
                                placeholder="Envie sua mensagem em até 500 caracteres"
                            ></textarea>
                        </Content>

                        <button type="submit" className="text-defaultW bg-primary hover:text-primary hover:bg-defaultW focus:ring-4 focus:ring-secondary font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-secondary dark:hover:bg-primary focus:outline-none dark:focus:ring-secondary">
                            Enviar
                        </button>
                    </form>

                </div>
            </section>
        </>
    )
}
