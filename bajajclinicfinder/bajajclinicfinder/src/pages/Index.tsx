
import React, { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import DoctorCard from "@/components/DoctorCard";
import { fetchAllDoctors } from "@/lib/api";
import { Doctor, FilterState } from "@/lib/types";

const Index = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    consultationType: "",
    specialties: [],
    sortBy: ""
  });

  useEffect(() => {
    const loadDoctors = async () => {
      setLoading(true);
      try {
        const data = await fetchAllDoctors();
        setDoctors(data);
        setFilteredDoctors(data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, doctors]);

  const applyFilters = () => {
    let filtered = [...doctors];
    
    // Apply search filter
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply consultation type filter
    if (filters.consultationType) {
      filtered = filtered.filter(doctor => 
        doctor.consultationType.includes(filters.consultationType)
      );
    }
    
    // Apply specialties filter
    if (filters.specialties.length > 0) {
      filtered = filtered.filter(doctor => 
        filters.specialties.some(specialty => doctor.specialty.includes(specialty))
      );
    }
    
    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "feesAsc":
          filtered.sort((a, b) => a.fees - b.fees);
          break;
        case "expDesc":
          filtered.sort((a, b) => b.experience - a.experience);
          break;
        default:
          break;
      }
    }
    
    setFilteredDoctors(filtered);
  };

  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, searchTerm }));
  };

  const handleConsultationTypeChange = (consultationType: string) => {
    setFilters(prev => ({ ...prev, consultationType }));
  };

  const handleSpecialtyChange = (specialties: string[]) => {
    setFilters(prev => ({ ...prev, specialties }));
  };

  const handleSortChange = (sortBy: string) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: "",
      consultationType: "",
      specialties: [],
      sortBy: ""
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-6 px-4 md:px-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Find Doctors & Book Appointments</h1>
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Filter Results Summary */}
        <div className="mb-6 flex flex-wrap justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold text-gray-800">
              {loading ? "Loading doctors..." : `${filteredDoctors.length} Doctors Found`}
            </h2>
            {(filters.searchTerm || filters.consultationType || filters.specialties.length > 0 || filters.sortBy) && (
              <div className="text-sm text-gray-500 mt-1">
                Filters applied: {" "}
                {[
                  filters.searchTerm && `Search: "${filters.searchTerm}"`,
                  filters.consultationType && `Type: ${filters.consultationType}`,
                  filters.specialties.length > 0 && `Specialties: ${filters.specialties.length} selected`,
                  filters.sortBy === "feesAsc" && "Sorted by: Fees (Low to High)",
                  filters.sortBy === "expDesc" && "Sorted by: Experience (High to Low)"
                ].filter(Boolean).join(", ")}
                <button onClick={clearFilters} className="ml-2 text-blue-500 hover:text-blue-700">
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Panel */}
          <div className="lg:col-span-1">
            <FilterPanel
              onConsultationTypeChange={handleConsultationTypeChange}
              onSpecialtyChange={handleSpecialtyChange}
              onSortChange={handleSortChange}
              selectedConsultationType={filters.consultationType}
              selectedSpecialties={filters.specialties}
              selectedSortOption={filters.sortBy}
            />
          </div>

          {/* Doctor Listing */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredDoctors.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <h3 className="text-xl font-medium text-gray-800 mb-2">No doctors match your search criteria</h3>
                <p className="text-gray-600 mb-4">Try changing your filters or search term</p>
                <button 
                  onClick={clearFilters} 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
