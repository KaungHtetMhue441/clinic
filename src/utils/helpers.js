export const getImage = (name)=>{
    return require('../../public/images/'+name);
}

export const getKey = ()=>{
    return Math.floor(Math.random() *1000)+1;
}

export const getData = (name)=>{
    return JSON.parse(localStorage.getItem(name));
}

export const setData = (name,data)=>{
    localStorage.setItem(name,JSON.stringify(data));

}

export const getDateString = (date)=>{
    let d = date.getDate();
    let m = date.getMonth()+1;
    let y = date.getFullYear();

    if(m<10){
        m = "0"+m;
    }
    if(d<10){
        d = "0"+d;
    }

    return y+"-"+m+"-"+d;
}

export const getStringToDate = (date)=>{
    let arr = date.split("-");
    if(Number(arr[0])<31){
        date = arr[2]+"-"+arr[1]+"-"+arr[0];
    }
    return new Date(date)
}

export const formValidateion = (patient,setFormError)=>{
    const errors = [];
    if(typeof patient.petName!=="string"){
        errors.push("Pet Name must be string ");
    }
    if(typeof patient.pawrent!=="string"){
        errors.push("Pawrent must be string ");
    }
    if(typeof patient.status!=="string"){
        errors.push("Status must be string ");
    }

    if(typeof patient.breed!=="string"){
        errors.push("Breed must be string ");
    }
    if(!patient.gender){
        errors.push("Male or female  must be choose")
    }
    if(!patient.ph_no){
        errors.push("Phone Number field is required");
    }
    if(typeof patient.address!=="string"){
        errors.push("address filed must be string");
    }

    if(errors.length > 0){
        setFormError(errors.map((error)=>{
            return <li className="text-danger">{error}</li>
        }))
        return false;
    }
    setFormError([]);
    return true;
    
}