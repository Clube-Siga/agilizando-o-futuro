import React from 'react';
import { Link } from '@inertiajs/react';

export default function CourseCard({ course }) {
  return (
    <div className="course-card">
      <h2>{course.title}</h2>
      <span>{course.module}</span>
      <p>{course.content.substring(0, 100)}...</p>
      <Link to={`/courses/${course.id}`}>Ler mais</Link>
    </div>
  );
}
