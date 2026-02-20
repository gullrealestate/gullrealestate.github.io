import { useState } from 'react';
import { Home, Key, Briefcase, BadgeDollarSign, ClipboardCheck, Handshake } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ContactModal from './components/ContactModal';

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
            button: "Translate to Urdu"
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
            button: "In English"
        }
    };

    const t = isUrdu ? translations.ur : translations.en;

    return (
        <div className="min-h-screen flex flex-col bg-gruvbox-bg0 transition-colors duration-300">
            <Header />
            <main className="flex-grow pt-16">
                <Hero onConsultClick={() => setIsModalOpen(true)} />

                <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gruvbox-fg mb-4">Agency Services</h2>
                        <div className="w-20 h-1 bg-gruvbox-blue mx-auto rounded-full"></div>
                        <p className="mt-4 text-xl text-gruvbox-fg/80 max-w-3xl mx-auto">
                            We are a real estate agency. We guide and execute the process so you can buy, sell, rent,
                            or list a house for rent with confidence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <article className="bg-gruvbox-bg1 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gruvbox-bg2 group">
                            <div className="bg-gruvbox-bg2 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Home className="h-8 w-8 text-gruvbox-blue" />
                            </div>
                            <h3 className="text-2xl font-bold text-gruvbox-fg mb-3">Buy / Sell Consultation</h3>
                            <p className="text-gruvbox-fg/70 leading-relaxed">
                                Speak directly with our CEO to plan your purchase or sale strategy, market pricing, negotiation,
                                and next legal steps.
                            </p>
                        </article>

                        <article className="bg-gruvbox-bg1 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gruvbox-bg2 group">
                            <div className="bg-gruvbox-bg2 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Key className="h-8 w-8 text-gruvbox-orange" />
                            </div>
                            <h3 className="text-2xl font-bold text-gruvbox-fg mb-3">Tenant Consultation</h3>
                            <p className="text-gruvbox-fg/70 leading-relaxed">
                                Connect with our office agents for rental support. We help you shortlist options, compare terms,
                                and make safe rental decisions.
                            </p>
                        </article>

                        <article className="bg-gruvbox-bg1 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gruvbox-bg2 group">
                            <div className="bg-gruvbox-bg2 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Briefcase className="h-8 w-8 text-gruvbox-green" />
                            </div>
                            <h3 className="text-2xl font-bold text-gruvbox-fg mb-3">Landlord Listing Consultation</h3>
                            <p className="text-gruvbox-fg/70 leading-relaxed">
                                Have a house available for rent? Talk to our CEO or agents to list it through our network and
                                connect with suitable tenants faster.
                            </p>
                        </article>
                    </div>
                </section>

                <section id="how-it-works" className="bg-gruvbox-bg1/50 py-20 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gruvbox-fg mb-4">How Our Agency Works</h2>
                            <div className="w-20 h-1 bg-gruvbox-blue mx-auto rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <article className="bg-gruvbox-bg1 p-8 rounded-2xl shadow-sm border border-gruvbox-bg2 text-center">
                                <div className="bg-gruvbox-bg2 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5">
                                    <ClipboardCheck className="h-7 w-7 text-gruvbox-blue" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gruvbox-fg">1. Share Your Requirement</h3>
                                <p className="text-gruvbox-fg/70 leading-relaxed">
                                    Tell us your goal: buy, sell, rent, or list your vacant house. We understand your budget,
                                    location, and timeline first.
                                </p>
                            </article>

                            <article className="bg-gruvbox-bg1 p-8 rounded-2xl shadow-sm border border-gruvbox-bg2 text-center">
                                <div className="bg-gruvbox-bg2 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5">
                                    <Handshake className="h-7 w-7 text-gruvbox-orange" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gruvbox-fg">2. Expert Guidance</h3>
                                <p className="text-gruvbox-fg/70 leading-relaxed">
                                    We guide and execute with practical support, negotiation help, and coordination with the right
                                    people in our network.
                                </p>
                            </article>

                            <article className="bg-gruvbox-bg1 p-8 rounded-2xl shadow-sm border border-gruvbox-bg2 text-center">
                                <div className="bg-gruvbox-bg2 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5">
                                    <BadgeDollarSign className="h-7 w-7 text-gruvbox-green" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gruvbox-fg">3. Close With Confidence</h3>
                                <p className="text-gruvbox-fg/70 leading-relaxed">
                                    You make the final transaction directly. We charge agency fees for our professional
                                    advisory and facilitation services.
                                </p>
                            </article>
                        </div>
                    </div>
                </section>

                <section id="fees" className="py-14 sm:py-16 md:py-20">
                    <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">

                        <div className="bg-gruvbox-bg1 border border-gruvbox-bg2 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 relative">
                            <div className="flex justify-end mb-4">
                                <button
                                    onClick={() => setIsUrdu(!isUrdu)}
                                    className="px-4 py-2 bg-gruvbox-bg2 text-gruvbox-fg text-sm font-medium rounded-lg hover:bg-gruvbox-bg3 transition-colors border border-gruvbox-bg3 shadow-sm"
                                >
                                    {t.button}
                                </button>
                            </div>

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
                        <h2 className="text-3xl md:text-4xl font-bold text-gruvbox-bg0 mb-6">Are you ready to buy, sell, or rent a house?</h2>
                        <p className="text-gruvbox-bg0/90 text-xl max-w-3xl mx-auto mb-10 font-medium">
                            Speak with our CEO for buy/sell consultation or connect with our agents for renting and landlord
                            listing support.
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-block bg-gruvbox-bg0 text-gruvbox-fg font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:bg-gruvbox-bg1 transition-colors transform hover:-translate-y-1"
                        >
                            Contact Us To Fulfill Your Housing Needs
                        </button>
                    </div>
                </section>
            </main>
            <Footer />
            <ContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}

export default App;
