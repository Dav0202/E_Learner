import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  exportAs: "appDropDown"
})
export class DropdownDirective {

  constructor() { }

  private wasInside = false;

  @HostBinding("class.show") isOpen = false;

  /**
   *  sets the is open and wasinside
   *  variable
   */
  @HostListener("click") toggleOpen() {
    this.isOpen = !this.isOpen;
    this.wasInside = true;
  }

  @HostListener("document:click") clickout() {
    if (!this.wasInside) {
      this.isOpen = false;
    }
    this.wasInside = false;
  }

}
