import { Injectable } from '@angular/core';
import {
  addDoc,
  deleteDoc,
  updateDoc,
  collectionData,
  doc,
  Firestore,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private fs: Firestore) {}

  //Add new Note
  addNote(note: Note) {
    note.id = doc(collection(this.fs, 'id')).id;
    return addDoc(collection(this.fs, 'Notes'), note);
  }

  //get All notes
  getNotes(): Observable<Note[]> {
    let notesRef = collection(this.fs, 'Notes');
    return collectionData(notesRef, { idField: 'id' }) as Observable<Note[]>;
  }

  //Delete notes
  deleteNote(note: Note) {
    let docRef = doc(this.fs, 'Notes', note.id);
    return deleteDoc(docRef);
  }

  //Update notes
  updateNote(note: Note, notes: any) {
    let docRef = doc(this.fs, `Notes`, note.id);
    return updateDoc(docRef, notes);
  }
}
