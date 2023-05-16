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
    return localStorage.setItem(name,JSON.stringify(data));
}