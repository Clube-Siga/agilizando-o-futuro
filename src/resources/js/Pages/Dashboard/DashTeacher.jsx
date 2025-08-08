import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard Professor</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">DASH Professor!
                            <p>Seja bem-vindo(a)! A plataforma de ensino à distância está em desenvolvimento, mas você já pode acessar os cursos disponíveis na Plataforma de EAD do Clube Siga:</p>
                            <a href="https://ead.clubesiga.com.br" target="_blank" rel="noreferrer noopener" className="text-indigo-600 underline hover:text-indigo-700">
                                Plataforma de EAD do Clube Siga
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
