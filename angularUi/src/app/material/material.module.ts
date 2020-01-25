import { NgModule } from '@angular/core';
import { 
	MatButtonModule,
	MatSidenavModule,
	MatToolbarModule,
	MatIconModule,
	MatListModule
} from '@angular/material'

const MaterialComponents = [
MatButtonModule,
MatSidenavModule,
MatToolbarModule,
MatIconModule,
MatListModule
]
@NgModule({
	imports: [MaterialComponents],
	exports: [MaterialComponents]
})
export class MaterialModule { }
