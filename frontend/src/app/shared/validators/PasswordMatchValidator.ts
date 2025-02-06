
import {AbstractControl} from "@angular/forms"

export const PasswordMatchValidator=(passwordName:string,ConfirmPasswordName:string)=>{
    const validator=(form:AbstractControl)=>{
        const password=form.get(passwordName)
        const Confirmpassword=form.get(ConfirmPasswordName)
        if(!password || !Confirmpassword) return;
        if(password.value!==Confirmpassword.value){
            Confirmpassword.setErrors({notMatch:true})
        }else{
            const errors=Confirmpassword.errors
            if(!errors) return;
            delete errors["notMatch"]
            Confirmpassword.setErrors(errors)
        }

    }
    return validator;
}