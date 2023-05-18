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

    return d+"-"+m+"-"+y;
}

export const getStringToDate = (date)=>{
    return new Date(date.replaceAll("-", "/"))
}