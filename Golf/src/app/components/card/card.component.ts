import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { GolfCoursesService } from 'src/app/services/golf-courses.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CharacterDialogComponent } from './character-dialog/character-dialog.component';
import { Observable } from 'rxjs';
import { Games } from 'src/app/interfaces/player';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { FinishDialogComponent } from './finish-dialog/finish-dialog.component';
import { NamingSchemePipe } from 'src/app/pipes/naming-scheme.pipe';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  num = 5;
  newName: string
  isNew = true;
  selectedTee: any;
  teeType: string;
  teeInfo: any[] = [];
  hover = false;
  half: number;
  yardNum = [];
  parNum = [];
  playerNum = [];
  outTotal: number;
  inTotal: number;
  total: number;
  yardIn: number;
  yardOut: number;
  yardTotal: number;
  data: Games;
  players = []
  sameName = false;
  dbId: string

  games$: Observable<Games[]>;
  game$: Observable<any>


  constructor(
    private route: ActivatedRoute,
    private courseService: GolfCoursesService,
    private dbService: FireBaseService,
    private location: Location,
    public dialog: MatDialog,
    private namingScheme: NamingSchemePipe
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        this.teeType = params.tee
        return this.courseService.getCourseById(params.id)
      }),
      tap(course => {
        this.selectedTee = course.holes
        course.holes.forEach(hole => {
          this.teeInfo.push(hole.teeBoxes.filter(tee => tee.teeType === this.teeType)[0])
        })

        this.teeInfo.forEach(hole => {
          this.yardNum.push(hole.yards)
          this.parNum.push(hole.par)
        })

        this.doMath(this.yardNum)
        this.yardOut = this.outTotal
        this.yardIn = this.inTotal
        this.yardTotal = this.total
        this.doMath(this.parNum)
        this.half = this.selectedTee.length / 2
      })
    ).subscribe();

  }

  openDialog() {
    const dialogRef = this.dialog.open(CharacterDialogComponent, {
      width: '300px',
      data: { players: this.players }
    })

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.checkSame(result)
        if (this.sameName) {
          result = this.namingScheme.transform(result, "different")
          this.checkSame(result)
          if (this.sameName) {
            result = this.namingScheme.transform(result, "another")
            this.checkSame(result)
            if (this.sameName) {
              result = this.namingScheme.transform(result, "again?")
              this.checkSame(result)
              if (this.sameName) {
                result = this.namingScheme.transform(result, `#${this.num}`)
                this.num++
              }
            }
          }
        }
        this.players.push({ name: result, in: 0, out: 0, total: 0 })
      }
    })
  }

  checkSame(name) {
    let checkSame = this.players.filter(player => player.name === name)
    if (checkSame.length !== 0) {
      this.sameName = true
    } else {
      this.sameName = false
    }
  }

  saveGame() {
    this.dbService.saveGame(this.teeType, this.players)
      .then(firebaseObj => {
        this.dbId = firebaseObj.id
      })
    this.isNew = false
  }

  updateGame() {
    this.dbService.updateGame(this.dbId, this.players)
  }



  deletePlayer(name) {
    let filtered = this.players.filter(player => player.name !== name)

    this.players = filtered

  }

  onBlur(event, name, inOrOut) {
    let score = Number(event.target.value)

    let currentPlayer = this.players.filter(player => player.name === name)
    if (!score) {
      score = 0
    }

    if (inOrOut === 'in') {
      currentPlayer[0].in += score

    }
    else {
      currentPlayer[0].out += score
    }

    currentPlayer[0].total = currentPlayer[0].in + currentPlayer[0].out

  }

  finishGame() {
    const dialogRef = this.dialog.open(FinishDialogComponent, {
      width: '300px',
      data: { players: this.players, par: this.total }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.isNew) {
        this.saveGame()
      }
      else {
        this.updateGame()
      }

      if(result === "alert") {
        this.goBack()
      }

    })
  }

  goBack() {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'confirm'){
        this.location.back()
      }
    })
    
  }

  doMath(nums: Array<number>) {
    this.outTotal = 0
    this.inTotal = 0
    let outHalf = nums.splice(0, nums.length / 2)
    outHalf.forEach(num => [
      this.outTotal += num
    ])
    nums.forEach(num => {
      this.inTotal += num
    })
    this.total = this.outTotal + this.inTotal
  }

}
