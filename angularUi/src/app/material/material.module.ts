import { NgModule } from '@angular/core';
import { 
	MatButtonModule,
	MatSidenavModule,
	MatToolbarModule,
	MatIconModule,
	MatListModule,
	MatRadioModule,
	MatTableModule,
	MatInputModule
} from '@angular/material'
// import {MatRadioModule} from '@angular/material/radio';


const MaterialComponents = [
	MatButtonModule,
	MatSidenavModule,
	MatToolbarModule,
	MatIconModule,
	MatListModule,
	MatRadioModule,
	MatTableModule,
	MatInputModule
]
@NgModule({
	imports: [MaterialComponents],
	exports: [MaterialComponents]
})
export class MaterialModule { }
