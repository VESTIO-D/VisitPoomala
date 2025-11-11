import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

type NavItem = {
  key: string;
  label: string;
  short: string;    // short label for mobile
  href: string;     // #anchor
  icon: string;     // svg string
};

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  scrolled = false;
  active: string | null = 'home';
  observer?: IntersectionObserver;

  // Define nav items once, with label (desktop), short (mobile), href, and inline SVG icon (string).
  navItems: NavItem[] = [
    {
      key: 'home',
      label: 'Home',
      short: 'Home',
      href: '#home',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9.75L12 3l9 6.75M4.5 10.5V21h15V10.5M9 21V12h6v9"/></svg>`
    },
    {
      key: 'about',
      label: 'About',
      short: 'About',
      href: '#about',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"d="M13 16h-1v-4h-1m1-4h.01M12 6.253c-4.147 0-7.5 3.08-7.5 6.747 0 1.993 1.016 3.795 2.7 5.02L12 21l4.8-2.98c1.684-1.225 2.7-3.027 2.7-5.02 0-3.667-3.353-6.747-7.5-6.747z"/></svg>`
    },
    {
      key: 'places',
      label: 'Places',
      short: 'Places',
      href: '#places',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"d="M12 2a9 9 0 00-9 9v11l9-4 9 4V11a9 9 0 00-9-9z"/></svg>`
    },
    {
      key: 'gallery',
      label: 'Gallery',
      short: 'Gallery',
      href: '#gallery',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"d="M4 16l4-4 4 4 4-4 4 4"/></svg>`
    },
    {
      key: 'contact',
      label: 'Contact',
      short: 'Contact',
      href: '#contact',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v6m0-6H8"/></svg>`
    }
  ];

  constructor(private host: ElementRef<HTMLElement>) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 50;
  }

  // Smooth scroll helper (prevents default hash jump)
  scrollToSection(event: Event, href: string) {
    event.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // update active immediately (observer will confirm)
      this.active = id;
    }
  }

  // IntersectionObserver to detect which section is in view and set `active`
  ngAfterViewInit(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: [0.35, 0.6] // good thresholds for sections
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            // set active to match nav key if exists
            const found = this.navItems.find((n) => n.href === `#${id}`);
            this.active = found ? found.key : id;
          }
        }
      });
    }, options);

    // Observe each section referenced by nav items
    this.navItems.forEach((item) => {
      const el = document.getElementById(item.href.replace('#', ''));
      if (el && this.observer) {
        this.observer.observe(el);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
