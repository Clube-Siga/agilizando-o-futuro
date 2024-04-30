import Image from "../Image/Image";
import Text from "../Text/Text";

export default function Card({altText, contentText, imgPath}){
    return (
        <>
            <div className="flex flex-col flex-2 items-center justify-center bg-primary rounded-lg shadow sm:flex dark:bg-secondary">
                <Image className={"flex-start w-auto rounded-lg sm:rounded-none sm:rounded-l-lg"} altText={altText} imgPath={imgPath} />
                <div className="flex-end p-5">
                    <Text textClass={"font-body mt-3 mb-4 font-light text-defaultW dark:text-defaultW"} textContent={contentText}/>
                </div>
            </div>
        </>
    )
}
