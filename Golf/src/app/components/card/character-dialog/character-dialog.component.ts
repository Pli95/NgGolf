import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-character-dialog',
  templateUrl: './character-dialog.component.html',
  styleUrls: ['./character-dialog.component.scss']
})
export class CharacterDialogComponent implements OnInit {
  name: string;

  constructor(
    public dialogRef: MatDialogRef<CharacterDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addPlayer(event, name) {
    if(event.keyCode === 13) {
      this.dialogRef.close(name)
      // this.dbService.saveGame(name)
      // this.dialogRef.close()
    }
  }

}
