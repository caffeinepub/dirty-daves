# Specification

## Summary
**Goal:** Add clear, in-app and console diagnostics to verify whether the frontend is connected to the intended live backend canister, and to help quickly detect draft/live mismatches or missing deployments.

**Planned changes:**
- Add a backend public query method that returns deployment/runtime identity details (backend canister principal ID as text + server-side timestamp) without requiring auth and without breaking existing features.
- Extend the existing frontend backend health check to also fetch and expose backend identity info, and emit a single clearly labeled diagnostic console line (hostname + backend canister ID + build/version info when available) or a single labeled error line on failure.
- Add a non-admin “Draft vs Live Verification” diagnostics view (route or query-param gated) that shows hostname, build mode/prod flag, build version, build timestamp, backend health status, backend canister ID, and backend server timestamp, with short guidance on interpreting mismatches.
- Update the admin “Backend Connectivity” diagnostics UI to display backend canister identity info when available and add a short troubleshooting checklist for draft/live mismatch, missing backend deployment, and network/agent errors.

**User-visible outcome:** Users (and admins) can open diagnostics to immediately see which environment they’re viewing and confirm whether the frontend is talking to the expected backend canister, with clearer guidance when draft/live deployment or binding issues are present.
