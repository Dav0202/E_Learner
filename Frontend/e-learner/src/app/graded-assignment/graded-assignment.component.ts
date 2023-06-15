import { NewUserService } from './../services/new-user.service';
import { AssignmentService } from './../services/assignment.service';
import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-graded-assignment',
  templateUrl: './graded-assignment.component.html',
  styleUrls: ['./graded-assignment.component.css']
})
export class GradedAssignmentComponent implements OnInit {

  constructor(
    private as:AssignmentService,
    public ns:NewUserService,
    private renderer: Renderer2,
  ) { }

  grade: any

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

  ngOnInit(): void {

    let email: string= this.setstudent()
    this.as.getGradedAssignment(email).subscribe(
      (assignment: any) => {
        this.grade = assignment
      }
    )
  }

  /**
   * Checks for screen and add classes
   * to customize the html as required
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
   * Checks for screen and add classes
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
