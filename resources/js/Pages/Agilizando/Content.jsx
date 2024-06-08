import { Link, Head } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import CourseCard from '@/Components/Agilizando/Components/CourseCard/CouseCard';
import { useEffect, useState } from 'react';

export default function Content({course}) {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
      fetch('/api/courses')
        .then((response) => response.json())
        .then((data) => setCourses(data));
    }, []);

    return (<>
        <SiteLayout>
            <Head title="Agilizando - Cursos" />
            <CourseCard key={course.id} course={course} />
        </SiteLayout>
    </>);
}
