import {
  AfterViewInit,
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { EQUIPMENT_MAPS } from '@app/core/types/EquipmentMap';
import {
  EquipmentRarity,
  EquipmentRarityArray,
} from '@app/core/types/EquipmentRarity';
import { EquipmentIconComponent } from '@features/equipment/components/equipment-icon/equipment-icon.component';
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
    this._templateString.split(/(\[\[.*?\]\])/g).forEach((template) => {
      if (template.startsWith('[[')) {
        const field = template.replace('[[', '').replace(']]', '').split('|');
        const icon = field[0];
        const args = field.length > 1 ? field.splice(1) : null;
        if (icon in ICONS) {
          const comp = this.content.createComponent(IconComponent);
          comp.setInput('name', icon);
        } else if (icon in EQUIPMENT_MAPS) {
          const comp = this.content.createComponent(EquipmentIconComponent);
          comp.setInput('equipment', icon);
          const element: HTMLElement = comp.location.nativeElement;
          args?.forEach((x) => {
            if (EquipmentRarityArray.includes(x as EquipmentRarity)) {
              element.classList.add(`rarity-${x}`);
            }
          });
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
