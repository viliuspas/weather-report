# Weather Report Frontend

Frontend is made using Angular framework.

## Usage

To install dependencies run:
```bash
npm install
```

To start a local development server, run:

```bash
ng serve
```

or

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

Production code is ran using:
```bash
ng serve --configuration=production
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## File Structure

```
weather-report-frontend/
└── src/
    ├── app/
    |   ├── components/     # Non reusable page components
    |   ├── models/         # API request and response interfaces
    |   ├── pages/          # Route level root components
    |   ├── services/       # API calls, helper services
    |   └── shared/         # Shared resources (components, directives, pipes)
    └── environments/       # Environment invormation
```