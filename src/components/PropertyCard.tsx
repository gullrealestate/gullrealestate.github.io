
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react';
import { Property } from '../data/properties';

interface PropertyCardProps {
    property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="relative h-64 overflow-hidden group">
                <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                    <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white text-gray-600 hover:text-red-500 transition-colors">
                        <Heart className="h-5 w-5" />
                    </button>
                </div>
                <div className="absolute top-4 left-4">
                    <span className={`
            px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider
            ${property.type === 'sale' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'}
          `}>
                        For {property.type === 'sale' ? 'Sale' : 'Rent'}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">{property.title}</h3>
                        <div className="flex items-center text-gray-500 text-sm">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="line-clamp-1">{property.location}</span>
                        </div>
                    </div>
                    <p className="text-blue-600 font-bold text-xl whitespace-nowrap">
                        {property.price}
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-100">
                    <div className="flex flex-col items-center">
                        <Bed className="h-5 w-5 text-gray-400 mb-1" />
                        <span className="text-sm font-medium text-gray-700">{property.beds} Beds</span>
                    </div>
                    <div className="flex flex-col items-center border-l border-r border-gray-100">
                        <Bath className="h-5 w-5 text-gray-400 mb-1" />
                        <span className="text-sm font-medium text-gray-700">{property.baths} Baths</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Square className="h-5 w-5 text-gray-400 mb-1" />
                        <span className="text-sm font-medium text-gray-700">{property.area}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
