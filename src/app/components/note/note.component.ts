import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  noteForm!: FormGroup;
  editForm!: FormGroup;
  note: any;
  notes: Note[] = [];
  noteObj: Note = {
    id: '',
    title: '',
    desc: '',
  };

  constructor(
    private fb: FormBuilder,
    private noteService: NoteService,
    private spinner: NgxSpinnerService
  ) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.editForm = this.fb.group({
      editTitle: ['', Validators.required],
      editDescription: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.spinner.show();
    this.getAllNotes();
  }

  getNote(note: Note) {
    this.note = note;
  }

  addNote() {
    const { value } = this.noteForm;
    (this.noteObj.id = ''), (this.noteObj.title = value.title);
    this.noteObj.desc = value.description;

    this.noteService.addNote(this.noteObj).then((note) => {
      if (note) {
        this.noteForm.reset();
      }
    });
  }

  getAllNotes() {
    this.noteService.getNotes().subscribe((res: Note[]) => {
      this.notes = res;
      this.spinner.hide();
    });
  }

  deleteNote(note: Note) {
    // let decision = confirm(`Are sure want to delete this note?`);
    // if (decision) {
    this.noteService.deleteNote(note);
    // }
  }

  updateNote(note: Note) {
    const { value } = this.editForm;
    this.noteObj.id = note.id;
    this.noteObj.title = value.editTitle;
    this.noteObj.desc = value.editDescription;

    if (this.noteObj.title && this.noteObj.desc) {
      this.noteService.updateNote(note, this.noteObj).then(() => {
        this.editForm.reset();
      });
    }
  }
}
