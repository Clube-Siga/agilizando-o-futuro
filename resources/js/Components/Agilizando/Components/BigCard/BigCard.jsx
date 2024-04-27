import Card from "../Card/Card";
import Title from "../Title/Title";

export default function BigCard({altText, contentText, imgPath, titleClass, titleContent}) {
    return (
        <>
            <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                <Title titleClass={titleClass} titleContent={titleContent} />

                <Card
                    altText={altText}
                    contentText={contentText}
                    imgPath={imgPath}
                />
            </div>
        </>
    );
}
