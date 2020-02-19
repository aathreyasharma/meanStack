import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent} from './special-events/special-events.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
{
  path: '',
  redirectTo: '/items',
  pathMatch: 'full'
},
{
  path: 'items',
  component: EventsComponent
},
// {
//   path: 'special',
//   component: SpecialEventsComponent,
//   canActivate: [AuthGuard]
// },
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'register',
  component: RegisterComponent
},
{
  path: 'eventDetails',
  component: EventDetailsComponent
},
{
  path: 'cart',
  component: CartComponent,
  canActivate: [AuthGuard]
}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
