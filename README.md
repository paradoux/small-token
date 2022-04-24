<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">Basic Token</h3>

  <p align="center">
    Small smart contract replicating ERC20 tokens to play around with
    <br />
    <br />
    <a href="https://github.com/paradoux/small-token/issues">Report Bug</a>
    ·
    <a href="https://github.com/paradoux/small-token/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  <!-- - [Usage](#usage) -->
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

<!-- ABOUT THE PROJECT -->

## About The Project

### Documentation

Very small smart contract to play around with. You can initialize the Token with the desired total supply and transfer them to the addresses of your choice.

### Built With

- [Solidity](https://docs.soliditylang.org/en/v0.8.13/)
- [OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/erc20)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Install npm

### Installation

1. Clone the repo

```sh
git clone https://github.com/paradoux/small-token.git
```

2. Install the packages

```sh
npm install
```

3. Run the deploy script to deploy the contract on a test network

```sh
npx hardhat run scripts/deploy.js --network rinkeby
```

4. Use your favorite IDE to interact with the contract

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/paradoux/small-token/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch using your initials (`git checkout -b am/amazing-feature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin am/amazing-feature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Axel Martin - mtn.axel@gmail.com

[Github](https://github.com/paradoux) - [LinkedIn](https://www.linkedin.com/in/martinaxel/)
