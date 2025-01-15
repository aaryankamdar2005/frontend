import { createContext, useState } from "react";


export const  Formcontext = createContext();

export const FormProvider= (props)=>{

const[formData,setFormData]=useState({
    name:'',
    contact:'',
    school:'',
    degree:'',
    location:'',
    date:'',
    title:'',
    company:'',
    location:'',
    date:'',
    detail:'',
    language:'',
    framework:'',
    tools:'',
    clocation:'',
    cdate:'',
});

const updateFormData = (name,value)=>{
setFormData((prev)=>({
    ...prev,
    [name]:value,

}))
}

return (
    <Formcontext.Provider value={{formData,updateFormData}}>
        {props.children}
    </Formcontext.Provider>
)

}