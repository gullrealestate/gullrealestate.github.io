import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';

function App() {
    const [isUrdu, setIsUrdu] = useState(false);

    const translations = {
        en: {
            title: "Agency Fee & Liability Policy",
            description: "We are a real estate agency providing professional guidance, coordination, negotiation support, and deal execution services. We do not directly sell or rent properties through this website. Property payments are made separately between the concerned parties. Our charges represent agency fees for services rendered.",
            items: [
                "The agency fee is determined based on the size, type, and value of the transaction.",
                "If a transaction is cancelled before a formal written agreement is signed between the parties, and the deal is not concluded, any advance agency fee paid will be refunded.",
                "Once a transaction is formally concluded through mutual agreement and signing of documents between the concerned parties, the agency fee is considered fully earned for services provided and is non-refundable.",
                "Any dispute, change of mind, or cancellation by either party after conclusion of the agreement shall not affect the agency’s earned fee.",
                {
                    label: "Post-Deal Liability:",
                    content: "The agency acts solely as a facilitator. After the deal is concluded and the agency fee is paid, any subsequent transactions, modifications, disputes, or legal actions are strictly between the parties involved. The agency shall not be held responsible, directly or indirectly, for any matter arising after the completion of the agreement."
                }
            ],
            footer: "We are committed to transparency and fairness in all dealings. If you have any questions regarding our fee structure or liability terms, please feel free to discuss them with us prior to finalizing your transaction.",
            button: "Translate to Urdu",
            metaTitle: "Real Estate in Mardan | Property Dealers in KPK | Gull Builders",
            metaDesc: "Based in Mardan, Gull Real Estate and Builders offers expert consultation for Mardan, Peshawar, Swat, and across KPK. Trusted local property agency.",
            heroTitle: "Expert Property Agency Physically Based in Mardan",
            heroSub: "Direct CEO Access & Full Transparency. We guide you through every step of buying, selling, or renting with verified local expertise.",
            heroBtn: "Free Consultation",
            servicesTitle: "Agency Services",
            servicesSub: "We are a real estate agency based in Mardan. We provide professional advice and execution support for your property needs.",
            buySellTitle: "Buy / Sell Consultation",
            buySellDesc: "Speak directly with our CEO to plan your purchase or sale strategy in Mardan.",
            tenantTitle: "Tenant Consultation",
            tenantDesc: "Connect with our office agents for rental support in Mardan's growing residential sectors.",
            landlordTitle: "Landlord Listing",
            landlordDesc: "Have a property or house in Mardan? List it through our professional network to find quality tenants fast.",
            howItWorksTitle: "How Our Agency Works",
            step1: "1. Share Requirement",
            step1Desc: "Tell us your goal: buy, sell, or rent in Mardan and across KPK. We prioritize your budget.",
            step2: "2. Expert Guidance",
            step2Desc: "We provide practical support, negotiation, and coordination with local market experts.",
            step3: "3. Confident Closing",
            step3Desc: "You close the deal directly. We charge a standard agency fee for our facilitation services.",
            citySections: [
                {
                    id: "mardan",
                    title: "Real Estate in Mardan (Primary Authority)",
                    content: "As a leading real estate agency physically based in Mardan, we offer unparalleled local expertise. Mardan's property market is booming with new residential schemes and commercial opportunities. We help you navigate the best sectors for long-term growth."
                },
                {
                    id: "peshawar",
                    title: "Property Market in Peshawar",
                    content: "Our Mardan HQ frequently facilitates deals in Peshawar. From Hayatabad to new developments on Ring Road, we provide strategic consultation for investors looking to enter the provincial capital's vibrant real estate market."
                },
                {
                    id: "nowshera",
                    title: "Investment Opportunities in Nowshera",
                    content: "Nowshera serves as a critical link between Mardan and Peshawar. We identify high-yield investment opportunities in industrial and residential zones, ensuring our clients get the best value in this strategic KPK city."
                },
                {
                    id: "swat",
                    title: "Residential Growth in Swat",
                    content: "The tourism surge in Swat has triggered a massive interest in residential and commercial land. Our agency provides vetted options for those looking to build or invest in Swat's rapidly expanding property market."
                },
                {
                    id: "abbottabad",
                    title: "Emerging Developments in Abbottabad",
                    content: "Abbottabad remains a prime choice for residential living in KPK. We guide families and investors toward emerging developments that offer modern amenities combined with Abbottabad's unique climate."
                },
                {
                    id: "kohat-dikhan",
                    title: "Expanding Market in Kohat & D.I. Khan",
                    content: "We are seeing significant expansion in Kohat and Dera Ismail Khan. Our agency covers these southern KPK cities by providing data-driven advice for both residential plots and commercial ventures."
                }
            ],
            contactCta: "Are you ready to buy, sell, or rent a property?",
            contactSub: "Speak with our CEO and our expert agents for personalized real estate strategy in Mardan and across KPK.",
            contactBtn: "Contact Us To Fulfill Your Property Needs"
        },
        ur: {
            title: "ایجنسی فیس اور ذمہ داری کی پالیسی",
            description: "ہم ایک رئیل اسٹیٹ ایجنسی ہیں جو پیشہ ورانہ رہنمائی، ہم آہنگی، مذاکرات میں تعاون، اور ڈیل پر عمل درآمد کی خدمات فراہم کرتی ہے۔ ہم اس ویب سائٹ کے ذریعے براہ راست جائیدادیں فروخت یا کرایہ پر نہیں دیتے۔ جائیداد کی ادائیگیاں متعلقہ فریقین کے درمیان علیحدہ طور پر کی جاتی ہیں۔ ہمارے واجبات دی گئی خدمات کے لیے ایجنسی فیس کی نمائندگی کرتے ہیں۔",
            items: [
                "ایجنسی فیس کا تعین لین دین کے سائز، قسم اور مالیت کی بنیاد پر کیا جاتا ہے۔",
                "اگر فریقین کے درمیان باضابطہ تحریری معاہدہ ہونے سے پہلے لین دین منسوخ ہو جاتا ہے، اور ڈیل مکمل نہیں ہوتی، تو ادا کی گئی کوئی بھی پیشگی ایجنسی فیس واپس کر دی جائے گی۔",
                "متعلقہ فریقین کے درمیان باہمی معاہدے اور دستاویزات پر دستخط کے ذریعے ایک بار لین دین باضابطہ طور پر مکمل ہو جانے کے بعد، ایجنسی فیس کو فراہم کردہ خدمات کے لیے مکمل طور پر وصول شدہ تصور کیا جائے گا اور یہ ناقابل واپسی ہوگی۔",
                "معاہدے کی تکمیل کے بعد کسی بھی فریق کی طرف سے کوئی بھی تنازعہ، ذہن کی تبدیلی، یا منسوخی ایجنسی کی وصول شدہ فیس پر اثر انداز نہیں ہوگی۔",
                {
                    label: "ڈیل کے بعد کی ذمہ داری:",
                    content: "ایجنسی صرف ایک سہولت کار کے طور پر کام کرتی ہے۔ ڈیل مکمل ہونے اور ایجنسی فیس کی ادائیگی کے بعد، کوئی بھی بعد کے لین دین، ترامیم، تنازعات، یا قانونی چارہ جوئی سختی سے اس میں شامل فریقین کے درمیان ہوگی۔ ایجنسی معاہدے کی تکمیل کے بعد پیدا ہونے والے کسی بھی معاملے کے لیے، براہ راست یا بالواسطہ، ذمہ دار نہیں ہوگی۔"
                }
            ],
            footer: "ہم تمام معاملات میں شفافیت اور انصاف کے لیے پرعزم ہیں۔ اگر آپ کے پاس ہمارے فیس کے ڈھانچے یا ذمہ داری کی شرائط کے بارے میں کوئی سوال ہے، تو براہ کرم اپنی لین دین کو حتمی شکل دینے سے پہلے بلا جھجھک ہم سے اس پر بات کریں۔",
            button: "In English",
            metaTitle: "مردان میں رئیل اسٹیٹ | کے پی کے میں پراپرٹی ڈیلرز",
            metaDesc: "مردان میں مقیم، گل رئیل اسٹیٹ اینڈ بلڈرز مردان، پشاور، سوات اور پورے کے پی کے کے لیے ماہرانہ مشاورت فراہم کرتے ہیں۔",
            heroTitle: "مردان کی بھروسہ مند پراپرٹی ایجنسی",
            heroSub: "خریدیں، بیچیں یا کرایہ پر لیں۔ ہر قدم پر ہماری رہنمائی آپ کے ساتھ ہے۔",
            heroBtn: "آج ہی بات کریں",
            servicesTitle: "ہماری خدمات",
            servicesSub: "مردان سے آپ کی پراپرٹی کی ہر ضرورت پوری کی جاتی ہے۔ پیشہ ورانہ رہنمائی اور عملی مدد ایک ساتھ۔",
            buySellTitle: "خرید و فروخت",
            buySellDesc: "سی ای او سے براہ راست بات کریں اور صحیح قیمت پر بروقت ڈیل کریں۔",
            tenantTitle: "کرایے پر گھر لیں",
            tenantDesc: "اپنے بجٹ اور پسند کا گھر تلاش کریں۔ ہمارے ایجنٹ آپ کے لیے بہترین آپشن لائیں گے۔",
            landlordTitle: "پراپرٹی کرایہ پر دیں",
            landlordDesc: "خالی مکان ہے؟ ہمارے نیٹ ورک سے صحیح کرایہ دار جلدی ڈھونڈیں۔",
            howItWorksTitle: "ہم کیسے کام کرتے ہیں",
            step1: "۱. بتائیں کیا چاہیے",
            step1Desc: "خریدنا ہے، بیچنا ہے یا کرایہ۔ بس ہمیں بتائیں۔ ہم آپ کا بجٹ سمجھتے ہیں۔",
            step2: "۲. ماہرانہ رہنمائی",
            step2Desc: "ہم مارکیٹ جانتے ہیں۔ قیمت، جگہ اور موقع کا صحیح تجزیہ آپ کو ملتا ہے۔",
            step3: "۳. پراعتماد تکمیل",
            step3Desc: "ڈیل آپ کی ہے، پیسے آپ کے ہیں۔ ہم سہولت کاری کرتے ہیں اور اپنی ایجنسی فیس لیتے ہیں۔",
            citySections: [
                {
                    id: "mardan",
                    title: "مردان میں رئیل اسٹیٹ",
                    content: "مردان میں واقع ایک سرکردہ رئیل اسٹیٹ ایجنسی کے طور پر، ہم بے مثال مقامی مہارت فراہم کرتے ہیں۔ مردان کی پراپرٹی مارکیٹ رہائشی اور تجارتی مواقع کے ساتھ تیزی سے ترقی کر رہی ہے۔"
                },
                {
                    id: "peshawar",
                    title: "پشاور میں پراپرٹی مارکیٹ",
                    content: "ہمارا مردان ہیڈ کوارٹر پشاور میں بھی خدمات فراہم کرتا ہے۔ حیات آباد سے لے کر رنگ روڈ کی نئی ڈویلپمنٹس تک، ہم سرمایہ کاروں کو ماہرانہ مشورہ دیتے ہیں۔"
                },
                {
                    id: "nowshera",
                    title: "نوشہرہ میں سرمایہ کاری کے مواقع",
                    content: "نوشہرہ مردان اور پشاور کے درمیان ایک اہم کڑی ہے۔ ہم صنعتی اور رہائشی زون میں سرمایہ کاری کے بہترین مواقع کی نشاندہی کرتے ہیں۔"
                },
                {
                    id: "swat",
                    title: "سوات میں رہائشی ترقی",
                    content: "سوات میں سیاحت کے فروغ نے پراپرٹی میں دلچسپی بڑھا دی ہے۔ ہماری ایجنسی سوات کی تیزی سے پھیلتی ہوئی مارکیٹ میں بہترین آپشنز فراہم کرتی ہے۔"
                },
                {
                    id: "abbottabad",
                    title: "ایبٹ آباد میں نئی ڈویلپمنٹس",
                    content: "ایبٹ آباد رہائش کے لیے ایک بہترین انتخاب ہے۔ ہم خاندانوں اور سرمایہ کاروں کو جدید سہولیات والی ڈویلپمنٹس کی طرف راغب کرتے ہیں۔"
                },
                {
                    id: "kohat-dikhan",
                    title: "کوہاٹ اور ڈی آئی خان میں مارکیٹ کا پھیلاؤ",
                    content: "ہم کوہاٹ اور ڈیرہ اسماعیل خان میں نمایاں پھیلاؤ دیکھ رہے ہیں۔ ہماری ایجنسی ان شہروں میں رہائشی اور تجارتی منصوبوں کے لیے مشورہ دیتی ہے۔"
                }
            ],
            contactCta: "پراپرٹی کا فیصلہ کرنا ہے؟",
            contactSub: "ہمارے سی ای او اور ایجنٹوں سے براہ راست بات کریں۔ مردان اور کے پی کے میں آپ کا بھروسہ مند ساتھی۔",
            contactBtn: "ابھی رابطہ کریں"
        }
    };

    const t = isUrdu ? translations.ur : translations.en;

    return (
        <HelmetProvider>
            <BrowserRouter>
                <div className="min-h-screen flex flex-col bg-gruvbox-bg0 transition-colors duration-300" dir={isUrdu ? "rtl" : "ltr"}>
                    <Header isUrdu={isUrdu} setIsUrdu={setIsUrdu} />
                    <Routes>
                        <Route path="/" element={<HomePage isUrdu={isUrdu} t={t} />} />
                        <Route path="/contact" element={<ContactPage isUrdu={isUrdu} />} />
                    </Routes>
                    <Footer isUrdu={isUrdu} />
                </div>
            </BrowserRouter>
        </HelmetProvider>
    );
}

export default App;
