import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IHunterProfile } from '@app/core/types/HunterProfile';
import { isNullOrUndefined } from '@app/core/utility/IsNullOrUndefined';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HunterProfileStoreActions } from '@root-store/actions';
import { HunterProfilesSelectors } from '@root-store/selectors';
import * as moment from 'moment';
import { Subject, map, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile-port',
  templateUrl: './profile-port.component.html',
  styleUrls: ['./profile-port.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePortComponent implements OnDestroy, OnInit {
  private _destroy$ = new Subject<boolean>();

  public activeHunterProfile$ = this._store.select(
    HunterProfilesSelectors.selectActiveHunter
  );
  public activeHunterProfileJson$ = this.activeHunterProfile$.pipe(
    map((profile) => JSON.stringify(profile))
  );

  constructor(
    private _store: Store,
    private _actions$: Actions,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._actions$
      .pipe(
        ofType(
          HunterProfileStoreActions.addHunterProfileSuccess,
          HunterProfileStoreActions.addHunterProfileFailure
        ),
        takeUntil(this._destroy$)
      )
      .subscribe((action) =>
        action.type == HunterProfileStoreActions.addHunterProfileSuccess.type
          ? this._snackbar.open('Successfully imported hunter profile', 'OK', {
              duration: 3000,
            })
          : this._snackbar.open(
              'There was a problem while importing the hunter profile',
              'OK',
              { duration: 4000 }
            )
      );
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }

  public copyToClipboard(value: string): void {
    try {
      navigator.clipboard.writeText(value);
    } catch (e) {
      // TODO: *shrug*?
    }
  }

  public saveActiveHunterProfile(): void {
    this.activeHunterProfile$.pipe(take(1)).subscribe((profile) => {
      const json = JSON.stringify(profile);
      const data = new Blob([json], { type: 'application/json' });
      const anchor = document.createElement('a');
      const url = URL.createObjectURL(data);
      const today = moment().format('YYYY-MM-DD');
      anchor.href = url;
      anchor.download = `${profile?.hunterName}_${today}.json`;
      document.body.appendChild(anchor);
      anchor.click();
      setTimeout(() => {
        document.body.removeChild(anchor);
        window.URL.revokeObjectURL(url);
      }, 0);
    });
  }

  public uploadProfileString(value: string): void {
    if (!isNullOrUndefined(value)) {
      const profile = this._getHunterProfileFromJsonString(value);
      this._addHunterProfile(profile);
    }
  }

  public uploadProfileFile(input: HTMLInputElement): void {
    const files = input.files;
    const reader = new FileReader();
    reader.addEventListener('load', (data) => {
      const result = <string>data.target?.result;
      if (!isNullOrUndefined(result)) {
        const profile = this._getHunterProfileFromJsonString(result);
        this._addHunterProfile(profile);
      }
    });

    if (files != null) {
      for (let x = 0; x < files.length; x++) {
        const file = files.item(x);
        if (file?.type == 'application/json') {
          reader.readAsText(file);
        }
      }
    }

    // Clear out input
    input.value = '';
  }

  private _getHunterProfileFromJsonString(data: string): IHunterProfile {
    // TODO: Validate data to verify valid values/ids and in the future include version info with migration paths
    return <IHunterProfile>JSON.parse(data);
  }

  private _addHunterProfile(profile: IHunterProfile) {
    // TODO: Enable upload to overwrite profile with matching hunterId possibly
    // for the sake of overwriting a bricked profile (probably require
    // confirmation)
    this._store.dispatch(
      HunterProfileStoreActions.addHunterProfile({
        data: profile,
      })
    );
  }
}
