import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../lib/i18n/useTranslation';

interface SEOProps {
    title: string;
    description: string;
    lang: string;
    isUrdu?: boolean;
    canonical?: string;
    type?: 'website' | 'article' | 'localbusiness';
}

export default function SEO({ title, description, lang, isUrdu, canonical, type = 'website' }: SEOProps) {
    const { t } = useTranslation();
    const siteName = "Gull Real Estate & Builders";
    const fullTitle = `${title} | ${siteName}`;
    const url = `https://gullrealestate.github.io/${lang}${canonical || ''}`;

    // Base RealEstateAgent Schema
    const baseSchema = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "Gull Real Estate & Builders",
        "image": "https://gullrealestate.github.io/images/logo.webp",
        "url": "https://gullrealestate.github.io",
        "telephone": "+923149393930",
        "priceRange": "$$",
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
        }
    };

    // FAQ Schema
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": t.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    };

    // HowTo Schema
    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": t.howItWorksTitle,
        "step": [
            {
                "@type": "HowToStep",
                "name": t.step1,
                "text": t.step1Desc
            },
            {
                "@type": "HowToStep",
                "name": t.step2,
                "text": t.step2Desc
            },
            {
                "@type": "HowToStep",
                "name": t.step3,
                "text": t.step3Desc
            }
        ]
    };

    // OfferCatalog Schema
    const offerCatalogSchema = {
        "@context": "https://schema.org",
        "@type": "OfferCatalog",
        "name": "Gull Real Estate Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": t.buySellTitle,
                    "description": t.buySellDesc
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": t.tenantTitle,
                    "description": t.tenantDesc
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": t.landlordTitle,
                    "description": t.landlordDesc
                }
            }
        ]
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
                {JSON.stringify(baseSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(faqSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(howToSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(offerCatalogSchema)}
            </script>
        </Helmet>
    );
}
