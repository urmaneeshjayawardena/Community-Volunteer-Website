# Community Volunteer Website

A multi-page website connecting residents with local community services (health, education, transport, and social support), built using HTML, CSS, and vanilla JavaScript.

## Purpose

Built as part of my second-year web development coursework. The goal was to build a functional, data-driven site without relying on any frontend framework — using raw DOM manipulation and XML as a data source.

## Key Features

**XML-Driven Content**
Service listings aren't hardcoded into the HTML — they're stored in `xml/services.xml` and loaded dynamically at runtime using `XMLHttpRequest`. Each service has a category, name, description, contact, and location, parsed and rendered into HTML on page load.

**Dynamic Category Filtering**
Users can filter services by category (Health, Education, Transport, Social) using filter buttons. Filtering is handled client-side in `filter.js`, which re-renders only the matching services from the loaded XML — no page reload needed.

**Form Validation**
The contact form (`contact.js`) performs full client-side validation: required field checks, email format validation, phone number formatting (auto-formats as you type), and a success confirmation message that disappears after 5 seconds.

## Screenshots

*(add your screenshots here between these lines, e.g.)*
![Homepage](images/screenshot-home.png)
![Services with filtering](images/screenshot-services.png)
![Contact form](images/screenshot-contact.png)

## Project Structure
