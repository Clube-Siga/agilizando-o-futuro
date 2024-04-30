import Image from "../Image/Image";
import Text from "../Text/Text";

export default function Card({altText, contentText, imgPath}){
    return (
        <>
            <div className="mx-auto flex flex-col items-center justify-center bg-secondary rounded-lg shadow sm:flex dark:bg-secondary">
                <Image className={"w-auto rounded-lg sm:rounded-none sm:rounded-l-lg"} altText={altText} imgPath={imgPath} />
              <div className="p-5">
                <Text textClass={"font-body mt-3 mb-4 font-light text-defaultW dark:text-defaultW"} textContent={contentText}/>
              </div>
            </div>
        </>
    )
}
