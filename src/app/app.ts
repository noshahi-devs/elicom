import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './layout/sidebar/sidebar';
import { Header } from "./layout/header/header";
import { Footer } from './layout/footer/footer';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Header,
    Sidebar,
    RouterOutlet,
    Footer,
    NgIf
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  collapsed = false;
}
