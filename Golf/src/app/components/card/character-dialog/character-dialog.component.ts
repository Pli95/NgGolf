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

  constructor(
    public dialogRef: MatDialogRef<CharacterDialogComponent>,
    private dbService: FireBaseService,
    @Inject(MAT_DIALOG_DATA) public data: Player
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addPlayer(event) {
    if(event.keyCode === 13) {
      this.dialogRef.close(this.data.name)
      console.log(this.data.name)
      // this.dbService.saveGame(name)
      // this.dialogRef.close()
    }
  }

}
