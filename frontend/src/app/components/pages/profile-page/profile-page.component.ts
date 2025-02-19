import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  user: any = {}; // Objet pour stocker les informations de l'utilisateur

  constructor() {}

  ngOnInit(): void {
    this.loadUserData(); // Charger les données de l'utilisateur au démarrage du composant
  }

  loadUserData(): void {
    // Récupérer les données de l'utilisateur depuis le localStorage
    const userData = localStorage.getItem('User');
    if (userData) {
      this.user = JSON.parse(userData); // Convertir la chaîne JSON en objet
    } else {
      console.error('Aucune donnée utilisateur trouvée dans le localStorage.');
    }
  }
}