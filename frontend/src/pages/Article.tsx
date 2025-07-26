import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../modules/PageLayouts";
import MarkdownCss from '../css/MarkdownStyles.css?raw';

function Article() {
    const [ error, setError ] = useState<string | null>(null);
    const [ rawArticle, setRawArticle] = useState<string>('');
    const { articleId } = useParams();

    useEffect(() => {
        if (!articleId) return;

        const allArticles = import.meta.glob('../assets/articles/*.md', {
            query: '?raw',
            import: 'default',
        });
        const importArticle = allArticles[`../assets/articles/${articleId}.md`];

        if (importArticle) {
            importArticle().then((text) => {
                const rawText = text as string;
                if (!rawText.trim()) {
                    setError('Article is empty');
                } else {
                    setRawArticle(
                        rawText
                    );
                }
            });
        } else {
            setError('Failed to get article');
        }
    }, [articleId]);

    return(
        <PageLayout.Article
            contents={rawArticle}
            error={error}
            css={MarkdownCss}
            isMarkdown
        />
    );
}

export default Article;