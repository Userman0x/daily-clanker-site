import { useState, useEffect } from 'react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

interface UseGitHubContentProps {
  url?: string;
}

const useGitHubContent = ({
  url = 'https://raw.githubusercontent.com/Userman0x/daily-clanker/main/articles.json',
}: UseGitHubContentProps = {}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // prevent setting state if component unmounted

    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        // Add a timestamp to bust caches
        const cacheBustedUrl = `${url}?t=${Date.now()}`;
        const response = await fetch(cacheBustedUrl, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Article[] = await response.json();

        // Append timestamp to images for cache-busting
        const dataWithFreshImages = data.map(article => ({
          ...article,
          image: article.image ? `${article.image}?t=${Date.now()}` : "",
        }));

        if (isMounted) {
          setArticles(dataWithFreshImages || []);
        }
      } catch (err) {
        console.error('Error fetching articles:', err);
        if (isMounted) {
          setError('Failed to fetch articles');
          setArticles([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchArticles();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { articles, loading, error };
};

export default useGitHubContent;
