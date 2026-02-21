import { useState, lazy, Suspense } from 'react';
import { Home, Key, Briefcase, BadgeDollarSign, ClipboardCheck, Handshake } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';

const ContactModal = lazy(() => import('./components/ContactModal'));

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
            heroTitle: "Reliable Property Partner in Mardan & KPK",
            heroSub: "We guide and execute the process so you can buy, sell, or rent properties with maximum confidence.",
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
            heroTitle: "مردان اور کے پی کے میں آپ کا قابل اعتماد پراپرٹی پارٹنر",
            heroSub: "ہم پورے عمل کی رہنمائی اور عمل درآمد کرتے ہیں تاکہ آپ مکمل اعتماد کے ساتھ جائیداد خرید، فروخت یا کرایہ پر لے سکیں۔",
            heroBtn: "مفت مشورہ",
            servicesTitle: "ایجنسی کی خدمات",
            servicesSub: "ہم مردان میں مقیم ایک رئیل اسٹیٹ ایجنسی ہیں۔ ہم آپ کی پراپرٹی کی ضروریات کے لیے پیشہ ورانہ مشورہ اور مدد فراہم کرتے ہیں۔",
            buySellTitle: "خرید و فروخت کا مشورہ",
            buySellDesc: "مردان میں اپنی خرید و فروخت کی حکمت عملی کے لیے براہ راست ہمارے سی ای او سے بات کریں۔",
            tenantTitle: "کرایہ داروں کی مشاورت",
            tenantDesc: "مردان کے بڑھتے ہوئے رہائشی شعبوں میں کرایے کی مدد کے لیے ہمارے ایجنٹوں سے رابطہ کریں۔",
            landlordTitle: "مالکان کے لیے لسٹنگ",
            landlordDesc: "مردان میں پراپرٹی یا گھر موجود ہے؟ اچھے کرایہ دار تیزی سے تلاش کرنے کے لیے اسے ہمارے نیٹ ورک پر لسٹ کریں۔",
            howItWorksTitle: "ہماری ایجنسی کیسے کام کرتی ہے",
            step1: "1. ضرورت بتائیں",
            step1Desc: "مردان اور پورے کے پی کے میں اپنا ہدف بتائیں۔ ہم آپ کے بجٹ کو ترجیح دیتے ہیں۔",
            step2: "2. ماہرانہ رہنمائی",
            step2Desc: "ہم مقامی مارکیٹ کے ماہرین کے ساتھ عملی تعاون اور مذاکرات میں مدد فراہم کرتے ہیں۔",
            step3: "3. پراعتماد تکمیل",
            step3Desc: "آپ ڈیل براہ راست مکمل کرتے ہیں۔ ہم اپنی سہولت کاری کی خدمات کے لیے ایجنسی فیس لیتے ہیں۔",
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
            contactCta: "کیا آپ پراپرٹی خریدنے، بیچنے یا کرایہ پر لینے کے لیے تیار ہیں؟",
            contactSub: "مردان اور پورے کے پی کے میں ذاتی پراپرٹی کی حکمت عملی کے لیے ہمارے سی ای او اور ہمارے ماہر ایجنٹوں سے رابطہ کریں۔",
            contactBtn: "پراپرٹی کی ضروریات کے لیے ہم سے رابطہ کریں"
        }
    };

    const t = isUrdu ? translations.ur : translations.en;

    return (
        <div className="min-h-screen flex flex-col bg-gruvbox-bg0 transition-colors duration-300" dir={isUrdu ? "rtl" : "ltr"}>
            <Helmet>
                <html lang={isUrdu ? "ur" : "en"} />
                <title>{t.metaTitle}</title>
                <meta name="description" content={t.metaDesc} />
            </Helmet>

            <Header isUrdu={isUrdu} setIsUrdu={setIsUrdu} />
            <main className="flex-grow pt-16">
                <Hero
                    onConsultClick={() => {
                        const contactSection = document.getElementById('contact-cta');
                        contactSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    isUrdu={isUrdu}
                    translations={{
                        heroTitle: t.heroTitle,
                        heroSub: t.heroSub,
                        heroBtn: t.heroBtn
                    }}
                />

                <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gruvbox-fg mb-4">{t.servicesTitle}</h2>
                        <div className="w-20 h-1 bg-gruvbox-blue mx-auto rounded-full"></div>
                        <p className="mt-4 text-xl text-gruvbox-fg/80 max-w-3xl mx-auto">
                            {t.servicesSub}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <article className="bg-gruvbox-bg1 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gruvbox-bg2 group">
                            <div className="bg-gruvbox-bg2 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Home className="h-8 w-8 text-gruvbox-blue" />
                            </div>
                            <h3 className="text-2xl font-bold text-gruvbox-fg mb-3">{t.buySellTitle}</h3>
                            <p className="text-gruvbox-fg/70 leading-relaxed">
                                {t.buySellDesc}
                            </p>
                        </article>

                        <article className="bg-gruvbox-bg1 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gruvbox-bg2 group">
                            <div className="bg-gruvbox-bg2 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Key className="h-8 w-8 text-gruvbox-orange" />
                            </div>
                            <h3 className="text-2xl font-bold text-gruvbox-fg mb-3">{t.tenantTitle}</h3>
                            <p className="text-gruvbox-fg/70 leading-relaxed">
                                {t.tenantDesc}
                            </p>
                        </article>

                        <article className="bg-gruvbox-bg1 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gruvbox-bg2 group">
                            <div className="bg-gruvbox-bg2 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Briefcase className="h-8 w-8 text-gruvbox-green" />
                            </div>
                            <h3 className="text-2xl font-bold text-gruvbox-fg mb-3">{t.landlordTitle}</h3>
                            <p className="text-gruvbox-fg/70 leading-relaxed">
                                {t.landlordDesc}
                            </p>
                        </article>
                    </div>
                </section>

                <section id="how-it-works" className="bg-gruvbox-bg1/50 py-20 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gruvbox-fg mb-4">{t.howItWorksTitle}</h2>
                            <div className="w-20 h-1 bg-gruvbox-blue mx-auto rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <article className="bg-gruvbox-bg1 p-8 rounded-2xl shadow-sm border border-gruvbox-bg2 text-center">
                                <div className="bg-gruvbox-bg2 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5">
                                    <ClipboardCheck className="h-7 w-7 text-gruvbox-blue" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gruvbox-fg">{t.step1}</h3>
                                <p className="text-gruvbox-fg/70 leading-relaxed">
                                    {t.step1Desc}
                                </p>
                            </article>

                            <article className="bg-gruvbox-bg1 p-8 rounded-2xl shadow-sm border border-gruvbox-bg2 text-center">
                                <div className="bg-gruvbox-bg2 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5">
                                    <Handshake className="h-7 w-7 text-gruvbox-orange" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gruvbox-fg">{t.step2}</h3>
                                <p className="text-gruvbox-fg/70 leading-relaxed">
                                    {t.step2Desc}
                                </p>
                            </article>

                            <article className="bg-gruvbox-bg1 p-8 rounded-2xl shadow-sm border border-gruvbox-bg2 text-center">
                                <div className="bg-gruvbox-bg2 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5">
                                    <BadgeDollarSign className="h-7 w-7 text-gruvbox-green" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gruvbox-fg">{t.step3}</h3>
                                <p className="text-gruvbox-fg/70 leading-relaxed">
                                    {t.step3Desc}
                                </p>
                            </article>
                        </div>
                    </div>
                </section>

                {/* Geographic SEO Sections (Hidden from visible UI to avoid false claims) */}
                <div id="locations" className="hidden" aria-hidden="true">
                    {t.citySections.map((city) => (
                        <div key={city.id} id={city.id}>
                            <h2>{city.title}</h2>
                            <p>{city.content}</p>
                        </div>
                    ))}
                </div>

                <section id="fees" className="py-14 sm:py-16 md:py-20">
                    <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">

                        <div className="bg-gruvbox-bg1 border border-gruvbox-bg2 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 relative">
                            {/* Translation toggle moved to Header */}

                            <div className={isUrdu ? "text-right" : "text-left"} dir={isUrdu ? "rtl" : "ltr"}>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gruvbox-fg mb-4 sm:mb-6 text-center">
                                    {t.title}
                                </h2>

                                <p className="text-sm sm:text-base md:text-lg text-gruvbox-fg/80 text-center max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8">
                                    {t.description}
                                </p>

                                <ul className="text-sm sm:text-base md:text-lg text-gruvbox-fg/80 max-w-3xl mx-auto list-disc list-outside pl-5 pr-5 sm:pl-6 sm:pr-6 space-y-3 sm:space-y-4">
                                    {t.items.map((item, index) => (
                                        <li key={index}>
                                            {typeof item === 'string' ? (
                                                item
                                            ) : (
                                                <>
                                                    <strong>{item.label}</strong> {item.content}
                                                </>
                                            )}
                                        </li>
                                    ))}
                                </ul>

                                <p className="text-xs sm:text-sm text-gruvbox-fg/60 max-w-3xl mx-auto mt-8 text-center leading-relaxed">
                                    {t.footer}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="contact-cta" className="py-20 bg-gruvbox-blue transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gruvbox-bg0 mb-6">{t.contactCta}</h2>
                        <p className="text-gruvbox-bg0/90 text-xl max-w-3xl mx-auto mb-10 font-medium">
                            {t.contactSub}
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-block bg-gruvbox-bg0 text-gruvbox-fg font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:bg-gruvbox-bg1 transition-colors transform hover:-translate-y-1"
                        >
                            {t.contactBtn}
                        </button>
                    </div>
                </section>
            </main>
            <Footer isUrdu={isUrdu} />
            <Suspense fallback={null}>
                {isModalOpen && (
                    <ContactModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        isUrdu={isUrdu}
                    />
                )}
            </Suspense>
        </div>
    );
}

export default App;
