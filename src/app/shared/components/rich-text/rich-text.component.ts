import {
  AfterViewInit,
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ICONS, IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-rich-text',
  templateUrl: './rich-text.component.html',
  styleUrls: ['./rich-text.component.scss'],
})
export class RichTextComponent implements AfterViewInit {
  @ViewChild('text') textTemplate!: TemplateRef<{ $implicit: string }>;
  @ViewChild('output', { read: ViewContainerRef, static: true })
  content!: ViewContainerRef;
  private _templateString: string = '';
  public done: boolean = false;

  constructor(private _eleRef: ElementRef) {}

  ngAfterViewInit(): void {
    this._templateString = (
      this._eleRef.nativeElement as HTMLElement
    ).innerText;
    setTimeout(() => {
      this._renderRichText();
    });
  }

  private _renderRichText(): void {
    // Note: We are rendering to a container instead of the host because rendering to the host creates it as a sibling of the host element
    this._templateString.split(/(\[\[\w+\]\])/g).forEach((template) => {
      if (template.startsWith('[[')) {
        const icon = template.replace('[[', '').replace(']]', '');
        if (icon in ICONS) {
          const comp = this.content.createComponent(IconComponent);
          comp.setInput('name', icon);
        }
      } else {
        this.content.createEmbeddedView(this.textTemplate, {
          $implicit: template,
        });
      }
    });
    this.done = true;
  }
}
