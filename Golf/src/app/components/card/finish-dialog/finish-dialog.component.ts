import { Component, OnInit, Inject } from '@angular/core';
import { CharacterDialogComponent } from '../character-dialog/character-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-finish-dialog',
  templateUrl: './finish-dialog.component.html',
  styleUrls: ['./finish-dialog.component.scss']
})
export class FinishDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CharacterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
