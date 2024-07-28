import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import { Head, Link, useForm} from '@inertiajs/react';
import { formatPhoneNumber, formatCPF } from '@/Utils/utils';

export default function Register() {
    //config do form
    const { data, setData, post, processing, errors, reset } = useForm({
        userType: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        mobile: '',
        cpf: '',
        date_of_birth: '',
        terms: false,
    });

   

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        console.log('form', data)
        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Cadastre-se no Projeto Agilizando" />

            <form onSubmit={submit} id="register">
            <div>
                    <InputLabel htmlFor="userType" value="Escolha um tipo de conta?" />

                    
                    <select
                        id="userType"
                        name="userType"
                        value={data.userType} // Use o valor do formulário
                        onChange={(e) => setData('userType', e.target.value)}
                        autoComplete="user-type"
                        className="mb-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                        <option value="">Selecione uma opção</option>
                        <option value="Student">Aluno</option>
                        <option value="Supporter">Apoiador</option>
                        <option value="Teacher">Professor</option>
                    </select>

                    <InputError message={errors.userType} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="name" value="Nome" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Senha" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirmar Senha" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="mobile" value="DDD + Celular - Digite somente os números" />

                    <TextInput
                        id="mobile"
                        name="mobile"
                        value={formatPhoneNumber(data.mobile)}
                        className="mt-1 block w-full"
                        autoComplete="mobile"
                        isFocused={true}
                        onChange={(e) => setData('mobile', e.target.value)}
                        required
                    />

                    <InputError message={errors.mobile} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="cpf" value="CPF - Digite somente os números" />

                    <TextInput
                        id="cpf"
                        name="cpf"
                        value={formatCPF(data.cpf)}
                        className="mt-1 block w-full"
                        autoComplete="cpf"
                        isFocused={true}
                        onChange={(e) => setData('cpf', e.target.value)}
                        required
                    />

                    <InputError message={errors.cpf} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="date_of_birth" value="Data de Nascimento" />

                    <TextInput
                        id="date_of_birth"
                        name="date_of_birth"
                        type="date"
                        value={data.date_of_birth}
                        className="mt-1 block w-full"
                        autoComplete="date_of_birth"
                        isFocused={true}
                        onChange={(e) => setData('date_of_birth', e.target.value)}
                        required
                    />

                    <InputError message={errors.date_of_birth} className="mt-2" />
                </div>


                <div className="block mt-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="terms"
                                checked={data.terms}
                                onChange={(e) => setData('terms', e.target.checked)}
                            />
                            <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Eu Concordo com os <a target="_blank" href="https://docs.google.com/document/d/1e2FGszR5LdM8hNgoZH9bxhLY6aRDeFJsfrW7J1-xJeY/edit?usp=sharing" className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500">Termos dos Serviço </a> e <a target="_blank" href="https://docs.google.com/document/d/1p6ZS__VYMmps5Wc2wBCsXWh-D1aKa6Z2X5MlRZXGr58/edit?usp=sharing" className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500">Políticas de Privacidade</a></span>
                        </label>
                    </div>

                <div className="flex items-center justify-end mt-4">

                   
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        Já é cadastrado?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Cadastre-se
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
