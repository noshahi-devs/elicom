import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatTooltipModule, NgIf], // Add this
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer {
 
}