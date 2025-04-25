
import React, { useEffect, useState } from "react";
import { CheckIcon } from "lucide-react";
import { fetchSpecialties, fetchConsultationTypes } from "@/lib/api";

interface FilterPanelProps {
  onConsultationTypeChange: (type: string) => void;
  onSpecialtyChange: (specialties: string[]) => void;
  onSortChange: (sortBy: string) => void;
  selectedConsultationType: string;
  selectedSpecialties: string[];
  selectedSortOption: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  onConsultationTypeChange,
  onSpecialtyChange,
  onSortChange,
  selectedConsultationType,
  selectedSpecialties,
  selectedSortOption,
}) => {
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [consultationTypes, setConsultationTypes] = useState<string[]>([]);
  const [showSpecialties, setShowSpecialties] = useState(true);

  useEffect(() => {
    const loadFilterData = async () => {
      const specialtiesList = await fetchSpecialties();
      const consultTypes = await fetchConsultationTypes();
      
      setSpecialties(specialtiesList);
      setConsultationTypes(consultTypes);
    };
    
    loadFilterData();
  }, []);

  const handleSpecialtyToggle = (specialty: string) => {
    const updatedSpecialties = selectedSpecialties.includes(specialty)
      ? selectedSpecialties.filter(item => item !== specialty)
      : [...selectedSpecialties, specialty];
    
    onSpecialtyChange(updatedSpecialties);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 h-fit sticky top-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
      
      {/* Consultation Type Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Consultation Type</h4>
        <div className="space-y-2">
          {consultationTypes.map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="radio"
                name="consultationType"
                checked={selectedConsultationType === type}
                onChange={() => onConsultationTypeChange(type)}
                className="w-4 h-4 text-blue-600 mr-2"
              />
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Specialties Filter */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-gray-700">Specialties</h4>
          <button 
            onClick={() => setShowSpecialties(!showSpecialties)}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            {showSpecialties ? 'Hide' : 'Show'}
          </button>
        </div>
        
        {showSpecialties && (
          <div className="max-h-60 overflow-y-auto space-y-2">
            {specialties.map((specialty) => (
              <label key={specialty} className="flex items-center">
                <div 
                  className={`w-4 h-4 border rounded mr-2 flex items-center justify-center ${
                    selectedSpecialties.includes(specialty) 
                    ? 'bg-blue-500 border-blue-500' 
                    : 'border-gray-300'
                  }`}
                  onClick={() => handleSpecialtyToggle(specialty)}
                >
                  {selectedSpecialties.includes(specialty) && (
                    <CheckIcon className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className="text-gray-700">{specialty}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      
      {/* Sorting Options */}
      <div>
        <h4 className="font-medium text-gray-700 mb-2">Sort By</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="sortBy"
              checked={selectedSortOption === "feesAsc"}
              onChange={() => onSortChange("feesAsc")}
              className="w-4 h-4 text-blue-600 mr-2"
            />
            <span className="text-gray-700">Fees (Low to High)</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="sortBy"
              checked={selectedSortOption === "expDesc"}
              onChange={() => onSortChange("expDesc")}
              className="w-4 h-4 text-blue-600 mr-2"
            />
            <span className="text-gray-700">Experience (High to Low)</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
