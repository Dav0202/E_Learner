import { NewUserService } from './../services/new-user.service';
import { MaterialService } from './../services/material.service';
import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-material-view',
  templateUrl: './material-view.component.html',
  styleUrls: ['./material-view.component.css']
})
export class MaterialViewComponent implements OnInit {

  constructor(
    private ms: MaterialService,
    public ns: NewUserService,
    private renderer: Renderer2,
  ) { }

  material:any;
  searchTerm2: any = '';

  ngOnInit(): void {
    this.ms.getmaterial().subscribe(
      (material: any) => {
        this.material = material
        console.log(this.material)
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
