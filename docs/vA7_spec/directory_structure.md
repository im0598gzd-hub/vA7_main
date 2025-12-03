# vA7 Directory & Module Structure (Skeleton)

This document defines the minimal file and function skeleton required for Phase 5 implementation.
Only structural placeholders. Actual logic is implemented inside server.ts following the
chapter-based architecture rules.

---

## 1. Directories

project_root/
  ├── server.ts
  ├── openapi.yaml
  ├── package.json
  ├── docs/
  │     └── vA7_spec/
  │            ├── data_model.md
  │            ├── phase_engine.md
  │            ├── phase5_checklist.md
  │            └── directory_structure.md
  └── backups/

---

## 2. server.ts Internal Structure (Chapter System)

[1] Init  
    • Load environment variables  
    • Initialize Neon client  
    • Initialize helper utilities  

[2] Auth  
    • ui_origin validation  

[3] Middleware  
    • JSON parsing  
    • Error handlers  

[4] GET Endpoints  
    • /health  
    • /snapshot/latest  
    • /ai_outputs  
    • /market_signals  

[5] Export Logic  
    • Shared helper functions (non-CRUD)  
    • Phase Engine shared utilities (pure logic only)  

[6] POST / PATCH / DELETE  
    • POST /phase-engine → main Phase5 endpoint  
      - loadInputs()  
      - normalizeInputs()  
      - buildFeatureVector()  
      - classifyPhase()  
      - computeConfidence()  
      - writeAiOutputs()  
      - writeMarketSignals()  

[7] Listen  
    • Start server (Render)

---

## 3. Phase Engine Function Skeleton (to be implemented in server.ts)

function loadInputs()  
function normalizeInputs()  
function buildFeatureVector()  
function classifyPhase()  
function computeConfidence()  
function writeAiOutputs()  
function writeMarketSignals()  

(Actual SQL and logic filled in during Phase 5)

---

## 4. Data Flow Summary

Neon → loadInputs()  
 ↓  
normalizeInputs()  
 ↓  
buildFeatureVector()  
 ↓  
Phase classification (classifyPhase)  
 ↓  
Confidence evaluation  
 ↓  
Write: ai_outputs  
 ↓  
Conditional Write: market_signals  
 ↓  
Return JSON response

---

## 5. Notes

• DELETE is forbidden (vA6 rule inherited)  
• All insert operations must pass through dedicated functions  
• No business logic in GET endpoints  
• Phase Engine must remain deterministic  

