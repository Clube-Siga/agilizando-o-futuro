import { Link, Head } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import CourseCard from '@/Components/Agilizando/Components/CourseCard/CouseCard';
import CourseDetails from '@/Components/Agilizando/Components/CourseDetails/CourseDetails';

export default function Content(id) {

    return (<>
        <SiteLayout>
            <Head title="Agilizando - Cursos" />
            {/* <CourseCard key={course.id} course={course} /> */}
            <CourseDetails />
        </SiteLayout>
    </>);
}
