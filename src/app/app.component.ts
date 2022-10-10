import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { resolve } from 'dns';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null,[Validators.required,this.forbiddenNames.bind(this)]),
        'email': new FormControl(null,[Validators.required,Validators.email],[this.forbiddenEmails]),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    })
  }
  onSubmit(){
    console.log(this.signupForm);
  }
  onAddHobby(){
    const control = new FormControl(null,Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control)
  }
  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }
  forbiddenNames(control: FormControl):{[s:string]:boolean}{
    if (this.forbiddenUsernames.indexOf(control.value) !== -1){
      return {'nameIsForbidden':true}; //return true if INVALID
    }
    return  null;  // Return null on valid result
  }
  async forbiddenEmails(control: FormControl){
    return new Promise((res,rej)=>{
      setTimeout(()=>{
        if (control.value === 'test@test.com'){
          res({'emailIsForbidden':true})
        }else {
          res(null);
        }
      },1500)
    })
  }
}
