import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { CoursesComponent } from './components/courses/courses.component';
import { CardComponent } from './components/card/card.component';
import { NavComponent } from './components/nav/nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TeeTypeComponent } from './components/tee-type/tee-type.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CharacterDialogComponent } from './components/card/character-dialog/character-dialog.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { LoadGamesComponent } from './components/load-games/load-games.component';
import { FinishDialogComponent } from './components/card/finish-dialog/finish-dialog.component';
import { NamingSchemePipe } from './pipes/naming-scheme.pipe';
import { AlertDialogComponent } from './components/card/alert-dialog/alert-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CardComponent,
    NavComponent,
    TeeTypeComponent,
    CharacterDialogComponent,
    LoadGamesComponent,
    FinishDialogComponent,
    NamingSchemePipe,
    AlertDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.fireBase),
    AngularFirestoreModule,
  ],
  providers: [NamingSchemePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
