import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { HunterProfile } from '@app/core/types/HunterProfile';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HunterProfileStoreActions } from '@root-store/actions';
import { HunterProfilesSelectors } from '@root-store/selectors';
import { take } from 'rxjs';
import { AddHunterDialogComponent } from '../add-hunter-dialog/add-hunter-dialog.component';

@Component({
  selector: 'app-profile-selector',
  templateUrl: './profile-selector.component.html',
  styleUrls: ['./profile-selector.component.scss'],
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    AsyncPipe,
    MatButtonModule,
  ],
})
export class ProfileSelectorComponent {
  private _store$ = inject(Store);
  private _dialog = inject(MatDialog);
  private _actions$ = inject(Actions);
  private _router = inject(Router);

  public hunterProfiles$ = this._store$.select(
    HunterProfilesSelectors.selectAll
  );
  public activeHunterProfileId$ = this._store$.select(
    HunterProfilesSelectors.selectActiveHunterId
  );

  public selectHunterProfile(hunterId: string): void {
    this._actions$
      .pipe(
        ofType(HunterProfileStoreActions.selectHunterProfileSuccess),
        take(1)
      )
      .subscribe(() => this._router.navigate(['edit']));
    this._store$.dispatch(
      HunterProfileStoreActions.selectHunterProfile({ hunterId })
    );
  }

  public addHunterProfile(): void {
    this._dialog
      .open(AddHunterDialogComponent)
      .afterClosed()
      .pipe(take(1))
      .subscribe((res) => {
        if (res) {
          this._store$.dispatch(
            HunterProfileStoreActions.addHunterProfile({
              data: new HunterProfile(res.hunterName, res.playerName),
            })
          );
        }
      });
  }

  public removeHunterProfile(hunterId: string): void {
    this._store$.dispatch(
      HunterProfileStoreActions.deleteHunterProfile({ hunterId })
    );
  }
}
