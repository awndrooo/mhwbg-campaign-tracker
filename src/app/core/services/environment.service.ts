import { Injectable } from '@angular/core';
import { IEnvironment } from '@env/IEnvironment';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService implements IEnvironment {
  get production(): boolean {
    return environment.production;
  }
  get ApiHost(): string {
    return environment.ApiHost;
  }
  get IDBName(): string {
    return environment.IDBName;
  }
  get IDBVersion(): number {
    return environment.IDBVersion;
  }
  get assets(): string {
    return environment.assets;
  }
}
