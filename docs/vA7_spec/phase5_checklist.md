# Phase 5 Implementation Checklist (vA7)

## 1. Prepare API Framework
- Confirm server.ts loads environment variables (DATABASE_URL, UI_ORIGIN)
- Confirm Neon client connection (pg)
- Prepare endpoint structure (GET/POST/PhaseEngine)

## 2. Load Inputs for Phase Engine
- Fetch latest financial snapshot (monthly_balances, monthly_pl)
- Fetch latest market indicators
- Fetch previous AI outputs (ai_outputs)

## 3. Normalize Inputs
- Apply scaling rules
- Apply missing-value handling
- Apply time-decay weighting

## 4. Run Phase Engine
- Construct feature vector
- Classify phase (bull / bear / neutral / alert)
- Compute confidence score
- Generate explanation text

## 5. Write Outputs
- Insert into ai_outputs
- Insert into market_signals (if conditions matched)
- Return API response object

## 6. Testing
- Run manual API test on Render URL
- Confirm INSERT success in Neon console
- Confirm logs in ai_outputs and market_signals

## 7. Deployment
- Enable Auto-Deploy (Render)
- Add UptimeRobot monitor

