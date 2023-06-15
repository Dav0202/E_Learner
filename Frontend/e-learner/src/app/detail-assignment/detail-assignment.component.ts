import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { Component, OnInit, HostListener, Renderer2 } from '@angular/core';
import { AssignmentService } from '../services/assignment.service';
import { MatStepper } from "@angular/material/stepper";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewUserService } from '../services/new-user.service';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-detail-assignment',
  templateUrl: './detail-assignment.component.html',
  styleUrls: ['./detail-assignment.component.css']
})
export class DetailAssignmentComponent implements OnInit {

  @HostListener('window:beforeunload')
  state!:string;
  isAtEnd: number = 1
  isAtstart!:number
  length!:number
  assignmentanswer: any[] = []
  answer!: string;
  radioSelected!:string;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private route: ActivatedRoute,
    private as: AssignmentService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public ns: NewUserService,
    private router: Router,
    private renderer: Renderer2,
  ){}
  isLinear = false;
  questionForm!:FormGroup
  isSaved = false;

  /**
   * function that stop the exiting of a page
   * showing warning of what happens
   * @returns boolean value of true or false
   */
  canDeactivate(): Observable<boolean> {
    if (!this.isSaved) {
      const result = window.confirm('WARNING: Incomplete assignment, Risk getting a 0');
      return of(result);
    }
    return of(true);
  }
  assignmentdetail:any;

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        const id: any = params.get('id')
        this.as.getAssignmentDetail(id).subscribe(
                    list => {
            this.assignmentdetail = list;
            this.length = list.questions.length
          }
        )
      }
    )
  }

  /**
   * Back button stepper
   * @param stepper Mat stepper class
   */
  goBack(stepper: MatStepper){
    stepper.previous();
    if (this.isAtEnd > this.length) {
      this.isAtEnd--
    }
  }

  /**
   * Forward button stepper
   * @param stepper Mat stepper class
   */
  goForward(stepper: MatStepper){
    stepper.next();
    if (this.isAtEnd < this.length) {
      this.isAtEnd++
    }
    this.assignmentanswer.push(this.answer)

  }

  /**
   * returns decrypted student email
   * @returns student email
   */
  setstudent(){
    let decryptcookies = this.ns.toDecryptStudentEducator()
    if (decryptcookies.educator === "false" && decryptcookies.student === "true") {
      return JSON.parse(decryptcookies.email)
    }
  }

  /**
   * Submits form to api
   */
  submit(){
    this.questionForm = this.fb.group({
      email: this.setstudent(),
      id: [this.assignmentdetail['id'], Validators.required],
      answers: [this.assignmentanswer, Validators.required],
    });
    this.assignmentanswer.push(this.answer)
    this.as.createdGradedAssignment(this.questionForm.value).subscribe()
    this.isSaved = true

    this.snackBar.open('Assignment submited', 'Close', {
      verticalPosition:this.verticalPosition,
    })
    this.router.navigate(['/', 'homepage'])
  }

  /**
   * Checks for scrollTop event and customize html as required
   * @param event event
   */
  @HostListener('window:scroll', ['$event'])
  scrollFunction(event:any){
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
      const container = document.getElementById('navbar');
      this.renderer.addClass(container, "fixed-top");
      this.renderer.addClass(document.body, "header-small")
      this.renderer.addClass(document.body, "body-top-padding");
    } else {
      const container = document.getElementById('navbar');
      this.renderer.removeClass(container,"fixed-top" )
      this.renderer.removeClass(document.body, "header-small")
      this.renderer.removeClass(document.body,"body-top-padding" )
    }
  }


  /**
   * Checks for screen width and add classes
   * to customize the html as required
   * @param event event
   */
  @HostListener('window:resize', ['$event'])
  onResize(event:any){
    const container = document.getElementById('navbarSupportedContent');
    let w = event.target.innerWidth;
    if(w>=992) {
      this.renderer.removeClass(document.body,'sidebar-open')
      this.renderer.removeClass(container, "show")
    }
  }

}
