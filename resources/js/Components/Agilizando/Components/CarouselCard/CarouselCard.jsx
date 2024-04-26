import Image from "../Image/Image";
import Text from "../Text/Text";

export default function CarouselCard({altText, contentText, imgPath}){
    return (
        <>
            <div className="mx-auto flex flex-col items-center justify-center w-8/12  bg-primary-50 rounded-2xl shadow sm:grid sm:grid-cols-2 dark:bg-primary-800 dark:border-primary-700">
                <Image className={"w-11/12 rounded-lg"} altText={altText} imgPath={imgPath} />
                <Text textClass={"w-11/12 mt-3 mb-10 font-light text-primary-500 dark:text-primary-400"} textContent={contentText}/>
            </div>
        </>
    )
}
