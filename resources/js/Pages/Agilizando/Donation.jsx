import { Link, Head } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import Row from '@/Components/Agilizando/Components/Row/Row';
import DonationSection from '@/Components/Agilizando/Partials/Donation/Donation';
import DonationSection2 from '@/Components/Agilizando/Partials/Donation2/Donation2';

export default function Donation() {

    return (<>
        <SiteLayout>
            <Head title="Agilizando - Campanha de Doação" />
            <Row>
                <DonationSection sectionClass={'bg-defaulW w-full mt-8'}/>
                <DonationSection2 sectionClass={'bg-secondary w-full gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6'}/>
            </Row>
        </SiteLayout>
    </>);
}
