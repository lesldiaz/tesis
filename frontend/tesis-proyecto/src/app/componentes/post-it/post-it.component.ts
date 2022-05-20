import { Component, OnInit } from '@angular/core';


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
    element.classList.add("post-it");
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
    console.log(noteObject.id);
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
    console.log(id,newContent);
  }
  deleteNote(id:number,element:object){
    this.notes = JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");;
    const target = this.notes.filter((note: { id: number; }) => note.id != id);
    this.saveNotes(this.notes);
    this.notesContainer.removeChild(element);

    console.log("delete note ...");
    console.log(id);
  }
}
