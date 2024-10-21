import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import '../assets/xui-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  readonly title = 'xello-dashboard';
  readonly maxMobileButtonCount = 5;
  readonly maxMobileWidth = 300;

  @ViewChild('xuiReaction') reactionComponent?: ElementRef<HTMLElement>;

  @HostListener('window:resize')
  onResizeHandler() {
    const windowWidth = window.innerWidth;

    const listButtons = (
      this.reactionComponent?.nativeElement as HTMLElement
    ).shadowRoot?.querySelectorAll('xui-reaction-list-button');

    if (windowWidth <= this.maxMobileWidth) {
      listButtons?.forEach((button, index) => {
        if (index < this.maxMobileButtonCount) {
          (button as HTMLElement).style.display = 'block';
        } else {
          (button as HTMLElement).style.display = 'none';
        }
      });
    } else {
      // Reset all buttons when not in mobile breakpoint
      listButtons?.forEach((button) => {
        (button as HTMLElement).style.display = '';
      });
    }
  }
}
