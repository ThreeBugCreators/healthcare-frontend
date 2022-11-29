import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { AuthRoutingModule } from "./auth.routing";
import { SharedModule } from "src/app/shared/shared.module";
import {  HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        LoginComponent,
    ],
    imports: [
        AuthRoutingModule,
        SharedModule,
        HttpClientModule,
    ],
    providers: []
})
export class AuthModule { }