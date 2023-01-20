import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { PersonModel } from './personModel';
import { faBarsStaggered, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  faEditIcon = faBarsStaggered;
  faDeleteIcon = faCircleXmark;
  formValue !: FormGroup;
  allPeople !: any;
  addBtn    !: boolean;
  updateBtn !: boolean;

  // object to pass.. post Data in api
  personModelObject:PersonModel = new PersonModel();

  constructor(private formbuilder:FormBuilder,
              private api: ApiService
    ){}
  
  ngOnInit():void {

    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      age: [''],
      gender: ['']
    })

    this.getAll();
  }


  getAll () {
    this.api.getPeople()
    .subscribe(res => {
      this.allPeople = res.msg;
    })
  }

  // reset form and show add btn only..
  addpeopleClick(){
    this.updateBtn = false;
    this.addBtn = true;
    this.formValue.reset();
  }
  
  delete(id: number){
    this.api.deletePerson(id)
    .subscribe( res => {
      alert("person deleted.");
      this.getAll();
    },
    err => {
      alert("error");
    })
  }

  editBtnClick(person: any){

    this.updateBtn = true;
    this.addBtn = false;

    this.personModelObject.id  = person._id;

    this.formValue.setValue({
      firstName:  person.firstName,
      lastName:   person.lastName,
      age:        person.age,
      gender:     person.gender
    })

  }

  update(){
    
    this.personModelObject.firstName  = this.formValue.value.firstName;
    this.personModelObject.lastName   = this.formValue.value.lastName;
    this.personModelObject.age        = this.formValue.value.age;
    this.personModelObject.gender     = this.formValue.value.gender;

    if(this.personModelObject.age < 0){
      alert("Age can not be empty..");
    }
    else if(!this.personModelObject.gender){
      alert("Gender can not be null");
    }
    else {
      // update the person
      this.api.updatePerson(this.personModelObject, this.personModelObject.id)
      .subscribe( res => {

        // reset the form
        this.formValue.reset();
        
        // close modal after click
        document.getElementById("closeModal")?.click(); 
        this.getAll();
      },
      err => {
        alert(err.error.message.message);
      })
    }

    

  }

  // add the person POST request...
  add(){
    this.personModelObject.firstName  = this.formValue.value.firstName;
    this.personModelObject.lastName   = this.formValue.value.lastName;
    this.personModelObject.age        = this.formValue.value.age;
    this.personModelObject.gender     = this.formValue.value.gender;

    
    if(this.personModelObject.age < 0) {
      alert("Invalid Age.");
    }
    else if(!this.personModelObject.gender){
      alert("Gender can not be null");
    }
    else {
      this.api.addPerson(this.personModelObject)
      .subscribe(res => {
        // reset the form
        this.formValue.reset();
        
        // close modal after click
        document.getElementById("closeModal")?.click(); 
        this.getAll();
      }, 
      err => {
        alert(err.error.error.message);
      })
    }

  }

}




