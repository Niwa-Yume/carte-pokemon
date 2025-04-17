import { Component } from '@angular/core';
import { PokemonCardComposantComponent } from './pokemon-card-composant/pokemon-card-composant.component';


@Component({
  selector: 'app-root',
  imports: [
    PokemonCardComposantComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'carte-pokemon';
}
