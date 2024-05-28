import React, { useState, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Content from "../../Components/Content/Content";
import Label from "../../Components/Label/Label";
import Text from "../../Components/Text/Text";
import Title from "../../Components/Title/Title";
import InputError from '@/Components/InputError';
import { formatPhoneNumber } from '@/Utils/utils';
//import { GoogleReCaptchaProvider, GoogleReCaptcha } from "react-google-recaptcha-v3";

export default function Contact({ contactClass, siteKey, grecaptcha }) {

    // const [recaptchaRef, setRecaptchaRef] = useState(null); usa pra desafios

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        email: '',
        subject: '',
        formMessage: '',
        recaptchaToken: '',
    });

    useEffect(() => {
        // Passo 1 - Carregue a API JavaScript. // somente na pagina do site ou contato
        const script = document.createElement('script'); // este é um método integrado fornecido pela API Document Object Model (DOM) do navegador. Ele permite criar novos elementos HTML dinamicamente usando JavaScript.
        script.src = "https://www.google.com/recaptcha/api.js?render=" + siteKey; //  esta linha define o src atributo do elemento de script para a URL do endpoint da API reCAPTCHA. Inclui o siteKey fornecido como adereço, essencial para identificar o seu site reCAPTCHA. 
        script.async = true; // Esta linha define o asyncatributo como true, indicando que o script não deve bloquear o carregamento de outros recursos na página. Isso garante que a página permaneça responsiva enquanto o script reCAPTCHA está sendo carregado.
        script.defer = true; // Esta linha define o defer atribuir a true, dizendo ao navegador para adiar a execução do script até que o conteúdo HTML tenha sido analisado e exibido.Isso pode melhorar o desempenho do carregamento da página.
        document.body.appendChild(script); // Esta linha anexa o script elemento criado para o <body> do documento HTML. Isso efetivamente adiciona o script à página, desencadeando seu carregamento.
        //foi carregado
        console.log('grecaptha carregado')

        // Initialize reCAPTCHA apos carregar o script opcional (um desafio)

        return () => {
            // remover e desmontar o componente atual
            document.body.removeChild(script); // Esta função é chamada quando o componente é desmontado ou descartado.Ele remove o adicionado dinamicamente script elemento do<body>para evitar vazamentos de memória e execução desnecessária de scripts.

        };

    }, []);

    //passo 2
    const submit = async (event) => {
        event.preventDefault();

        window.grecaptcha.ready(async () => {
            const token = await window.grecaptcha.execute(siteKey, { action: 'submit' });
            if (token) {
                console.log('Token recebido ', token);

                // Atualizar o form adicionando o token reCAPTCHA
                setData('recaptchaToken', token); // **Linha adicionada para atualizar o estado com o token**

                // Fazer a requisição POST após garantir que o estado foi atualizado
                setTimeout(() => {
                    console.log('Token adicionado ao form', data);

                    post(route('contact.store'), {
                        data,
                        preserveScroll: true,
                        onSuccess: () => {
                            reset();
                        },
                        onError: (error) => {
                            console.log('Erro', error);
                        },
                    });
                }, 100); // Espera 100ms para garantir que o estado foi atualizado
            } else {
                console.error('Failed to retrieve reCAPTCHA token');
            }
        });
    };



    return (
        <section id="contact" className={contactClass}>
            <div className="py-8 px-4 mx-auto max-w-screen-md lg:py-16">
                <Title titleClass={"font-body mb-4 text-4xl tracking-tight font-extrabold text-center text-defaultW dark:text-defaultW"} titleContent={"Entre em Contanto"} />
                <Text textClass={"font-body mb-8 font-light text-center text-defaultW lg:mb-16 sm:text-xl dark:text-primary"} textContent={"Está com algum problema técnico? Gostaria de enviar um feedback sobre a plataforma? Gostaria de mais detalhes sobre o projeto? Fale conosco"} />

                <form onSubmit={submit} id="contact-form" className="space-y-3">
                    <div>
                        <Label objective={"name"}>
                            Seu nome
                        </Label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(event) => setData('name', event.target.value)}
                            className="font-body shadow-sm bg-defaultW border border-secondary text-defaultB text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-secondary dark:border-primary placeholder-primary dark:placeholder-primary-400 dark:text-defaultW dark:focus:ring-primary dark:focus:border-primary dark:shadow-sm-light"
                            placeholder="Seu nome aqui"
                            autoComplete="name"
                            required
                        />
                        <InputError message={errors.name} className='mt-2' />
                    </div>
                    <div>
                        <Label objective={"phone"}>
                            Seu whatsapp
                        </Label>
                        <input
                            value={formatPhoneNumber(data.phone)}
                            onChange={(event) => setData('phone', event.target.value)}
                            type="text"
                            id="phone"
                            className="font-body shadow-sm bg-defaultW border border-secondary text-defaultB text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-secondary dark:border-primary placeholder-primary dark:placeholder-primary-400 dark:text-defaultW dark:focus:ring-primary dark:focus:border-primary dark:shadow-sm-light"
                            placeholder="(99) 99999-9999"
                            autoComplete="phone"
                            required
                        />
                        <InputError message={errors.phone} className='mt-2' />
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
                            className="font-body shadow-sm bg-defaultW border border-secondary text-defaultB text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-secondary dark:border-primary placeholder-primary dark:placeholder-primary-400 dark:text-defaultW dark:focus:ring-primary dark:focus:border-primary dark:shadow-sm-light"
                            placeholder="agilizando@clubesiga.com"
                            autoComplete="email"
                            required
                        />
                        <InputError message={errors.email} className='mt-2' />
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
                            className=" font-body block p-3 w-full text-sm text-secondary bg-defaultW rounded-lg border border-secondary shadow-sm focus:ring-primary focus:border-primary dark:bg-secondary dark:border-primary placeholder-primary dark:placeholder-primary dark:text-defaultW dark:focus:ring-primary dark:focus:border-primary dark:shadow-sm-light"
                            placeholder="Nos informe o assunto da mensagem"
                            required
                        />
                        <InputError message={errors.subject} className='mt-2' />
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
                            className=" font-body block p-2.5 w-full text-sm text-secondary bg-defaultW rounded-lg shadow-sm border border-secondary focus:ring-primary focus:border-primary dark:bg-secondary dark:border-primary placeholder-primary dark:placeholder-primary dark:text-defaultW dark:focus:ring-primary dark:focus:border-primary"
                            placeholder="Envie sua mensagem em até 500 caracteres"
                        ></textarea>
                        <InputError message={errors.formMessage} className='mt-2' />
                    </Content>
                    {/* Garntir que  token seja adicionado ao FORM, uma função para atualizar o estado dos dados do formulário toda vez que o token mudar*/}
                    <input type="hidden"
                        id='g-recaptcha-response'
                        name="g-recaptcha-response"
                        value={data.recaptchaToken}
                        //onChange={(token) => setData('recaptchaToken', token)}
                    />

                    <button
                        disabled={processing}
                        type="submit"
                        className="g-recaptcha font-body text-defaultW bg-primary hover:text-primary hover:bg-defaultW focus:ring-4 focus:ring-secondary font-medium rounded-3xl text-sm px-5 py-2.5 me-2 mb-2 dark:bg-secondary dark:hover:bg-defaultW focus:outline-none dark:focus:ring-secondary">
                        Enviar
                    </button>
                </form>
            </div>
        </section>
    );
}
