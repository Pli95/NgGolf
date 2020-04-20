import { Component, OnInit, Inject } from '@angular/core';
import { CharacterDialogComponent } from '../character-dialog/character-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { Observable } from 'rxjs';
import { Games } from 'src/app/interfaces/player';


@Component({
  selector: 'app-finish-dialog',
  templateUrl: './finish-dialog.component.html',
  styleUrls: ['./finish-dialog.component.scss']
})
export class FinishDialogComponent implements OnInit {

  game$

  constructor(
    public dialogRef: MatDialogRef<CharacterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    console.log(this.data.players)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  


}
