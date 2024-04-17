import { Link } from "@inertiajs/react";
import Image from "../Image/Image";

export default function Card({altText, contentText, imgPath}){
    return (
        <>
              <Link href="#">
                <Image className={"w-auto rounded-lg sm:rounded-none sm:rounded-l-lg"} altText={altText} imgPath={imgPath} />
                  {/* <img className="w-auto rounded-lg sm:rounded-none sm:rounded-l-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png" alt="Bonnie Avatar" /> */}
              </Link>
              <div className="p-5">
                  <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">{contentText}</p>
              </div>
        </>
    )
}
