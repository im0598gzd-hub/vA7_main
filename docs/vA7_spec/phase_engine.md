# Phase Space Engine (Structure Outline)

## 1. Inputs
- Financial snapshot (accounts, monthly_balances, monthly_pl)
- Market indicators (RSI, MACD, VIX, liquidity metrics)
- Recent AI outputs (previous signals, reasoning traces)

## 2. Normalization
- Scaling rules
- Missing-value handling
- Time-decay weighting

## 3. Feature Vector Construction
- Core dimensions
- Derived dimensions
- Noise-reduction logic

## 4. Phase Classification
- Bull / Bear / Neutral / Alert
- Confidence score computation
- Threshold logic

## 5. Output
- Market signal object (Phase5 で使用)
- Storage rules for ai_outputs / market_signals

