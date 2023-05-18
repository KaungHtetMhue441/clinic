import { useState } from "react";
import { usePatientsContext } from "../../contexts/patientsContext";
import { formValidateion,getDateString,setData } from "../../utils/helpers";
import DatePicker from "react-datepicker";

export  const AddForm = ()=>{

const {patients,setPatients} = usePatientsContext();
const [startDate, setStartDate] = useState(new Date());
const [formError,setFormError] = useState([]);

const [patient,setPatient] = useState(
    {id:"",petName:"",status:"",pawrent:"",breed:"",gender:"",date:getDateString(startDate),ph_no:"",address:"",city:"",township:""}
)
const status = ['active','inactive',].map((item)=>{
    return(
        <option value={item}>{item}</option>
    )
});
const breed = ['hello','haha',].map((item)=>{
    return(
        <option value={item}>{item}</option>
    )
});
const city = ['Nay Pyi Taw','lawei',].map((item)=>{
    return(
        <option value={item}>{item}</option>
    )
});
const township = ['Nay Pyi Taw','Yangon',].map((item)=>{
    return(
        <option value={item}>{item}</option>
    )
});

const refreshForm = ()=>
{
    setPatient({id:"",petName:"",status:"",pawrent:"",breed:"",gender:"",date:getDateString(startDate),ph_no:"",address:"",city:"",township:""})
    const gender = Object.values(document.getElementsByClassName("radio")).map((element)=>element.checked=false);
}




const getPatientId = ()=>
{
    let lastPatientId = localStorage.getItem('lastPatientId');
    lastPatientId = lastPatientId.split('-')
    if(Number(lastPatientId[1])>=9999){
        lastPatientId[0]= lastPatientId[0].substring(0, lastPatientId[0] - 1)+ String.fromCharCode(lastPatientId[0].charCodeAt(lastPatientId[0].length - 1) + 1);
    }
    let lastNumberString = (Number(lastPatientId[1])+1).toString();
    lastPatientId[1] = lastNumberString.padStart(4, 0);
    lastPatientId[1] = (lastPatientId[1]); //
    lastPatientId = lastPatientId.join('-');
    console.log(lastPatientId);
    localStorage.setItem('lastPatientId',lastPatientId);

    return lastPatientId;
}

const handleChange = (event)=>{
    if(formValidateion(patient,setFormError)){
        let newPatients = [...patients,{...patient,id:getPatientId()}];
        setPatients(newPatients);
        setData('patients',newPatients)
        refreshForm();
        return;
    }
    event.preventDefault()
}

return (
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <form onSubmit={handleChange}>
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
                                            <option value="" selected>Please Choose breed</option>
                                            {city}
                                        </select>
                                    </div>
                                    <div className="col-5 justify-content-between">
                                    <label htmlFor="">Township</label>
                                        <select name="township" className="form-select form-select-sm" id="township" 
                                            onChange={(event)=>{return setPatient({...patient,township:event.target.value})}}
                                            required
                                        >
                                            <option value="" selected>Please Choose breed</option>
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