import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { Gallery } from './components/gallery/gallery';
import { About } from './components/about/about';
import { Places } from './components/places/places';
import { Contact } from './components/contact/contact';
import { WhatsappFab } from './components/whatsapp-fab/whatsapp-fab';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Hero, Gallery,
    About, Places, Contact, WhatsappFab],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-angular-app');
  private serviceId = 'YOUR_SERVICE_ID';
  private templateId = 'YOUR_TEMPLATE_ID';
  private publicKey = 'YOUR_PUBLIC_KEY';

  sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm(
      this.serviceId,
      this.templateId,
      e.target as HTMLFormElement,
      { publicKey: this.publicKey }
    ).then(
      () => alert('Message sent!'),
      (error) => alert('Failed to send: ' + (error as EmailJSResponseStatus).text)
    );
  }
}
