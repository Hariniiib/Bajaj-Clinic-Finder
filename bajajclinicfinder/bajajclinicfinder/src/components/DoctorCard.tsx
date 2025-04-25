
import React from "react";
import { Doctor } from "@/lib/types";
import { Star } from "lucide-react";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-4 flex flex-col sm:flex-row gap-4">
        {/* Doctor Image */}
        <div className="flex-shrink-0">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-24 h-24 rounded-full object-cover mx-auto sm:mx-0"
          />
        </div>

        {/* Doctor Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
            <div className="flex items-center bg-blue-50 px-2 py-1 rounded text-sm">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="font-medium">{doctor.rating}</span>
            </div>
          </div>
          
          <div className="mb-2">
            <p className="text-sm text-gray-500">{doctor.qualification}</p>
            <p className="text-sm font-medium text-gray-700">
              {doctor.specialty.join(", ")}
            </p>
          </div>
          
          <div className="mb-2">
            <p className="text-sm text-gray-700">
              <span className="font-medium">{doctor.experience} years</span> experience
            </p>
          </div>
          
          <div className="text-sm text-gray-600 mb-3">
            <p>{doctor.address}</p>
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              {doctor.consultationType.map((type) => (
                <span 
                  key={type} 
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    type === "Video Consult" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {type}
                </span>
              ))}
            </div>
            <div className="text-blue-600 font-semibold">
              ₹{doctor.fees}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-3 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{doctor.availability}</span>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
