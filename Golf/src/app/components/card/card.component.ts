import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap, map } from 'rxjs/operators';
import { GolfCoursesService } from 'src/app/services/golf-courses.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CharacterDialogComponent } from './character-dialog/character-dialog.component';
import { Observable, of } from 'rxjs';
import { Games, Player } from 'src/app/interfaces/player';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { FinishDialogComponent } from './finish-dialog/finish-dialog.component';
import * as confetti from 'canvas-confetti'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  // num: number = Math.ceil(Math.random() * 1000);
  // num: number = 419
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
  player: Player = { name: '', in: 0, out: 0, total: 0 };

  games$: Observable<Games[]>;
  game$: Observable<any>


  constructor(
    private route: ActivatedRoute,
    private courseService: GolfCoursesService,
    private dbService: FireBaseService,
    private location: Location,
    public dialog: MatDialog,
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
      width: '300px'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.players.push({name: result, in: 0, out: 0, total: 0})
      }
    })
  }

  saveGame() {
    this.dbService.saveGame(this.teeType, this.players).then(_ => {
      console.log("something")
    })
    this.isNew = false
  }



  deletePlayer(name) {
    let filtered = this.players.filter(player => player.name !== name)
    
    this.players = filtered

    console.log(this.players)

  }

  onBlur(event, name, inOrOut) {
    let score = Number(event.target.value)

    let currentPlayer = this.players.filter(player => player.name === name)
    console.log(currentPlayer[0])
    if (!score) {
      score = 0
    }

    if (inOrOut === 'in') {
      currentPlayer[0].in += score

    }
    else {
      currentPlayer[0].out += score
    }

    currentPlayer[0].total= currentPlayer[0].in + currentPlayer[0].out

  }

  finishGame() {
    const dialogRef = this.dialog.open(FinishDialogComponent, {
      width: '300px',
      data: { players: this.players, par: this.total }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.saveGame()
    })
  }

  goBack() {
    this.location.back()
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
