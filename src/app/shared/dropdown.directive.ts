import { Directive } from "@angular/core";
import { Input } from "@angular/core";
import { ElementRef } from "@angular/core";
import { OnInit } from "@angular/core";
import { HostListener } from "@angular/core";
import { Renderer2 } from "@angular/core";


@Directive({
    selector:'[appDropdown]',
})

export class DropdownDirective implements OnInit{

    constructor(private elRef:ElementRef, private renderer:Renderer2){}

    ngOnInit(){
    }

    @HostListener('click') mouseclick(){
        if(this.elRef.nativeElement.classList.contains('open')){
            this.renderer.removeClass(this.elRef.nativeElement, 'open');
        } else{
            this.renderer.addClass(this.elRef.nativeElement, 'open');
        }
    }
}