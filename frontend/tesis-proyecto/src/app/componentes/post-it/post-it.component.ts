import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, DoCheck } from '@angular/core';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-post-it',
  templateUrl: './post-it.component.html',
  styleUrls: ['./post-it.component.css']
})
export class PostItComponent implements OnInit, DoCheck {
  notesContainer: any;
  addNoteButton:any;
  existingNotes: any;
  arrayNotes:any;
  notes: any;
  posit: any[]=[];
  cont:number=0;

  @Output()devuelveDatos:EventEmitter<any> = new EventEmitter();

  @Input()
  bnd:boolean=false;

  @Input()
  blockRec:any;

  constructor(
    private readonly confirmationService: ConfirmationService
  ) {
    }

  ngOnInit(): void {
    this.notesContainer = document.getElementById("app");
    this.addNoteButton = this.notesContainer.querySelector(".add-note");
  }
  porCadaUno(){
    this.notesContainer = document.getElementById("app");
    this.addNoteButton = this.notesContainer.querySelector(".add-note");
    this.arrayNotes = JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
    this.arrayNotes.forEach( (note: { id: number; descripcion: string; }) => {
      const noteElement = this.createNoteElement( note.id, note.descripcion);
      this.notesContainer.insertBefore(noteElement, this.addNoteButton);
    });
  }
  saveNotes(notes:object){
   // saveNotes(){
    localStorage.setItem("stickynotes-notes",JSON.stringify(notes));


  }
  createNoteElement(id: number, descripcion: string){
    const element = document.createElement("textarea");
    element.classList.add('post-it');
    element.value = descripcion;
    element.placeholder ="Empty";
    element.addEventListener("change",()=> {
      this.updateNote(id,element.value);
    });
    element.addEventListener("dblclick",()=>{
      this.confirmationService.confirm({
        message: '¿Esta seguro que desea eliminar este propósito?',
        header: 'Eliminar',
        acceptLabel: 'Eliminar',
        rejectLabel: 'Cancelar',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deleteNote(id,element);
        }
      });
    });
    return element;
  }

  addNote(){
    this.notesContainer = document.getElementById("app");
    this.addNoteButton = this.notesContainer.querySelector(".add-note");
    this.existingNotes =JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
    const noteObject = {
      id: Math.floor(Math.random()*100000),
      descripcion:""
    };
    const noteElement = this.createNoteElement(noteObject.id, noteObject.descripcion);
    this.notesContainer.insertBefore(noteElement, this.addNoteButton);
    this.existingNotes.push(noteObject);

    this.saveNotes(this.existingNotes);
  }
  updateNote(id:number, newContent:string){
    this.notes = JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
    const targetNote = this.notes.filter((note: { id: number; }) => note.id == id)[0];
    targetNote.descripcion = newContent;
    this.saveNotes(this.notes);
    const index = this.posit.findIndex((element) => element.id === id);
    if(index != -1){
      this.posit[index]={"id":id,"descripcion":newContent};
    }else{
      this.posit.push({"id":id,"descripcion":newContent});
    }
    this.addNewItem(this.posit);
  }
  deleteNote(id:number,element:object){
    this.notes = JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");;
    const target = this.notes.filter((note: { id: number; }) => note.id != id);
    this.saveNotes(this.notes);
    this.notesContainer.removeChild(element);
    const index = this.posit.findIndex((element) => element.id === id);
    this.posit.splice(index,1);
    this.addNewItem(this.posit);
  }
  ngDoCheck() {
    if(this.bnd == true){
      //this.addNewItem(this.posit);
      this.limpiar();
    }
    if(this.blockRec.length!=0){
      if(this.cont==0){
        for(var i=0;i<this.blockRec.length;i++){
          const noteElement = this.createNoteElement(this.blockRec[i].id,this.blockRec[i].descripcion);
          this.notesContainer.insertBefore(noteElement, this.addNoteButton);
          this.posit.push(this.blockRec[i]);
        }
        this.cont++;
      }
    }
  }
  addNewItem(obj:object) {
    this.devuelveDatos.emit(obj);
  }
  limpiar(){
    this.notesContainer = document.getElementById("app");
    const element = document.getElementsByClassName('post-it');
    while(element[0]){
      this.notesContainer.removeChild(element[0]);
    }
    this.posit=[];
    this.bnd=false;
    this.cont=0;
    localStorage.setItem("stickynotes-notes", "[]");
  }

}
