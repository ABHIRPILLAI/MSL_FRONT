import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators  } from "@angular/forms";
import { Itask } from 'src/model/task';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoForm !: FormGroup;
  task : Itask[]=[];
  done : Itask[]=[];
  updateId!:any;
  isEditEnabled : boolean = false;
  emailForm !: FormGroup;


  constructor( private fb: FormBuilder,private ds:DataserviceService) {
    
  
   }

  ngOnInit(): void {
    this.todoForm=this.fb.group({
      item : ['',Validators.required]
    })
    this.emailForm=this.fb.group({
      email : ['',Validators.required],
      pswd : ['',Validators.required]
    })
    
  }

  addTask()
  {

var email=this.emailForm.value.email
var pswd=this.emailForm.value.pswd
var todo=this.todoForm.value.item
  console.log(email+pswd+todo);
  
this.ds.todo(email,pswd,todo).
subscribe((result:any)=>{
  alert(result.message)
  this.task.push({
    description:this.todoForm.value.item,
    done:false
  });
  this.todoForm.reset();
},(result)=>{
  alert(result.error.message)
})
  }
  delete(i:number)
  {
  
    this.task.splice(i,1)
  }
  deletedone(i:number)
  {
    this.done.splice(i,1)
  }


  onEdit(item:Itask,i:number)
  {
    this.todoForm.controls['item'].setValue(item.description);
    this.updateId=i;
    this.isEditEnabled=true;
  }

  updateTask()
  {
    this.task[this.updateId].description  = this.todoForm.value.item;
    this.task[this.updateId].done = false;
    this.todoForm.reset();
    this.updateId=undefined;
    this.isEditEnabled=false;

  }

  drop(event: CdkDragDrop<Itask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
}
}