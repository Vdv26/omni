# OmniGigs - Freelance Services Marketplace

OmniGigs is a modern, responsive single-page web application (SPA) built with React. It serves as a freelance marketplace where users can browse, search, and discover professional services ranging from web development to plumbing and digital marketing. 

## Features

* **Dynamic Gig Browsing:** View a wide variety of freelance services with pricing, ratings, and seller details.
* **Search & Filtering:** Easily find specific services using the search bar or filter by categories (e.g., Programming & Tech, Plumbing Services, Digital Marketing).
* **Advanced Sorting:** Sort gigs by Price (Low to High / High to Low) and Top Ratings.
* **User Authentication Flow:** Protected routes ensure that users must be logged in to access specific features like posting a gig or making a payment.
* **Favorites System:** Save and manage favorite gigs, persisted locally using the browser's `localStorage`.
* **Interactive UI:** Smooth navigation using `react-router-dom` without page reloads.
* **Mock Backend Integration:** Pre-loaded with diverse mock data to simulate a live database environment.

## Tech Stack

* **Frontend Framework:** React 19 (using Functional Components and Hooks like `useState`, `useEffect`, `useMemo`, `useContext`)
* **Routing:** React Router v7 (`react-router-dom`)
* **Styling:** CSS3 (Custom styling via `App.css` and `index.css`)
* **State Management:** React Context API & Local Storage
* **Development Environment:** Create React App (CRA)

## Project Structure

The application is modularized into reusable components located in the `src/components` directory:

* **Core Layout:** `Header`, `Footer`, `Hero`, `CategoryMenu`
* **Gig Management:** `GigList`, `GigCard`, `GigDetail`, `PostGigForm`
* **User Features:** `UserProfile`, `Favorites`, `LoginSignup`, `Payment`
* **Informational Pages:** `HowItWorks`, `Resources`, `HelpCenter`, `TrustAndSafety`, `ContactUs`

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm (Node Package Manager) installed on your machine.
* [Download Node.js](https://nodejs.org/)

### Installation

1. **Clone the repository** (or download the source code):

   git clone https://github.com/Vdv26/omni
   cd omni