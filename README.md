![GitHub Workflow Status (with event)][github-status-url]

# DevToolBox

This project is a collection of tools commonly used by developers.
The goal is to have a single place to go to for all your development needs.
This prevents developers from having to go to different websites and deal with ads and other annoyances.

Checkout the project at [devtoolbox.raymondsplinter.com][app-url]

[![Dev's Toolbox Screenshot][app-screenshot]][app-url]

## Built with

This is an [Angular][angular-url] 17 project, designed with Angular Material. To learn more about these, checkout the following resources:

- [Angular][angular-docs-url] - Learn about Angular and its core concepts.
- [Angular Material][angular-material-url] - Learn about Angular Material and its components.

## Getting started

### Prerequisites

To get started, make sure that Node.js and Angular are installed on your machine.

- Node.js: install an active LTS version [here][nodejs-download-url] or use your package manager of choice.
- Angular: `npm install -g @angular/cli`

### Setup

1. Install dependencies: `npm install`
2. Build the project: `npm run build`
3. Run the project: `npm run start`

Open [http://localhost:4200](http://localhost:4200) to view the application in your browser.

### Testing

This project uses Jasmine for unit testing and Cypress for e2e testing.

- Run linting: `npm run lint`
- Run unit tests: `npm run test`
- Run unit tests with coverage: `npm run test:prod`
- Run e2e tests: `npm run e2e`

## Contributing

Contributions to the project are **highly appreciated**!  
If you have any suggestions or ideas, feel free to open an issue or submit a pull request.
Also don't forget to give the project a **star**!

1. Clone the project: `git clone https://github.com/RSplinter00/DevToolBox.git`
2. Create your feature branch: `git checkout -b feature/YourGreatFeature`
3. Commit your changes: `git commit -m "Add some great feature"`
4. Push to the branch: `git push origin feature/YourGreatFeature`

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- Markdown links and images -->

[app-url]: https://devtoolbox.raymondsplinter.com/

[github-status-url]: https://img.shields.io/github/actions/workflow/status/RSplinter00/DevToolBox/build-pipeline.yml

[angular-url]: https://angular.io/

[angular-docs-url]: https://angular.io/docs

[angular-material-url]: https://material.angular.io/

[nodejs-download-url]: https://nodejs.org/en/download/

[app-screenshot]: images/app-screenshot.png
