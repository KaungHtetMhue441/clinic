import { usePatientsContext } from "../../contexts/patientsContext";
import { useUpdatePatientsContext } from "../../contexts/updatePatientContext";
import { formValidateion,getStringToDate,getDateString, setData } from "../../utils/helpers";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";

export  const UpdateForm = ()=>{


const {patients,setPatients} = usePatientsContext();
const {patient,setPatient} = useUpdatePatientsContext();
const [startDate, setStartDate] = useState("");
const [formError,setFormError] = useState([]);


useEffect(()=>{
    setStartDate(patient.date?getStringToDate(patient.date):new Date())
},[patient])

function getpatient(id)
{
    setPatient(JSON.parse(localStorage.getItem('patients')));
    const gender = Object.values(document.getElementsByClassName("radio")).map((element)=>{
        if(element.value=patient.gender){
            element.checked = true;
        }
    });
}
const status = ['active','inactive',].map((item)=>{
    let selected = item===patient.status
    return(
        <option value={item}  selected={selected}>{item}</option>
    )
});
const breed = ['hello','haha',].map((item)=>{
    let selected = item===patient.breed;
    return(
        <option value={item} selected={selected}>{item}</option>
    )
});
const city = ['Nay Pyi Taw','lawei',].map((item)=>{
    let selected = item==patient.city

    return(
        <option value={item} selected={selected}>{item}</option>
    )
});
const township = ['Nay Pyi Taw','Yangon',].map((item)=>{
    let selected = item==patient.township
    return(
        <option value={item} selected={selected}>{item}</option>
    )
});


const handleChange = (event)=>{
    if(formValidateion(patient,setFormError)){
        let NewPatients = patients.map((item) =>{
            if(item.id===patient.id){
                return patient;
            }
            return item;
        })
        setData('patients',NewPatients);
        setPatients(NewPatients);
        console.log('successfully')
        return;
    }
    console.log("fail");
    event.preventDefault()

}
return (
    <div className="modal fade" id="updatePatient" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog">
    <div className="modal-content">
                <form onSubmit={handleChange} action="#">
                    <div className="position-relative pt-4">
                        <h3 className="modal-title fs-5 text-center text-primary font-18 modal-title" id="staticBackdropLabel">Add New patient</h3>
                        <h6 className="text-center text-black-50 font-12 modal-subtitle">Enter new patient below.</h6>

                        <button type="button" className="btn-close position-absolute modal-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <ul>
                                {formError}
                            </ul>
                        </div>
                            <div className="row justify-content-center gap-2 p-0">     
                                    <div className="col-5">
                                        <label htmlFor="">Pet Name</label>
                                        <input type="text" className=" form-control form-control-sm " 
                                        value={patient.petName}
                                        onChange={(event)=>{setPatient({...patient,petName:event.target.value})}}
                                        required
                                        />
                                        
                                    </div> 
                                    <div className="col-5 justify-content-between">
                                        <label htmlFor="">Status</label>
                    
                                        <select name="status" className="form-select form-select-sm" id="status" 
                                        onChange={(event)=>{return setPatient({...patient,status:event.target.value})}}
                                        required 
                                        >
                                            <option value="" selected>Please Choose status</option>
                                            {status}
                                        </select>
                                    </div> 
                                    <div className="col-5 justify-content-between">
                                        <label htmlFor="">Pawrent</label>
                                        <input type="text" className=" form-control form-control-sm " 
                                        value={patient.pawrent}
                                        onChange={(event)=>{setPatient({...patient,pawrent:event.target.value})}}
                                        required
                                        />
                                    </div> 
                                    <div className="col-5 justify-content-between">
                                        <label htmlFor="">Breed</label>
                                        <select name="breed" className="form-select form-select-sm" id="breed"
                                        onChange={(event)=>{return setPatient({...patient,breed:event.target.value})}}
                                        required
                                        >
                                            <option value="" >Please Choose breed</option>
                                            {breed}
                                        </select>
                                    </div> 
                                    <div className="col-5 justify-content-between">
                                        <div className="row">
                                            <div className="col-6">
                                                <input type="radio"id="" className="radio"
                                                    value={patient.gender}
                                                    onClick={(event)=>{setPatient({...patient,gender:"male"})}}
                                                    required
                                                />
                                                <label htmlFor="">Male</label>
                                            </div>
                                        <div className="col-6">
                                            <input type="radio"  id="" className="radio"
                                                    value={patient.gender}
                                                    onClick={(event)=>{setPatient({...patient,gender:"female"})}}
                                                    required
                                                />
                                            <label htmlFor="">Female</label>
                                        </div>
                                        
                                        </div>
                                
                                    </div> 
                                    <div className="col-5 justify-content-between">
                                        <label htmlFor="">Date</label>
                                        <DatePicker selected={startDate} onChange={(date) =>{setStartDate(date);setPatient({...patient,date:getDateString(date)})}} />
                                    </div>
                                    <div className="col-5 justify-content-between">
                                        <label htmlFor="">Phone Number</label>
                                        <input type="text" className=" form-control form-control-sm " 
                                        value={patient.ph_no}
                                        onChange={(event)=>{setPatient({...patient,ph_no:event.target.value})}}
                                        required
                                        />
                                    </div>
                                    <div className="col-5 justify-content-between">
                                        <label htmlFor="">Address</label>
                                        <input type="text" className=" form-control form-control-sm " 
                                        value={patient.address}
                                        onChange={(event)=>{setPatient({...patient,address:event.target.value})}}
                                        required
                                        />
                                    </div>
                                    <div className="col-5 justify-content-between">
                                        <label htmlFor="">City</label>
                                        <select name="city" className="form-select form-select-sm" id="city" 
                                            onChange={(event)=>{return setPatient({...patient,city:event.target.value})}}
                                            required
                                        >
                                            <option value="" selected>Please Choose city</option>
                                            {city}
                                        </select>
                                    </div>
                                    <div className="col-5 justify-content-between">
                                    <label htmlFor="">Township</label>
                                        <select name="township" className="form-select form-select-sm" id="township" 
                                            onChange={(event)=>{return setPatient({...patient,township:event.target.value})}}
                                            required
                                        >
                                            <option value="" selected>Please Choose township</option>
                                            {city}
                                        </select>
                                    </div>
                            </div>
                    </div>
                    <div className="row justify-content-center gap-2 mb-3">
                        <button type="submit" className="btn btn-primary col-3">Save</button>
                        <button type="button" id="close" className="btn btn-secondary col-3" data-bs-dismiss="modal">Close</button>
                    </div>
                </form>
            </div>
    </div>
</div>
)

}