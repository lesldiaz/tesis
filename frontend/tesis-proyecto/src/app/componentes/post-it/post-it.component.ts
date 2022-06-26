import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-post-it',
  templateUrl: './post-it.component.html',
  styleUrls: ['./post-it.component.css']
})
export class PostItComponent implements OnInit {
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

  constructor() {
    }

  ngOnInit(): void {

  }
  porCadaUno(){
    this.notesContainer = document.getElementById("app");
    this.addNoteButton = this.notesContainer.querySelector(".add-note");
    this.arrayNotes = JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
    this.arrayNotes.forEach( (note: { id: number; content: string; }) => {
      const noteElement = this.createNoteElement( note.id, note.content);
      this.notesContainer.insertBefore(noteElement, this.addNoteButton);
    });
  }
  saveNotes(notes:object){
   // saveNotes(){
    localStorage.setItem("stickynotes-notes",JSON.stringify(notes));


  }
  createNoteElement(id: number, content: string){
    const element = document.createElement("textarea");
    element.classList.add('post-it');
    element.value = content;
    element.placeholder ="Empty";
    element.addEventListener("change",()=> {
      this.updateNote(id,element.value);
    });
    element.addEventListener("dblclick",()=>{
      const doDelete = confirm("Are you sure you wish to delete this sticky note?");
      if(doDelete){
        this.deleteNote(id,element);
      }
    });
    return element;
  }

  addNote(){
    this.notesContainer = document.getElementById("app");
    this.addNoteButton = this.notesContainer.querySelector(".add-note");
    this.existingNotes =JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
    const noteObject = {
      id: Math.floor(Math.random()*100000),
      content:""
    };
    //console.log(noteObject.id);
    const noteElement = this.createNoteElement(noteObject.id, noteObject.content);
    this.notesContainer.insertBefore(noteElement, this.addNoteButton);
    this.existingNotes.push(noteObject);

    this.saveNotes(this.existingNotes);
  }
  updateNote(id:number, newContent:string){
    this.notes = JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
    const targetNote = this.notes.filter((note: { id: number; }) => note.id == id)[0];
    targetNote.content = newContent;
    this.saveNotes(this.notes);
    console.log("updating note ...");
    //console.log(id,newContent);
    const index = this.posit.findIndex((element) => element.id === id);
    if(index != -1){
      this.posit[index]={"id":id,"contenido":newContent};
    }else{
      this.posit.push({"id":id,"contenido":newContent});
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
    console.log("delete note ...");
    //console.log(id);
  }
  ngDoCheck() {
    if(this.bnd == true){
      //this.addNewItem(this.posit);
      this.limpiar();
    }
    if(this.blockRec.length!=0){
      console.log(this.cont);
      if(this.cont==0){
        for(var i=0;i<this.blockRec.length;i++){
          const noteElement = this.createNoteElement(this.blockRec[i].id,this.blockRec[i].contenido);
          this.notesContainer.insertBefore(noteElement, this.addNoteButton);
          this.posit.push(this.blockRec[i]);
          //console.log("id:"+this.blockRec[i].id+"contenido:"+this.blockRec[i].contenido);
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
