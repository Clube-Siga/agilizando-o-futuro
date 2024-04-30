import Button from "../Button/Button";
import Image from "../Image/Image";
import Text from "../Text/Text";

export default function CarouselCard({altText, buttonPath, buttonTitle, contentText, imgPath}){
    return (
        <>
            <div className="my-1 mx-auto flex flex-col items-center justify-center w-9/12  bg-primary rounded-2xl shadow sm:grid sm:grid-cols-2 dark:bg-secondary">
                <Image className={"w-11/12 rounded-lg"} altText={altText} imgPath={imgPath} />
                <Text textClass={"font-body w-11/12 my-3 font-light text-defaultW dark:text-defaultB"} textContent={contentText}/>
                <Button buttonClass={"font-body flex items-center justify-center self-center mx-2 mt-2 mb-10 h-3/6 w-7/12 px-2 text-sm font-small text-center text-defaultW rounded-3xl bg-secondary hover:border hover:border-secondary hover:text-secondary hover:bg-defaultW focus:ring-4 focus:ring-defaultW dark:focus:ring-secondary sm:px-5 sm:py-3 sm:mr-3 md:text-lg"} path={buttonPath} title={buttonTitle} />
            </div>
        </>
    )
}
