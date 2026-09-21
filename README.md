# Final Figma Project - Hotel Booking Website

## Live Demo

You can view the live version of the project here:

    Live Link:https://melodious-wisp-9eefcf.netlify.app/


------------------------------------------------------------------------

## Project Overview

This project is a front-end hotel booking website created using **HTML,
CSS, and JavaScript**.

It includes multiple pages for: - Browsing hotels - Searching hotels -
Viewing hotel details - Booking checkout - User authentication -
Managing trips

The project uses `trips.json` as a hotel data source and JavaScript to
dynamically display hotel cards and handle filtering/sorting features.

------------------------------------------------------------------------

## Project Structure

``` text
finalfigmaproject/

├── img/
│   └── Website images and visual assets

├── index.html
│   └── Homepage / landing page

├── search.html
│   └── Hotel search, filtering, and sorting page

├── mytrips.html
│   └── User trip history page

├── detail.html
│   └── Hotel details page

├── checkout-page.html
│   └── Booking checkout page

├── check-inbox.html
│   └── Check-in information page

├── sign-in.html
│   └── User login page

├── Register.html
│   └── User registration page

├── create-password.html
│   └── Create password page

├── Forgot-password.html
│   └── Forgot password recovery page

├── s2.html
│   └── Additional project page

├── test.html
│   └── Testing page

├── index.css
│   └── Main website styling

├── index.js
│   └── JavaScript logic and functionality

└── trips.json
    └── Hotel information database in JSON format
```

------------------------------------------------------------------------

## Features

### Hotel Listing

-   Dynamic hotel card generation
-   Hotel images, names, ratings, prices, and reviews
-   Data loaded from JSON file

### Search System

-   Search hotels by name
-   Display matching results dynamically

### Filtering System

Supports: - Price range filtering - Rating filtering - Popular filters -
Activity filters - Hotel category filtering

### Sorting System

Users can sort hotels by: - Recommended - Price low to high - Price high
to low - Rating

### User Pages

Includes: - Registration - Login - Password recovery - Checkout - Trip
management

------------------------------------------------------------------------

## How to Run the Project

1.  Download or clone the project.
2.  Open the project folder in VS Code.
3.  Run the project using Live Server.

Example:

    Right click index.html
    → Open with Live Server

------------------------------------------------------------------------

## File Relationship

    HTML Pages
         |
         ↓
    index.css
         |
         ↓
    index.js
         |
         ↓
    trips.json
         |
         ↓
    Dynamic Hotel Display

------------------------------------------------------------------------

## Future Improvements

Possible improvements: - Connect with a backend API - Add database
integration - Add user authentication system - Add payment gateway -
Store bookings permanently
