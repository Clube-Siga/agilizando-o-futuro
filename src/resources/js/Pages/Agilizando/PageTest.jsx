import { Link, Head } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import Teste from '@/Components/Agilizando/Partials/Teste/Teste';

export default function Home({ auth, laravelVersion, phpVersion }) {

    return (<>
        <SiteLayout>
            <Head title="Teste" />
            <Teste/>
        </SiteLayout>
    </>);
}
