import { dataFake } from '@/data/dataFake';
import React from 'react';
import Button from "../Button/Button";
import Image from "../Image/Image";
import Text from "../Text/Text";
import Title from "../Title/Title";

export default function CourseDetails() {
    let id = window.location.href.split('/');
    id = id[4];
    const course = dataFake[id];

  return (

        <div key={course.id} className="m-10 p-10 flex flex-col gap-6">
            <div id={id} className="my-1 mx-auto flex flex-col items-center justify-center w-full bg-primary rounded-2xl shadow sm:grid sm:grid-cols-2 dark:bg-secondary">
                <div className="flex flex-col items-center justify-center">
                    <Title titleClass={"ml-5 mb-3 text-xl font-extrabold tracking-tight text-defaultW sm:mr-2 dark:text-defaultW"} titleContent={course.resume} />
                    <Text textClass={"font-body w-11/12 mb-9 font-light text-defaultW dark:text-defaultB"} textContent={course.content}/>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <Image className={"w-11/12 rounded"} altText={course.title} imgPath={course.image} />
                </div>
            </div>
            <div className="my-5 p-10 flex flex-col gap-6 justify-between w-full bg-secondary rounded-2xl shadow dark:bg-secondary">
                <Text textClass={"font-body w-full mb-9 font-light text-defaultW dark:text-defaultB"} textContent={course.details[0]}/>
                <ul className="font-body w-full mb-9 font-light text-defaultW dark:text-defaultB list-disc">
                    <li>{course.details[1]}</li>
                    <li>{course.details[2]}</li>
                    <li>{course.details[3]}</li>
                    <li>{course.details[4]}</li>
                </ul>
            </div>
            <Button buttonClass={"font-body flex items-center justify-center self-center mx-2 mt-2 mb-10 h-3/6 w-7/12 px-2 py-2 text-sm font-small text-center text-defaultW rounded-3xl bg-primary hover:border hover:border-secondary hover:text-secondary hover:bg-defaultW focus:ring-4 focus:ring-defaultW dark:focus:ring-secondary sm:px-5 sm:py-3 sm:mr-3 md:text-lg"} path={"https://forms.gle/82h2pCcFeoBM3fVi7"} title={"Inscreva-se"} /> 
        </div>


  );
}
