import { MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
    isUrdu?: boolean;
}

export default function Footer({ isUrdu }: FooterProps) {
    return (
        <footer className="bg-gruvbox-bg1 border-t border-gruvbox-bg2 text-gruvbox-fg pt-12 pb-8" dir={isUrdu ? "rtl" : "ltr"}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="text-start">
                        <div className="flex items-center gap-2 mb-4">
                            <img
                                src="/images/logo.png"
                                alt={isUrdu ? "گل رئیل اسٹیٹ اینڈ بلڈرز مردان لوگو" : "GULL Real Estate and Builders Mardan Logo"}
                                className="h-10 w-auto"
                                width="40"
                                height="40"
                            />
                            <span className="text-xl font-bold">{isUrdu ? "گل رئیل اسٹیٹ اینڈ بلڈرز" : "GULL Real Estate and Builders"}</span>
                        </div>
                        <p className="text-gruvbox-fg/70 mb-4 leading-relaxed">
                            {isUrdu
                                ? "ہم ایک رئیل اسٹیٹ ایجنسی ہیں جو خرید و فروخت کی رہنمائی، کرائے کی مشاورت، اور کرایہ داروں کی تلاش میں مالکان کی مدد کرتی ہے۔"
                                : "We are a real-estate agency helping clients with buy/sell guidance, rental consultation, and landlord support for tenant placement."}
                        </p>
                        <p className="text-gruvbox-fg/60 text-sm leading-relaxed">
                            {isUrdu
                                ? "مشاورتی اور سہولت کاری کی خدمات کے لیے ایجنسی فیس لاگو ہوتی ہے۔ پراپرٹی کے لین دین کی ادائیگیاں براہ راست کلائنٹس کرتے ہیں۔"
                                : "Agency fee applies for advisory and facilitation services. Property transaction payments are made directly by clients."}
                        </p>
                    </div>

                    <div className="text-start md:text-end">
                        <h3 className="text-lg font-semibold mb-4">{isUrdu ? "ایجنسی کی معلومات" : "Agency Information"}</h3>
                        <div className="flex flex-col gap-3 items-start md:items-end">
                            <a
                                href="https://maps.app.goo.gl/n5h9QsixjkC4SAbn7"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-gruvbox-fg/70 hover:text-gruvbox-blue transition-colors"
                            >
                                <MapPin className="h-4 w-4" />
                                <span>{isUrdu ? "شین گل پلازہ، صوابی روڈ، مردان، کے پی کے" : "Sheen Gull Plaza, Swabi Road, Mardan, KPK"}</span>
                            </a>
                            <div className="flex items-center gap-2 text-gruvbox-fg/70">
                                <Phone className="h-4 w-4" />
                                <a href="tel:0937861777" className="hover:text-gruvbox-blue transition-colors" dir="ltr">0937 861777</a>
                            </div>
                            <a
                                href="mailto:agul40160@gmail.com"
                                className="mt-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-gruvbox-bg0 bg-gruvbox-blue hover:bg-gruvbox-blue/80 transition-colors shadow-sm"
                            >
                                <Mail className={`h-4 w-4 ${isUrdu ? "ml-2" : "mr-2"}`} />
                                {isUrdu ? "مسئلے کی اطلاع دیں" : "Report an Issue"}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gruvbox-bg2 pt-8 text-center text-gruvbox-gray text-sm">
                    <p dir="ltr">&copy; 2023 - {new Date().getFullYear()} GULL Real Estate and Builders. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
