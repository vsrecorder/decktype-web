import { Result } from "./result";

export async function generateMetadata({ params }: { params: { id: string, deckcode: string } }) {
    const url =  'https://decktype.vsrecorder.mobi/' + 'environments/' + 'sv10/' + 'deckcodes/' + params.deckcode;

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

const Page = ({ params }: { params: { id: string, deckcode: string } }) => {
    return(
        <Result id={params.id} deckcode={params.deckcode} />
    )
};

export default Page;
