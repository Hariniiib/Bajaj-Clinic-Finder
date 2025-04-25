
export interface Doctor {
  id: string;
  name: string;
  specialty: string[];
  experience: number;
  fees: number;
  image: string;
  consultationType: string[];
  qualification: string;
  rating: number;
  address: string;
  availability: string;
}

export interface FilterState {
  searchTerm: string;
  consultationType: string;
  specialties: string[];
  sortBy: string;
}
