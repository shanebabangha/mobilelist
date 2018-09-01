import { Component } from '@angular/core';
import { NavController,AlertController,reorderArray,ToastController } from 'ionic-angular';
import {ArchivedTodosPage} from "../archived-todos/archived-todos";
import { TodoService } from '../../providers/todo-service/todo-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	public todos= [];
	public reorderIsEnabled= false;
	public archivedTodosPage = ArchivedTodosPage;

  constructor(private toastController: ToastController,private todoService: TodoService,public navCtrl: NavController,private alertController:AlertController) {
  		this.todos= this.todoService.getTodos();
  }
  archiveTodo(todoIndex){
  this.todoService.archivedTodo(todoIndex);
  }

  goToArchivePage(){
  		this.navCtrl.push(ArchivedTodosPage);
  }

toggleReorder(){
	this.reorderIsEnabled= !this.reorderIsEnabled;
}
itemReordered($event){
	reorderArray(this.todos, $event);
}

  
  editTodo(todoIndex){
  let editTodoAlert = this.alertController.create({
  title:"Edit a To Do List",
  message:"Edit your To Do List",
  inputs:[
  	{
  type:"text",
  name:"editTodoInput",
  value:this.todos[todoIndex]
  	}],
  buttons:[
  {
  text:"Cancel"
  },

  	{
  text:"Edit To List",
  handler:(inputData)=>{
  	let todoText;
  	todoText= inputData.editTodoInput;
  	this.todoService.editTodo(todoText, todoIndex);
  	editTodoAlert.onDidDismiss(()=>{
  	let editTodoToast= this.toastController.create({
	message:"List is edited",
	duration: 2000  	
  });
	editTodoToast.present();
  	});

  		}

  	}]

  });
  editTodoAlert.present()
  }





  
  openTodoAlert(){
  let addTodoAlert = this.alertController.create({
  title:"Add a To Do List",
  message:"Enter your To Do List",
  inputs:[
  	{
  type:"text",
  name:"addTodoInput"
  	}],
  buttons:[
  {
  text:"Cancel"
  },

  	{
  text:"Add To List",
  handler:(inputData)=>{
  	let todoText;
  	todoText= inputData.addTodoInput;
  	this.todoService.addTodo(todoText);
  	addTodoAlert.onDidDismiss(()=>{
  	let addTodoToast= this.toastController.create({
	message:"List is added",
	duration: 2000  	
  });
	addTodoToast.present();
  	})

  		}

  	}]

  });
  addTodoAlert.present()
  }

}
