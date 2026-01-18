import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './layout/sidebar/sidebar';
import { Header } from "./layout/header/header";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Header,
    Sidebar,
    Header,
    RouterOutlet
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
collapsed: any;
}
