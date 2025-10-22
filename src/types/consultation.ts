export interface ConsultationFormData {
  name: string
  age?: number
  gender: string
  phone: string
  height?: number
  weight?: number
  complaints: string
  examinations: string[]
  hasChronicDiseases: boolean
  chronicDiseases: string
  takesMedications: boolean
  medications: string
  painLevel: number
  hasAllergy: boolean
  allergies: string
  additionalNotes: string
}