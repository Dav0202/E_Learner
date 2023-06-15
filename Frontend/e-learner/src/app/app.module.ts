import { MatStepperModule} from '@angular/material/stepper';
import { TokenInterceptor, } from './services/jwt-interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatCard, MatCardModule } from "@angular/material/card";
import { AssignmentComponent } from './assignment/assignment.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreateAssignmentComponent } from './create-assignment/create-assignment.component';
import { DetailAssignmentComponent } from './detail-assignment/detail-assignment.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { GradedAssignmentComponent } from './graded-assignment/graded-assignment.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsComponent } from './materials/materials.component';
import { MatIconModule } from '@angular/material/icon';
import { MaterialViewComponent } from './material-view/material-view.component';
import { Error404Component } from './error404/error404.component';
import { DropdownDirective } from './homepage/dropdown.directive';
import { SearchpipePipe } from './pipes/searchpipe.pipe';
import { APP_BASE_HREF } from '@angular/common';
import { ChatappComponent } from './chatapp/chatapp.component';
import { DatepipePipe } from './pipes/datepipe.pipe';
import { ReversepipePipe } from './pipes/reversepipe.pipe';
import { VideoCallComponent } from './video-call/video-call.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { EnterRoomComponent } from './enter-room/enter-room.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    AssignmentComponent,
    CreateAssignmentComponent,
    DetailAssignmentComponent,
    GradedAssignmentComponent,
    MaterialsComponent,
    MaterialViewComponent,
    Error404Component,
    DropdownDirective,
    SearchpipePipe,
    ChatappComponent,
    DatepipePipe,
    ReversepipePipe,
    VideoCallComponent,
    ChatRoomComponent,
    EnterRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    HttpClientModule,
    MatStepperModule,
    MatRadioModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatProgressBarModule,
    MatMenuModule

  ],
  providers: [

    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    CookieService,
    DatepipePipe,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
