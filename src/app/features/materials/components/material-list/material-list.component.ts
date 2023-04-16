import { Component, Input, Output } from '@angular/core';
import { MaterialsService } from '@app/core/services/materials.service';
import { HunterMaterials } from '@app/core/types/HunterMaterials';
import { Material } from '@app/core/types/Material';
import { EMPTY, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss'],
})
export class MaterialListComponent {
  public dataSource = new Subject<HunterMaterials[]>();

  @Input() public Materials: Observable<HunterMaterials[]> | HunterMaterials[] =
    EMPTY;
  @Input() public Materials2:
    | Observable<HunterMaterials[]>
    | HunterMaterials[] = [
    { materialId: 'b8e034b0-7685-4e4d-b974-0969b77dd7d4', count: 2 },
    { materialId: 'e47b6d9b-4999-4a91-8902-914e6df11469', count: 3 },
  ];

  @Input() public ShowControls: boolean = false;

  @Output() public IncrementMaterial = new Subject<{ materialId: string }>();
  @Output() public DecrementMaterial = new Subject<{ materialId: string }>();
  @Output() public RemoveMaterial = new Subject<{ materialId: string }>();

  public getMaterial(materialId: string): Observable<Material | undefined> {
    return this._materialService.FindMaterialById(materialId);
  }

  constructor(private _materialService: MaterialsService) {}
}
