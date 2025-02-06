import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showScroll: boolean = false;
  

  // Écoute des événements de défilement
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    this.showScroll = scrollTop > 100; // Affiche le bouton si on dépasse 500px
  }

  // Méthode pour remonter en haut de la page
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Défilement fluide
    });
  }
}
