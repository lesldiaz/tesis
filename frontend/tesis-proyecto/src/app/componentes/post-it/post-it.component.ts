import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-it',
  templateUrl: './post-it.component.html',
  styleUrls: ['./post-it.component.css']
})
export class PostItComponent implements OnInit {
  [x: string]: any;

  constructor() {
    }

  ngOnInit(): void {

  }
  //getNote().forEach(note=>{
  // const noteElement = createNoteElement( note.id, note.content);
  // notesContainer.insertBefore(noteElemnt, addNoteButton);
  //
  // });

  getNotes(){
    JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");

  }
  //saveNotes(notes){
    saveNotes(){
   // localStorage.setItem("stickynotes-notes",JSON.stringify(notes));

  }
  //createNoteElement(id,content){
    createNoteElement(){
    const notesContainer = document.getElementById("app");
    const addNoteButton = this['notesContainer'].querySelector(".add-note");
    const element = document.createElement("textarea");
    element.classList.add("note");
    //element.value = content;
    element.placeholder ="Empty sticky note";
    element.addEventListener("change",()=> {
      //this.updateNote(id,element.value);
    });
    element.addEventListener("dblclick",()=>{
      const doDelete = confirm("Are you sure you wish to delete this sticky note?");
      if(doDelete){
       // this.deleteNote(id,element);
      }
    });
    return element;
  }
  addNote(){

  }
  //updateNote(id, newContent){
    updateNote(){
    console.log("updating note ...");
    //console.log(id,newContent);
  }
  //deleteNote(id,element){
    deleteNote(){
    console.log("delete note ...");
    //console.log(id)26:34;
  }
}
