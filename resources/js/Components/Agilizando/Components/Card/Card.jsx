import Image from "../Image/Image";
import Text from "../Text/Text";

export default function Card({altText, contentText, imgPath}){
    return (
        <>
            <div className="mx-auto flex flex-col items-center justify-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                <Image className={"w-auto rounded-lg sm:rounded-none sm:rounded-l-lg"} altText={altText} imgPath={imgPath} />
              <div className="p-5">
                <Text textClass={"mt-3 mb-4 font-light text-gray-500 dark:text-gray-400"} textContent={contentText}/>
              </div>
            </div>
        </>
    )
}
