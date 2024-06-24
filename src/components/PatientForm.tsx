import { useForm } from "react-hook-form";
import Error from "./Error";
import type { DraftPatient } from "../types";
import { usePatientStore } from "../store/store"
import { useEffect } from "react";
import { toast } from "react-toastify";
 
export default function PatientForm() {

  const { addPatient, activeId, patients, updatePatient }= usePatientStore()

  const { formState: { errors }} = useForm();
  const {register, handleSubmit, reset, setValue} = useForm<DraftPatient>();

  useEffect(() => {
    if(activeId) {
      const activePatient = patients.filter(patient => patient.id === activeId)[0]

      setValue('name', activePatient.name)
      setValue('eps', activePatient.eps)
      setValue('date', activePatient.date)
      setValue('email', activePatient.email)
      setValue('symptoms', activePatient.symptoms)
    }

  }, [activeId])

  const registerPatient = (data: DraftPatient) => {

    if(activeId){
      updatePatient(data)
      toast.success('Patient successfully edited')
    } else {
      addPatient(data)
      toast.success('Patient successfully created')
    }

    reset() // clear the form
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Patient Monitoring</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Add Patients and {""}
        <span className="text-indigo-600 font-bold">manage them</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        onSubmit={handleSubmit(registerPatient)}
        noValidate
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Patient
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Name of patient"
            {...register("name", {
              required: "Patient name required",
              maxLength: {
                value: 50,
                message: "Maximum 50 characters",
              },
            })}
          />

          {errors.name && <Error>{errors.name?.message?.toString()}</Error>}

          {errors.maxLength && (
            <Error>{errors.name?.message?.toString()}</Error>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="caretaker" className="text-sm uppercase font-bold">
            EPS
          </label>
          <input
            id="caretaker"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="EPS"
            {...register("eps", {
              required: "EPS name required",
            })}
          />

          {errors.eps && (<Error>{errors.eps?.message?.toString()}</Error>)}
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            className="w-full p-3  border border-gray-100"
            type="email"
            placeholder="Patient Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email not valid'
              }
            })} 
          />

          {errors.email && (<Error>{errors.email?.message?.toString()}</Error>)}
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">
            Discharge date
          </label>
          <input
            id="date"
            className="w-full p-3  border border-gray-100"
            type="date"
            {...register("date", {
              required: "Discharge date is required",
            })}
          />

          {errors.date && (<Error>{errors.date?.message?.toString()}</Error>)}
        </div>

        <div className="mb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold">
            Symptoms
          </label>
          <textarea
            id="symptoms"
            className="w-full p-3  border border-gray-100"
            placeholder="Patient symptoms"
            {...register("symptoms", {
              required: "Symptoms are required",
            })}
          ></textarea>

          {errors.symptoms && (<Error>{errors.symptoms?.message?.toString()}</Error>)}

        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value="Save Patient"
        />
      </form>
    </div>
  );
}
