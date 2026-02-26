import { useParams } from 'react-router-dom';
import { en } from '../../locales/en';
import { ur } from '../../locales/ur';
import type { TranslationSchema } from '../../locales/types';

export function useTranslation() {
    const { lang } = useParams<{ lang: 'en' | 'ur' }>();
    const isUrdu = lang === 'ur';
    const t: TranslationSchema = isUrdu ? ur : en;

    return {
        t,
        isUrdu,
        lang: lang || 'en'
    };
}
