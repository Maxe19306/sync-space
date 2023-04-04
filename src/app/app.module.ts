import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { GeneralViewComponent } from './general-view/general-view.component';
import { MenuSidebarLeftComponent } from './menu-sidebar-left/menu-sidebar-left.component';
import { MainChatComponent } from './main-chat/main-chat.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SecondaryChatComponent } from './secondary-chat/secondary-chat.component';
import { HomeWorkspacesComponent } from './home-workspaces/home-workspaces.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    GeneralViewComponent,
    MenuSidebarLeftComponent,
    MainChatComponent,
    SearchBarComponent,
    SecondaryChatComponent,
    HomeWorkspacesComponent,
    ProfileMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
