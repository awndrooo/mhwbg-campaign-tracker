import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MHIconsModule } from '@shared/mhicons.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CampaignEditorModule } from './features/campaign-editor/campaign-editor.module';
import { RootStoreModule } from './root-store/root-store.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    RootStoreModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    CampaignEditorModule,
    MHIconsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
