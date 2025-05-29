import { Result } from "./result";

const BASE_URL = "https://beta.vsrecorder.mobi/api/v1beta/environments";

interface Environment {
    id: string;
    title: string;
    from_date: Date;
    to_date: Date;
}

export async function generateMetadata({ params }: { params: { id: string, deckcode: string } }) {
    const url =  'https://decktype.vsrecorder.mobi/' + 'environments/' + params.id + '/' + 'deckcodes/' + params.deckcode;

    return {
        metadataBase: new URL('https://decktype.vsrecorder.mobi'),
        description: "デッキコード：" + params.deckcode + " の診断結果は...",
        openGraph: {
            url: url,
            type: 'article',
            title: "デッキコード：" + params.deckcode + " の診断結果は...",
            images: `/images/thumbnail.jpg`,
            locale: 'ja_JP',
        },
        twitter: {
            card: 'summary_large_image',
            site: '@vsrecorder_mobi',
        },
    };
};

const Page = async ({ params }: { params: { id: string, deckcode: string } }) => {
    try {
        const response = await fetch(`${BASE_URL}`+ "/" + params.id);
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data: Environment = await response.json();
        if (!data) {
            throw new Error("No environments found.");
        }

        return (
        <>
        <Result environmentTitle={data.title} deckcode={params.deckcode} />
        </>
        );
    } catch (error) {
        console.error("Failed to fetch environments:", error);

        return (
        <>
        <Result environmentTitle={""} deckcode={params.deckcode} />
        </>
        );
    };
};

export default Page;
