
import { Doctor } from "./types";

// Mock API data
const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: ["Cardiologist", "Internal Medicine"],
    experience: 15,
    fees: 1500,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    consultationType: ["Video Consult", "In Clinic"],
    qualification: "MD, MBBS, FRCS",
    rating: 4.8,
    address: "123 Medical Center, New York",
    availability: "Mon-Fri, 9AM-5PM"
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: ["Neurologist"],
    experience: 12,
    fees: 2000,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    consultationType: ["Video Consult"],
    qualification: "MBBS, DNB, PhD",
    rating: 4.9,
    address: "456 Health Street, Boston",
    availability: "Tues-Sat, 10AM-6PM"
  },
  {
    id: "3",
    name: "Dr. Emily Wilson",
    specialty: ["Dermatologist"],
    experience: 8,
    fees: 1200,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    consultationType: ["In Clinic"],
    qualification: "MD, FAAD",
    rating: 4.7,
    address: "789 Skin Care Ave, Chicago",
    availability: "Mon-Wed, 8AM-4PM"
  },
  {
    id: "4",
    name: "Dr. David Rodriguez",
    specialty: ["Orthopedic Surgeon"],
    experience: 20,
    fees: 2500,
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    consultationType: ["Video Consult", "In Clinic"],
    qualification: "MD, MS Ortho",
    rating: 4.9,
    address: "321 Bone Health Clinic, Los Angeles",
    availability: "Wed-Sun, 9AM-7PM"
  },
  {
    id: "5",
    name: "Dr. Susan Lee",
    specialty: ["Pediatrician", "Allergist"],
    experience: 10,
    fees: 1000,
    image: "https://randomuser.me/api/portraits/women/95.jpg",
    consultationType: ["Video Consult", "In Clinic"],
    qualification: "MD, DCH",
    rating: 4.6,
    address: "567 Children's Health Center, Seattle",
    availability: "Mon-Fri, 8AM-6PM"
  },
  {
    id: "6",
    name: "Dr. James Wilson",
    specialty: ["Psychiatrist"],
    experience: 14,
    fees: 1800,
    image: "https://randomuser.me/api/portraits/men/29.jpg",
    consultationType: ["Video Consult"],
    qualification: "MD, MRCPsych",
    rating: 4.7,
    address: "890 Mental Health Clinic, Miami",
    availability: "Tues-Sat, 10AM-8PM"
  },
  {
    id: "7",
    name: "Dr. Aisha Khan",
    specialty: ["Gynecologist", "Obstetrician"],
    experience: 16,
    fees: 1600,
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    consultationType: ["In Clinic"],
    qualification: "MBBS, MS, DNB",
    rating: 4.8,
    address: "432 Women's Health Center, Houston",
    availability: "Mon-Thurs, 9AM-5PM"
  },
  {
    id: "8",
    name: "Dr. Robert Smith",
    specialty: ["Ophthalmologist"],
    experience: 18,
    fees: 1700,
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    consultationType: ["Video Consult", "In Clinic"],
    qualification: "MD, FRCS",
    rating: 4.5,
    address: "765 Eye Care Center, Philadelphia",
    availability: "Wed-Mon, 8AM-4PM"
  },
  {
    id: "9",
    name: "Dr. Alexander Davis",
    specialty: ["Dentist"],
    experience: 7,
    fees: 900,
    image: "https://randomuser.me/api/portraits/men/60.jpg",
    consultationType: ["In Clinic"],
    qualification: "BDS, MDS",
    rating: 4.6,
    address: "123 Dental Clinic, San Francisco",
    availability: "Mon-Fri, 9AM-6PM"
  },
  {
    id: "10",
    name: "Dr. Maria Gonzalez",
    specialty: ["Endocrinologist", "Internal Medicine"],
    experience: 13,
    fees: 1900,
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    consultationType: ["Video Consult"],
    qualification: "MD, DM",
    rating: 4.9,
    address: "678 Diabetes Care Center, Phoenix",
    availability: "Tues-Sat, 8AM-5PM"
  }
];

// Get all doctors
export const fetchAllDoctors = async (): Promise<Doctor[]> => {
  // Simulating API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDoctors);
    }, 500);
  });
};

// Get unique specialties from all doctors
export const fetchSpecialties = async (): Promise<string[]> => {
  const allSpecialties = mockDoctors.flatMap(doctor => doctor.specialty);
  const uniqueSpecialties = [...new Set(allSpecialties)];
  return uniqueSpecialties.sort();
};

// Get consultation types
export const fetchConsultationTypes = async (): Promise<string[]> => {
  return ["Video Consult", "In Clinic"];
};

// Search doctors by name (for autocomplete)
export const searchDoctorsByName = async (query: string): Promise<Doctor[]> => {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) return [];
  
  const matches = mockDoctors.filter(doctor => 
    doctor.name.toLowerCase().includes(normalizedQuery)
  );
  
  // Return top 3 matches
  return matches.slice(0, 3);
};
