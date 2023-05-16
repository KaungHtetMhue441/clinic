import { getImage, getKey } from "../utils/helpers";
import { PatientsContext } from "../contexts/patientsContext";
import { AddForm } from "../components/patients/addForm";
import { UpdateForm } from "../components/patients/updateForm";
import { useState,useEffect } from "react";
import { getData,setData } from "../utils/helpers";
import { UpdtePatientsContext } from "../contexts/updatePatientContext";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export const Patient = ()=>{
        // let patientss = [
    //     {id:"A-0004",petName:"akai",status:"active",pawrent:"haha",breed:"hshsh",gender:"male",date:"2014-03-03",ph_no:"09795889472",address:"mayangon"},
    //     {id:"A-0004",petName:"akai",status:"active",pawrent:"haha",breed:"hshsh",gender:"male",date:"2014-03-03",ph_no:"09795889472",address:"mayangon"},
    //     {id:"A-0004",petName:"akai",status:"active",pawrent:"haha",breed:"hshsh",gender:"male",date:"2014-03-03",ph_no:"09795889472",address:"mayangon"},
    //     {id:"A-0004",petName:"akai",status:"active",pawrent:"haha",breed:"hshsh",gender:"male",date:"2014-03-03",ph_no:"09795889472",address:"mayangon"},
    //     {id:"A-0004",petName:"akai",status:"active",pawrent:"haha",breed:"hshsh",gender:"male",date:"2014-03-03",ph_no:"09795889472",address:"mayangon"},
    //     {id:"A-0004",petName:"akai",status:"active",pawrent:"haha",breed:"hshsh",gender:"male",date:"2014-03-03",ph_no:"09795889472",address:"mayangon"},
    // ];
    // localStorage.setItem('patients',JSON.stringify(patientss));

    let patientss = getData('patients');
    let [patients,setPatients]  = useState(patientss);
    let [patient,setPatient] = useState({});

    const [status,setStatus]= useState("");
    const [breed,setBreed] = useState("");

    const statusList = ['active','inactive',].map((item)=>{
        return(
            <option value={item} key={getKey()}>{item}</option>
        )
    });
    const breedList = ['hello','haha',].map((item)=>{
        return(
            <option value={item} key={getKey()}>{item}</option>
        )
    });

    const tbody = patients.map(patient=>{
        return(
            <tr key={getKey()}>
                <td><input type="checkbox" /></td>
                <td>{patient.id}</td>
                <td>{patient.petName}</td>
                <td>{patient.status}</td>
                <td>{patient.pawrent}</td>
                <td>{patient.breed}</td>
                <td>{patient.gender}</td>
                <td>{patient.date}</td>
                <td>{patient.ph_no}</td>
                <td>{patient.address}</td>
                <td>
                <div className="btn-group dropstart">
                    <img className="cursor-pointer dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" src={getImage('more.png')}/>
                    <ul className="dropdown-menu">
                        <li className="text-info px-3 cursor-pointer "  data-bs-toggle="modal" data-bs-target="#updatePatient"
                            onClick={()=>setPatient(patient)} 
                        >
                        <img src={getImage('edit.png')} />
                        &nbsp;&nbsp;&nbsp;
                            Edit
                        </li>
                        <li className="text-danger px-3 cursor-pointer"
                            onClick={()=>deletePatient(patient)}
                        >
                        <img src={getImage('delete.png')}/>
                        &nbsp;&nbsp;&nbsp;
                            Delete
                        </li>
                    </ul>
                </div>
                   </td>
            </tr>
        )

    })

        
    const  deletePatient = (deletePatient)=>{
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {           
                let newPatients = patients.filter((item)=>{
                    return item.id !== deletePatient.id
                });
                setData(
                    'patients',newPatients
                );
                setPatients(newPatients);
                }
              },
              {
                label: 'No',
                onClick: () => {}
              }
            ]
          });

    }

    const search = (value)=>{
        let newPatients  = getData('patients');

        if(status || breed){
            newPatients = newPatients.filter((item)=>{
                return (status&&status==item.status)||(breed&&item.breed==breed);
            })
        }
        if(value){  
            newPatients = newPatients.filter((item)=>{
                item = Object.values(item);
                for(let i=0; i<item.length;i++){
                    if(item[i]&&item[i].includes(value)){
                        return true
                    }
                }
                return false;
            })
            setPatients(newPatients);
            return;
        }
    setPatients(newPatients);
    }

    useEffect(()=>{
        if(breed||status){
            console.log(status);
            let newPatients = getData('patients');
            let newPatient = newPatients.filter((item)=>
            {
                if(status&&breed)
                {
                    return item.status==status&&item.breed==breed;
                }
                return item.status==status||item.breed==breed;
            })
            setPatients(newPatient)
        }

    },[status,breed]);

    return(
        <>
            <div className="row justify-content-between">
             <h4 className="text-primary font-22 pt-4">Patient List</h4>
                <div className="col-3">
                    <div className="col-12">
                        <div className="search-input-wrapper px-2">
                            <input className="outline-none" type="text" placeholder="search" 
                                onChange={(event)=>search(event.target.value)}
                            />
                            <button className="float-end search-btn">
                                <img src={getImage('search.png')}  alt=""/>
                            </button>
                        </div>
                    </div>
                    <div className="col-12 pt-3">
                        <div className="row">
                            <div className="col-6">
                                <select className="form-select form-select-sm select" name="status" id="status"
                                onChange={(event)=>{
                                    console.log(event.target.value)
                                setStatus(event.target.value);
                                //     if(event.target.value!=""){
                                //         let newPatient = patients.filter((item)=>
                                //         {
                                //             if(breed)
                                //             {
                                //                 return item.status==event.target.value&&item.breed==breed;
                                //             }
                                //             return item.status==event.target.value;
                                //         })
                                //         setPatients(newPatient)
                                //         return;
                                //     }
                                // setPatients(getData('patients'));
                                  
                                }}>
                                    <option value="">Status All</option>
                                    {statusList}
                                </select>
                            </div>
                            <div className="col-6">
                            <select className="form-select form-select-sm select"  name="breed" id="breed"
                             onChange={(event)=>{
                                setBreed(event.target.value);
                                // console.log(event.target.value);
                                // console.log('jello')

                                // if(event.target.value){
                                //     // console.log('jello')
                                //     let newPatient = patients.filter((item)=>
                                //     {
                                //         if(status)
                                //         {
                                //             return item.status==status&&item.breed==event.target.value;
                                //         }
                                //         return item.breed==event.target.value;
                                //     })
                                // setPatients(newPatient)
                                // return;
                                // }
                                // setPatients(getData('patients'));
                            }}
                            >
                                    <option value="">Breed All</option>
                                    {breedList}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-2 px-4">
                    <div className="row">
                        <button className="btn btn-sm bg-primary rounded-10 text-white" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            <img src={getImage('add.png')} alt=""  />
                            <div className="d-inline-block px-2"></div>
                            <span className="ml-2">Add new patient</span>
                        </button>
                    </div>
                    <div className="row pt-3">
                        Rows per pages &nbsp;&nbsp; :&nbsp;&nbsp;&nbsp;&nbsp;
                        <select className="form-select form-select-sm select d-inline-block w-30">
                            <option value="10">10</option>
                        </select>
                    </div>
                </div>
            </div>

{/* table  */}
            <div className="row p-2">
                <table className="table table-hover">
                    <thead className="text-primary">
                        <tr>
                        <th></th>
                        <th>ID</th>
                        <th>PetName</th>
                        <th>Status</th>
                        <th>Pawrent</th>
                        <th>Breed</th>
                        <th>Gender</th>
                        <th>Date of Birth</th>
                        <th>Contact Phone No .</th>
                        <th>Adress</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tbody}
                    </tbody>
                </table>
            </div>

{/* <!-- Modal --> */}
            <PatientsContext.Provider value={{patients,setPatients}}>
                <AddForm/>
            </PatientsContext.Provider>
            <PatientsContext.Provider value={{patients,setPatients}}>
                <UpdtePatientsContext.Provider value={{patient,setPatient}}>
                    <UpdateForm/>
                </UpdtePatientsContext.Provider>
            </PatientsContext.Provider>
        </>
    )

}