import Image from "../Image/Image";
import Text from "../Text/Text";

export default function CarouselCard({altText, contentText, imgPath}){
    return (
        <>
            <div className="my-1 mx-auto flex flex-col items-center justify-center w-9/12  bg-primary rounded-2xl shadow sm:grid sm:grid-cols-2 dark:bg-secondary">
                <Image className={"w-11/12 rounded-lg"} altText={altText} imgPath={imgPath} />
                <Text textClass={"w-11/12 mt-3 mb-10 font-light text-defaultW dark:text-defaultB"} textContent={contentText}/>
            </div>
        </>
    )
}
