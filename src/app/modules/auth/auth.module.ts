import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthRoutingModule } from "./auth.routing";
import { SharedModule } from "src/app/shared/shared.module";
import {  HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
    ],
    imports: [
        AuthRoutingModule,
        SharedModule,
        HttpClientModule,
    ],
    providers: []
})
export class AuthModule { }