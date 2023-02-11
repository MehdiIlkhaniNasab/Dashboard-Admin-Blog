import { _querySelectorClass, _querySelectorId, _querySelectorAll } from "./getElements.js";

function validateForm(classForm){
    const formValid = _querySelectorClass(`${classForm}:invalid`)
    if(formValid && formValid.length > 0){
        return false
    }else{
        return true
    }

}

function resetForm(classForm){
    const form = _querySelectorClass(classForm)
    form.reset()
}


export  {validateForm, resetForm}