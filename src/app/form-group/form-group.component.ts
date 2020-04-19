import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormArray, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css']
})
export class FormGroupComponent implements OnInit {

  constructor() { }

  usrNameChanges: string;
  usrNameStatus: string;
  formSubmitted = false;
  courses = [
    {name: 'SPCC', shortName: 'dev'},
    {name: 'AIT', shortName: 'man'},
    {name: 'CSTC', shortName: 'dir'},
    {name: 'BDA', shortName: 'bda'}
  ];
  userForm = new FormGroup({
	name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
	age: new FormControl('', Validators.required),
	address: new FormGroup({
	    houseNumber: new FormControl('', Validators.required),
	    city: new FormControl('Noida'),
    	    country: new FormControl({value: 'India', disabled: true})
        }),
	gender: new FormControl('male'),
	course: new FormControl(this.courses[0].shortName),
	hobbies: new FormArray([
	   new FormControl()
        ])
  });
  get userName(): any {
    return this.userForm.get('name');
  }

  ngOnInit(): void {
    this.userForm.get('name').valueChanges.subscribe(data => this.usrNameChanges = data);
	this.userForm.get('name').statusChanges.subscribe(data => this.usrNameStatus = data);
  }

  onFormSubmit(): void {
    this.formSubmitted = true;
    if(this.userForm.valid) {
	this.logData();
	this.resetForm();
    } else {
	this.formSubmitted = false;
    }
  }
  resetForm() { 
    this.userForm.reset();
  }  
  setDefaultValue() { 
    this.userForm.patchValue({name: 'Mahesh', gender: 'male', profile: this.courses[2].shortName,
                            	address: {city:'Noida', country: 'India'} });
  }
  setAge() { 
    this.userForm.get('age').setValue('20');
  }  
  setCountry() { 
    this.userForm.get('address').get('country').setValue('India');
  }    
  get hobbies(): FormArray { 
    return this.userForm.get('hobbies') as FormArray; 
  }
  addCourseTiming() { 
    this.hobbies.push(new FormControl()); 
  }
  deleteUserField(index: number) {
    this.hobbies.removeAt(index);
  }
  logData() {
	 console.log('Name:' + this.userForm.get('name').value);
	 console.log('Age:' + this.userForm.get('age').value);	 
	 console.log('Gender:'+ this.userForm.get('gender').value);	 
	 console.log('Profile:'+this.userForm.get('course').value);	 

	 //print address
	 let addressFG = this.userForm.get('address');
	 console.log('House Number: ' + addressFG.get('houseNumber').value);	 
	 console.log('City:' + addressFG.get('city').value);
	 console.log('Country:' + addressFG.get('country').value);
	
	//Iterate FormArray
	 for(let i = 0; i < this.hobbies.length; i++) {
	   console.log(this.hobbies.at(i).value);
	 }
         // Gives complete address
	 console.log(addressFG.value); 
         //Checks address validation	 
	 console.log(addressFG.valid); 
         // Gives complete FormArray data	 
	 console.log(this.hobbies.value); 
         //Checks FormArray validation	 	
	 console.log(this.hobbies.valid); 	 
         // Gives Complete form data	 	 
	 console.log(this.userForm.value); 
         // checks Complete form validation	 	 
	 console.log(this.userForm.valid);	 
  }
}

