import Content from "../Content/Content";
import Image from "../Image/Image";
import Text from "../Text/Text";
import Title from "../Title/Title";

export default function Testimonial({
    personImgPath,
    personName,
    personRole,
    testimonialP1,
    testimonialP2,
    testimonialP3,
    testimonialTitle,
}) {
    return (
        <>
            <figure className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 md:p-12 lg:border-r dark:bg-gray-800 dark:border-gray-700">
                <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                    <Title
                        titleClass={
                            "text-lg font-semibold text-gray-900 dark:text-white"
                        }
                        titleContent={testimonialTitle}
                    />
                    <Text textClass={"my-4"} textContent={testimonialP1} />
                    <Text textClass={"my-4"} textContent={testimonialP2} />
                    <Text textClass={"my-4"} textContent={testimonialP3} />
                </blockquote>
                <figcaption className="flex justify-center items-center space-x-3">
                    <Image
                        imgClass={"w-9 h-9 rounded-full"}
                        imgPath={personImgPath}
                        altText={"profile picture"}
                    />
                    <Content></Content>
                    <div className="space-y-0.5 font-medium dark:text-white text-left">
                        <Content>{personName}</Content>
                        <Content
                            contentClass={
                                "text-sm font-light text-gray-500 dark:text-gray-400"
                            }
                        >
                            {personRole}
                        </Content>
                    </div>
                </figcaption>
            </figure>
        </>
    );
}
