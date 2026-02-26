import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    lang: string;
    isUrdu?: boolean;
    canonical?: string;
    type?: 'website' | 'article' | 'localbusiness';
}

export default function SEO({ title, description, lang, isUrdu, canonical, type = 'website' }: SEOProps) {
    const siteName = "Gull Real Estate & Builders";
    const fullTitle = `${title} | ${siteName}`;
    const url = `https://gullrealestate.github.io/${lang}${canonical || ''}`;

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "Gull Real Estate & Builders",
        "image": "https://gullrealestate.github.io/images/logo.webp",
        "url": "https://gullrealestate.github.io",
        "telephone": "+923149393930",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Mardan City",
            "addressLocality": "Mardan",
            "addressRegion": "KPK",
            "addressCountry": "PK"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 34.1989,
            "longitude": 72.0442
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            "opens": "09:00",
            "closes": "18:00"
        }
    };

    return (
        <Helmet>
            <html lang={lang} dir={isUrdu ? 'rtl' : 'ltr'} />
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />
            <meta name="google" content="notranslate" />

            {/* Open Graph */}
            <meta property="og:type" content={type === 'localbusiness' ? 'website' : type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content={siteName} />

            {/* Language Strategy */}
            <link rel="alternate" hrefLang="en" href="https://gullrealestate.github.io/en" />
            <link rel="alternate" hrefLang="ur" href="https://gullrealestate.github.io/ur" />
            <link rel="alternate" hrefLang="x-default" href="https://gullrealestate.github.io/en" />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
}
