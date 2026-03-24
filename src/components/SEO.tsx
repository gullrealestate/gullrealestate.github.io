import { Helmet } from 'react-helmet-async';
import { content } from '../content';

interface SEOProps {
    title: string;
    description: string;
    lang?: string;
    canonical?: string;
    type?: 'website' | 'article' | 'localbusiness';
}

export default function SEO({ title, description, canonical, type = 'website' }: SEOProps) {
    const siteName = "Gull Real Estate & Builders | 15+ Years";
    const fullTitle = `${title} | ${siteName}`;
    const url = `https://gullrealestate.github.io${canonical || ''}`;
    const ogImage = `https://gullrealestate.github.io/images/og-en.png`;

    // Base RealEstateAgent Schema with geo
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
            "streetAddress": "Sheen Gull Plaza, Swabi Road",
            "addressLocality": "Mardan",
            "addressRegion": "Khyber Pakhtunkhwa",
            "postalCode": "23200",
            "addressCountry": "PK"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 34.1989,
            "longitude": 72.0442
        },
        "areaServed": {
            "@type": "GeoCircle",
            "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 34.1989,
                "longitude": 72.0442
            },
            "geoRadius": "50000"
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "18:00"
        }
    };

    // FAQ Schema
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": content.faqs.map(faq => ({
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
        "name": content.howItWorksTitle,
        "step": [
            { "@type": "HowToStep", "name": content.step1, "text": content.step1Desc },
            { "@type": "HowToStep", "name": content.step2, "text": content.step2Desc },
            { "@type": "HowToStep", "name": content.step3, "text": content.step3Desc }
        ]
    };

    // OfferCatalog Schema
    const offerCatalogSchema = {
        "@context": "https://schema.org",
        "@type": "OfferCatalog",
        "name": "Gull Real Estate Services",
        "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": content.buySellTitle, "description": content.buySellDesc } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": content.tenantTitle, "description": content.tenantDesc } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": content.landlordTitle, "description": content.landlordDesc } }
        ]
    };

    // Breadcrumb Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `https://gullrealestate.github.io`
            },
            ...(canonical && canonical !== '/' ? [{
                "@type": "ListItem",
                "position": 2,
                "name": title,
                "item": url
            }] : [])
        ]
    };

    return (
        <Helmet>
            <html lang="en" dir="ltr" />
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            {/* Open Graph */}
            <meta property="og:type" content={type === 'localbusiness' ? 'website' : type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:locale" content="en_US" />

            {/* Language Strategy */}
            <link rel="alternate" hrefLang="en" href={`https://gullrealestate.github.io${canonical || ''}`} />
            <link rel="alternate" hrefLang="x-default" href={`https://gullrealestate.github.io${canonical || ''}`} />

            {/* Structured Data */}
            <script type="application/ld+json">{JSON.stringify(baseSchema)}</script>
            <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
            <script type="application/ld+json">{JSON.stringify(offerCatalogSchema)}</script>
            <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        </Helmet>
    );
}
