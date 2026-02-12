# Production Deployment Notes

This document provides step-by-step instructions for building and deploying the Dirty Daves application to production on the Internet Computer.

## Understanding Draft vs Live

- **Draft**: A local build or a canister deployment that has not been published to the main/live version. This may be a development build running locally, or a canister that has been deployed but not yet serving the latest assets to the public.
- **Live/Main**: The public Internet Computer canister serving the current production assets to end users. This is the version accessible via the canister URL and any custom domains.

## Prerequisites

Before deploying, ensure you have:
- DFX CLI installed and configured
- Node.js and pnpm installed
- Access to the Internet Computer network
- Admin credentials configured in the backend (if applicable)
- Correct identity selected in DFX (verify with `dfx identity whoami`)

## Build Commands

### 1. Clean Build (Recommended for Production)

