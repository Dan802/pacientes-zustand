export type Patient = {
  id: string
  name: string
  eps: string
  email: string
  date: Date
  symptoms: string
}

export type DraftPatient = Omit<Patient, 'id'>