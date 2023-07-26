import { ArticoliCardComponent } from './components/articoli-card/articoli-card.component';
import { ArticoliComponent } from './pages/articoli/articoli.component';
import { CommonModule } from '@angular/common';
import { CoreModule } from "../../core/core.module";
import { FormsModule } from '@angular/forms';
import { GestartComponent } from './pages/gestart/gestart.component';
import { GridArticoliComponent } from './pages/grid-articoli/grid-articoli.component';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        ArticoliComponent,
        GridArticoliComponent,
        ArticoliCardComponent,
        GestartComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        NgxPaginationModule,
        FormsModule,
        CoreModule
    ]
})
export class ArticoliModule { }
