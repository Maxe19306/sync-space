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
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirnNewPasswordComponent } from './confirn-new-password/confirn-new-password.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ChannelViewComponent } from './channel-view/channel-view.component';
import { MatDialogModule } from '@angular/material/dialog'
import { MatMenuModule } from '@angular/material/menu';
import { CreateChannelComponent } from './create-channel/create-channel.component';
import { AddMemberAfterAddChannelComponent } from './add-member-after-add-channel/add-member-after-add-channel.component';
import { ChannelsMenuComponent } from './channels-menu/channels-menu.component';
import { DmMenuComponent } from './dm-menu/dm-menu.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MainChatBodyComponent } from './main-chat-body/main-chat-body.component';
import { MainChatFooterComponent } from './main-chat-footer/main-chat-footer.component';
import { MembersViewComponent } from './members-view/members-view.component';
import { SecondaryChatBodyComponent } from './secondary-chat-body/secondary-chat-body.component';
import { SecondaryChatFooterComponent } from './secondary-chat-footer/secondary-chat-footer.component';
import { MainDirectMessageComponent } from './main-direct-message/main-direct-message.component';
import { MainDirectMessageBodyComponent } from './main-direct-message-body/main-direct-message-body.component';
import { MainDirectMessageFooterComponent } from './main-direct-message-footer/main-direct-message-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    GeneralViewComponent,
    MenuSidebarLeftComponent,
    MainChatComponent,
    SearchBarComponent,
    SecondaryChatComponent,
    HomeWorkspacesComponent,
    ProfileMenuComponent,
    LoginComponent,
    SignInComponent,
    ResetPasswordComponent,
    ConfirnNewPasswordComponent,
    ProfileViewComponent,
    ChannelViewComponent,
    CreateChannelComponent,
    AddMemberAfterAddChannelComponent,
    ChannelsMenuComponent,
    DmMenuComponent,
    MainChatBodyComponent,
    MainChatFooterComponent,
    MembersViewComponent,
    SecondaryChatBodyComponent,
    SecondaryChatFooterComponent,
    MainDirectMessageComponent,
    MainDirectMessageBodyComponent,
    MainDirectMessageFooterComponent
  ],
  imports: [
    MatRadioModule,
    MatCheckboxModule,
    MatMenuModule,
    MatDialogModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
