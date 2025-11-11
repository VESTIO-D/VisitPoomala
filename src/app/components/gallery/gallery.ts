import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

type Item = {
   src:string; 
   alt:string; 
   id:string; 
  };

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {
  images = [
    '/IMG-20251101-WA0004.jpg',
    '/IMG-20251101-WA0007.jpg',
    '/IMG-20251101-WA0010.jpg',
    '/IMG-20251101-WA0013.jpg',
    '/IMG-20251101-WA0014.jpg',
  ];

  isModalOpen = false;
  currentIndex = 0;
  touchStartX = 0;
  touchEndX = 0;

  openModal(index: number) {
    this.currentIndex = index;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen = false;
    document.body.style.overflow = 'auto';
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    if (!this.isModalOpen) return;
    this.touchStartX = event.changedTouches[0].screenX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    if (!this.isModalOpen) return;
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  handleSwipe() {
    const swipeDistance = this.touchStartX - this.touchEndX;
    if (Math.abs(swipeDistance) > 50) {
      swipeDistance > 0 ? this.nextImage() : this.prevImage();
    }
  }
}
