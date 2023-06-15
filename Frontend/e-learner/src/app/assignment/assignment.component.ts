import { NewUserService } from './../services/new-user.service';
import { AssignmentService } from './../services/assignment.service';
import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  searchTerm: any = '';

  assignment:any
  constructor(
    private as: AssignmentService,
    public ns: NewUserService,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    this.as.getAssignment().subscribe(
      (assignment: any) => {
        this.assignment = assignment
      }
    )
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
