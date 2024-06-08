import React, { useEffect, useState } from 'react';

export default function CourseDetails({ match }) {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetch(`/api/courses/${match.params.id}`)
      .then((response) => response.json())
      .then((data) => setCourse(data));
  }, [match.params.id]);

  if (!course) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="course-details">
      <h2>{course.title}</h2>
      <span>{course.module}</span>
      <p>Resumo: {course.resume}</p>
      <div className="course-info">
        <span>Conteúdo: {course.content}</span>
        <span>Detalhes: {course.details}</span>
      </div>
    </div>
  );
}
