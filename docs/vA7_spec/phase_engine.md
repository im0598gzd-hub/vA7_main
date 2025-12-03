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

---

# Signal Generation I/O Specification (vA7)

## Input Format (to Phase Engine)
- Normalized feature vector (array of numbers)
- Market metadata (timestamp, source)
- Previous signal (optional)
- System context (AI memory, decay factors)

## Output Format (from Phase Engine)
- phase: "bull" | "bear" | "neutral" | "alert"
- confidence: number (0.0 – 1.0)
- explanation: string (Phase5 で GPT が生成)
- timestamp: ISO8601 string
- raw_vector: (optional) debug用の特徴量ベクトル

---

# Write Specification for market_signals (vA7)

## Insert Conditions
- A new signal is generated from the Phase Engine
- The new phase differs from the previous phase, or
- Confidence score exceeds a defined threshold (Phase5で設定)

## Write Target (market_signals table)
- id: auto
- created_at: timestamp (API側で生成)
- phase: string
- confidence: number
- explanation: string
- raw_vector: json (optional)
- source: "vA7"

## Notes
- Previous signalはai_outputsから取得可能
- 書き込みは必ずserver.ts内の専用関数経由で行う
- DELETEは禁止（vA6不可侵ルール継承）
