# Bankrun Workshop

Bankrun tutorials developed for 25' MegaHack Series Workshop.

[Source Repository](https://github.com/ChiefWoods/bankrun-workshop)

## Built With

### Languages

- [![Rust](https://img.shields.io/badge/Rust-f75008?style=for-the-badge&logo=rust)](https://www.rust-lang.org/)
- [![TypeScript](https://img.shields.io/badge/TypeScript-ffffff?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

### Libraries

- [@coral-xyz/anchor](https://www.anchor-lang.com/)
- [@solana/web3.js](https://solana-labs.github.io/solana-web3.js/)
- [@solana/spl-token](https://solana-labs.github.io/solana-program-library/token/js/)
- [solana-bankrun](https://kevinheavey.github.io/solana-bankrun/)
- [anchor-bankrun](https://kevinheavey.github.io/solana-bankrun/)
- [spl-token-bankrun](https://github.com/metaDAOproject/spl-token-bankrun)
- [@metaplex-foundation/mpl-token-metadata](https://developers.metaplex.com/token-metadata)

### Runtime

- [![Bun](https://img.shields.io/badge/Bun-000?style=for-the-badge&logo=bun)](https://bun.sh/)

## Getting Started

### Prerequisites

Update your Bun toolkit, Solana CLI and Anchor version manager.

```bash
bun upgrade
agave-install init 2.1.0
avm use 0.31.0
```

### Setup

1. Clone the repository

```bash
git clone https://github.com/ChiefWoods/bankrun-workshop.git
```

2. Install all dependencies

```bash
bun i
```

3. Sync all program keypairs and build

```bash
anchor keys sync
anchor build
```

### Testing

Run tests for all programs.

```bash
bun test
```

Running tests for a specific program.

```bash
bun test tests/escrow
```

## Issues

View the [open issues](https://github.com/ChiefWoods/bankrun-workshop/issues) for a full list of proposed features and known bugs.

## Acknowledgements

### Resources

- [Shields.io](https://shields.io/)

## Contact

[chii.yuen@hotmail.com](mailto:chii.yuen@hotmail.com)
