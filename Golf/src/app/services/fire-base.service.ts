import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Games, Player } from '../interfaces/player';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {
  private gamesRef: AngularFirestoreCollection<Games>

  constructor(private db: AngularFirestore) {
    this.gamesRef = this.db.collection<Games>('games')
  }

  getGamesObservable(): Observable<Games[]> {
    return this.gamesRef.snapshotChanges()
      .pipe(
        map((items: DocumentChangeAction<Games>[]): Games[] => {
          return items.map((item: DocumentChangeAction<Games>): Games => {
            return {
              id: item.payload.doc.id,
              players: item.payload.doc.data().players,
              tee: item.payload.doc.data().tee,
            }
          })
        })
      );
  }

  saveGame(tee: string, players: Player[]):Promise<any> {
    return this.gamesRef.add({players ,tee})
  }

  updateGame(_id: string, players: Player[]) {
    return this.gamesRef.doc(_id).update({players})
    .then(_ => {
      console.log('success on update')
    })
    .catch(error => console.log('update', error));
  }

  deleteGame(_id: string) {
    return this.gamesRef.doc(_id).delete()
    .then(_ => {
      console.log('success on delete')
    })
    .catch(error => console.log('delete', error));
  }

}
