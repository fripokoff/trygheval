export const normalizeText = (text) => {
    if (typeof text !== 'string') {
        return String(text);
    }
    return text
        .replace(/‘|’/g, "'")
        .replace(/“|”/g, '"')
        .replace(/\u00A0/g, ' ');
};

export const formatText = (text) => {
    text = normalizeText(text);
    const regex = /(\*\*[^\*]+\*\*|__[^\_]+__|`[^`]+`|~~[^~]+~~|- |--)/g;

    return text.split(regex).map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return (
                <span key={index} className="font-bold">
                    {part.slice(2, -2)}
                </span>
            );
        }
        if (part === '--') {
            return (
                <span key={index} className="inline-flex items-center">
                    <span className="text-[#0D94B6] mr-2">•</span>
                </span>
            );
        }

        if (part.startsWith('__') && part.endsWith('__')) {
            return (
                <span key={index} className="underline">
                    {part.slice(2, -2)}
                </span>
            );
        }
        if (part.startsWith('`') && part.endsWith('`')) {
            return (
                <code key={index} className="bg-gray-100 p-1 rounded">
                    {part.slice(1, -1)}
                </code>
            );
        }
        if (part.startsWith('~~') && part.endsWith('~~')) {
            return (
                <span key={index} className="line-through">
                    {part.slice(2, -2)}
                </span>
            );
        }
        if (part === '- ') {
            return (
                <span key={index} className="inline-flex items-center gap-2  align-middle">
                    <span className="text-[#0D94B6] mr-2  align-middle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                    </span>
                </span>
            );
        }
        return <span key={index}>{part}</span>;
    });
};