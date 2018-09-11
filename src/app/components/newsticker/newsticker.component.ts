import { Component, OnInit, Input, ElementRef,
        AfterViewInit, Renderer2, QueryList,
        ViewChild, ViewChildren, HostListener } from '@angular/core';

@Component({
  selector: 'app-newsticker',
  templateUrl: './newsticker.component.html',
  styleUrls: ['./newsticker.component.scss']
})
export class NewstickerComponent implements OnInit, AfterViewInit {
  @Input() title = '';
  @Input() events: string[] = [];
  @Input() interval = 3000;
  @Input() showCounter = true;
  @Input() defaultColor: string;
  @Input() backColor: string;

  @ViewChild('nt') private ntRef: ElementRef;
  @ViewChild('ntCounter') private ntCounterRef: ElementRef;
  @ViewChild('ntTitle') private ntTitleRef: ElementRef;
  @ViewChild('ntDart') private ntDartRef: ElementRef;
  @ViewChildren('ntNavi') private ntNaviRef: QueryList<ElementRef>;

  private ACTIONS = {
    'NEXT': 1,
    'PREV': -1
  };

  autoNext: any;
  item: string;
  current: string;
  position = -1;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.autoNavigate();
    this.navigate('NEXT');
  }

  ngAfterViewInit() {
    this.defaultColor = this.defaultColor || '#1976D2';

    this.renderer.setStyle(this.ntRef.nativeElement, 'background-color', this.backColor || '#FFFFFF');
    this.renderer.setStyle(this.ntRef.nativeElement, 'border-color', this.defaultColor);

    if (this.ntCounterRef) {
      this.renderer.setStyle(this.ntCounterRef.nativeElement, 'background-color', this.defaultColor);
    }

    if (this.ntTitleRef) {
      this.renderer.setStyle(this.ntTitleRef.nativeElement, 'background-color', this.defaultColor);
      this.renderer.setStyle(this.ntDartRef.nativeElement, 'border-left-color', this.defaultColor);
    }

    this.ntNaviRef.forEach(item => {
      this.renderer.setStyle(item.nativeElement, 'border-color', this.defaultColor);
    });


  }

  @HostListener('mouseover')
  onMouseOver() {
    clearInterval(this.autoNext);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.autoNavigate();
  }

  private autoNavigate() {
    if (this.interval > 0) {
      this.autoNext = setInterval(() => this.navigate('NEXT'), this.interval);
    } else {
      clearInterval(this.autoNext);
    }
  }

  public navigate(action: string) {
    if (typeof this.ACTIONS[action] === 'undefined') {
      return;
    }

    const shift = this.ACTIONS[action];
    this.position += shift;

    if (this.events) {
      if (this.position < 0) {
        this.position = this.events.length - 1;
      } else if (this.position >= this.events.length) {
        this.position = 0;
      }

      this.item = this.events[this.position];
      this.current = `${(this.position + 1)} / ${this.events.length}`;
    }
  }

}
