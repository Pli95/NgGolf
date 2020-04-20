import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { Player } from 'src/app/interfaces/player';
import { FireBaseService } from 'src/app/services/fire-base.service';

@Component({
  selector: 'app-character-dialog',
  templateUrl: './character-dialog.component.html',
  styleUrls: ['./character-dialog.component.scss']
})
export class CharacterDialogComponent implements OnInit {
  name: string;

  constructor(
    public dialogRef: MatDialogRef<CharacterDialogComponent>,
    private dbService: FireBaseService,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addPlayer(event, name) {
    if(event.keyCode === 13) {
      this.dialogRef.close(name)
      console.log(name)
      // this.dbService.saveGame(name)
      // this.dialogRef.close()
    }
  }

}
