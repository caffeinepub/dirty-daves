import { useEffect } from 'react';

interface SeoConfig {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: string;
  articleData?: {
    headline: string;
    description: string;
    author?: string;
    datePublished?: string;
  };
}

export function usePageSeo(config: SeoConfig) {
  useEffect(() => {
    const { title, description, canonicalPath, ogType = 'article', articleData } = config;
    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}${canonicalPath}`;
    const siteName = 'Dirty Daves';
    const fullTitle = `${title} | ${siteName}`;

    // Set document title
    document.title = fullTitle;

    // Helper to set or update meta tag
    const setMetaTag = (selector: string, attribute: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (selector.includes('property=')) {
          element.setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] || '');
        } else if (selector.includes('name=')) {
          element.setAttribute('name', selector.match(/name="([^"]+)"/)?.[1] || '');
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, content);
    };

    // Set meta description
    setMetaTag('meta[name="description"]', 'content', description);

    // Set canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = fullUrl;

    // Set Open Graph tags
    setMetaTag('meta[property="og:title"]', 'content', fullTitle);
    setMetaTag('meta[property="og:description"]', 'content', description);
    setMetaTag('meta[property="og:url"]', 'content', fullUrl);
    setMetaTag('meta[property="og:type"]', 'content', ogType);
    setMetaTag('meta[property="og:site_name"]', 'content', siteName);

    // Set Twitter Card tags
    setMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'content', fullTitle);
    setMetaTag('meta[name="twitter:description"]', 'content', description);

    // Set JSON-LD structured data for articles
    if (articleData) {
      let jsonLdScript = document.querySelector('script[type="application/ld+json"]#article-schema');
      if (!jsonLdScript) {
        jsonLdScript = document.createElement('script');
        jsonLdScript.setAttribute('type', 'application/ld+json');
        jsonLdScript.setAttribute('id', 'article-schema');
        document.head.appendChild(jsonLdScript);
      }

      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: articleData.headline,
        description: articleData.description,
        url: fullUrl,
        author: {
          '@type': 'Person',
          name: articleData.author || 'Dave',
        },
        publisher: {
          '@type': 'Organization',
          name: siteName,
          url: baseUrl,
        },
        datePublished: articleData.datePublished || new Date().toISOString(),
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': fullUrl,
        },
      };

      jsonLdScript.textContent = JSON.stringify(structuredData);
    }

    // Cleanup function
    return () => {
      // Reset to default title when component unmounts
      document.title = siteName;
    };
  }, [config]);
}
