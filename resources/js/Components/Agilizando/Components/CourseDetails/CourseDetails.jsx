import { dataFake } from '@/data/dataFake';
import React from 'react';

export default function CourseDetails() {
    let id = window.location.href.split('/');
    id = id[4];
    const course = dataFake[id];

  return (

        <div key={course.id} className="m-10 p-10 flex flex-col gap-6">
            <h2>{course.title}</h2>
            <span>{course.module}</span>
            <p>Resumo: {course.resume}</p>
            <div className="flex flex-col gap-6">
                <span>Conteúdo: {course.content}</span>
                <span>Detalhes: {course.details}</span>
            </div>
        </div>


  );
}
