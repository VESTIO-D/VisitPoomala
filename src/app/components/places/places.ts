import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-places',
  imports: [CommonModule],
  templateUrl: './places.html',
  styleUrl: './places.css',
})
export class Places {
  places = [
    { name: 'Bali', desc: 'Island of Gods', image: '/poomala_dam.jpg' },
    { name: 'Paris', desc: 'City of Lights', image: '/vattayiwwaterfallls.jpg' },
    { name: 'Maldives', desc: 'Tropical Paradise', image: '/cheppara-20230927094832233505.webp' },
  ];
}
