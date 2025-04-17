import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-card-composant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card-composant.component.html',
  styleUrl: './pokemon-card-composant.component.css'
})
export class PokemonCardComposantComponent implements AfterViewInit {
  @ViewChild('card') card!: ElementRef;
  isFlipped = false;

  ngAfterViewInit() {
    const cardElement = this.card.nativeElement;
    const cardInner = cardElement.querySelector('.card-inner');

    // Gestion du survol
    cardElement.addEventListener('mousemove', (e: MouseEvent) => {
      if (!this.isFlipped) {
        const rect = cardElement.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        const rotateY = x * 10;
        const rotateX = -y * 10;

        // Appliquer la transformation seulement si la carte n'est pas retournée
        cardInner.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        this.updateShineEffect(e, cardElement);
      }
    });

    // Réinitialisation lors de la sortie du survol
    cardElement.addEventListener('mouseleave', () => {
      if (!this.isFlipped) {
        cardInner.style.transform = 'rotateY(0deg) rotateX(0deg)';
      }
    });

    // Gestion du clic avec séparation claire entre les états
// Modifiez la gestion du clic dans ngAfterViewInit
    cardElement.addEventListener('click', () => {
      this.isFlipped = !this.isFlipped;

      if (this.isFlipped) {
        // Important: appliquer seulement la classe, ne pas manipuler le style directement
        cardElement.classList.add('flipped');
      } else {
        cardElement.classList.remove('flipped');
        // Réinitialiser après un délai pour éviter les conflits
        setTimeout(() => {
          if (!this.isFlipped && !cardElement.matches(':hover')) {
            cardInner.style.transform = 'rotateY(0deg) rotateX(0deg)';
          }
        }, 400); // Durée plus longue pour laisser la transition se terminer
      }
    });
  }

  // Nouvelle méthode pour l'effet de brillance dynamique
  updateShineEffect(e: MouseEvent, cardElement: HTMLElement) {
    const shine = cardElement.querySelector('.shine') as HTMLElement;
    if (!shine) return;

    const rect = cardElement.getBoundingClientRect();

    // Calculer la position du curseur par rapport à la carte
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculer les pourcentages
    const percentX = x / rect.width;
    const percentY = y / rect.height;

    // Déplacer l'effet de brillance
    const px = percentX * 100;
    const py = percentY * 100;

    shine.style.backgroundPosition = `${px}% ${py}%`;
  }
}
