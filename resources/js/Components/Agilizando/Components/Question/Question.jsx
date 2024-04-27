import Text from "../Text/Text";
import Title from "../Title/Title";

export default function Question({questionAnswer, questionTitle}) {
    return (
        <>
            <div className="mb-10">
                <Title titleClass={"flex items-center mb-4 text-lg font-medium text-secondary dark:text-white"} titleContent={questionTitle}>
                    <svg
                        className="flex-shrink-0 mr-2 w-5 h-5 text-primary dark:text-primary-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </Title>
                <Text textClass={"text-primary dark:text-primary-400"} textContent={questionAnswer}/>
            </div>
        </>
    );
}
