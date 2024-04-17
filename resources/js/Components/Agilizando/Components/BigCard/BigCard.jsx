import Card from "../Card/Card";
import Title from "../Title/Title";

export default function BigCard({altText, classNameImg, contentText, imgPath, titleClass, titleContent}) {
    return (
        <>
            <div class="items-center bg-gray-50 rounded-lg shadow sm:flex flex-col dark:bg-gray-800 dark:border-gray-700">
                <Title titleContent={titleContent} />

                <Card
                    altText={altText}
                    contentText={contentText}
                    imgPath={imgPath}
                />
            </div>
        </>
    );
}
