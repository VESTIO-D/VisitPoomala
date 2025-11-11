import { Component } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private serviceId = 'service_hicnqvr';
  private templateId = 'template_dypyf0w';
  private publicKey = 'vMsMbWHAg1tLADEDY';

  sendEmail(event: Event) {
    event.preventDefault();

    emailjs
      .sendForm(this.serviceId, this.templateId, event.target as HTMLFormElement, {
        publicKey: this.publicKey,
      })
      .then(
        () => {
          alert('✅ Message sent successfully!');
        },
        (error) => {
          console.error('Email send failed:', error);
          alert('❌ Failed to send message. Please try again.');
        }
      );
  }
}
