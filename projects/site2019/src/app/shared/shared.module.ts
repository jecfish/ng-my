import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [
        ModalComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        ModalComponent,
        HeaderComponent,
    ]
})
export class SharedModule { }
