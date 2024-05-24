import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Content from "../../Components/Content/Content";
import Label from "../../Components/Label/Label";
import Text from "../../Components/Text/Text";
import Title from "../../Components/Title/Title";
import InputError from '@/Components/InputError';
import {formatPhoneNumber } from '@/Utils/utils';
import { GoogleReCaptchaProvider, GoogleReCaptcha } from "react-google-recaptcha-v3";

//receber as novas props do recapchat
export default function Contact({contactClass, siteKey}){

    //armazenar a resposta do usuario
    const [recaptchaToken, setRecaptchaToken] = React.useState('');
    const [refreshReCaptcha, setRefreshReCaptcha] = React.useState ( false ); 

    siteKey = usePage().props.siteKey
    console.log('siteKey em contact', siteKey)
    //recebe a resposta do usuario
    const handleRecaptchaChange = (token) => {
        setRecaptchaToken(token);
    };
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        email: '',
        subject: '',
        formMessage: '',
        recaptchaToken: recaptchaToken
    });

    function submit(e) {
        e.preventDefault();
       
        // enviar o form usando inertia useForm (url, options)
        post(route('contact.store'), {
            preserveScroll: true,
            onSuccess: () => {
              reset()
            }, 
            onError: (error) => {
            setRefreshReCaptcha(!refreshReCaptcha);
              console.log('error',error)
            },
          }, data);
      }
    

    return (
        <>
            <section id="contact" className={contactClass}>
                <div className="py-8 px-4 mx-auto max-w-screen-md lg:py-16">
                    <Title titleClass={"font-body mb-4 text-4xl tracking-tight font-extrabold text-center text-defaultW dark:text-defaultW"} titleContent={"Entre em Contanto"}/>
                    <Text textClass={"font-body mb-8 font-light text-center text-defaultW lg:mb-16 sm:text-xl dark:text-primary"} textContent={"Está com algum problema técnico? Gostaria de enviar um feedback sobre a plataforma? Gostaria de mais detalhes sobre o projeto? Fale conosco"}/>

                    <form onSubmit={submit} className="space-y-3">
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
                             <InputError message={errors.email} className='mt-2'></InputError>
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
                            <InputError message={errors.phone} className='mt-2'></InputError>
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
                            
                            <InputError message={errors.email} className='mt-2'></InputError>

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
                            <InputError message={errors.subject} className='mt-2'></InputError>
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
                            <InputError message={errors.formMessage} className='mt-2'></InputError>
                        </Content>
                        <input type="hidden" id="recaptcha-token" name="g-recaptcha-response" />

                        <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
                            <GoogleReCaptcha
                                className="google-recaptcha-custom-class"
                                onVerify={recaptchaToken}
                                refreshReCaptcha={refreshReCaptcha}
                            />
                        </GoogleReCaptchaProvider>
                        <button 
                            data-sitekey={siteKey}
                            disabled={processing} 
                            type="submit" 
                            className="g-recaptcha font-body text-defaultW bg-primary hover:text-primary hover:bg-defaultW focus:ring-4 focus:ring-secondary font-medium rounded-3xl text-sm px-5 py-2.5 me-2 mb-2 dark:bg-secondary dark:hover:bg-defaultW focus:outline-none dark:focus:ring-secondary">
                            Enviar
                        </button>
                    </form>

                </div>
            </section>
        </>
    )
}
