import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj : Task = new Task();
  taskArr : Task[] = [];
  addTaskValue : string ='';  
  editTasklValue : string = '';

  constructor(private crudService : CrudService) { }

  ngOnInit(): void {
    this.editTasklValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }


  getAllTask() {
      this.crudService.getAllTask().subscribe(res =>{
          this.taskArr = res;
      }, err => {
        alert("Unable to get list of taks");
      });
  }

  addTask(){
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(res =>{
        this.ngOnInit();
        this.addTaskValue = '';
    } , err =>{
      alert(err);
    });
  }


  editTask(){
    this.taskObj.task_name = this.editTasklValue;
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err =>{
      alert("Failed To Update Tasks");
    });
  }

  deleteTask(etask :Task){
    this.crudService.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
    }, err =>{
      alert("Failed To Delete Tasks");
    });
  }

  call(etask : Task){
    this.taskObj = etask;
    this.editTasklValue = etask.task_name;
  }



}
