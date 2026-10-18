# Changelog

All notable changes to the **letscalculate.in** platform will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-10-18

### 📱 Mobile Alignment & Compatibility Patch (v1.0.0)

#### Issue Addressed
- Header and body sections were misaligned on mobile viewports (e.g., Chrome, Samsung Internet, and Safari mobile).
- Logo, navigation icons, and body text were experiencing horizontal clipping/shifting due to header overflow beyond 360px–412px viewports.

#### Fix Implemented
- **Responsive Scaling with Meta Viewport**:
  Updated `meta name="viewport"` to `width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover`.
- **Modern Flexbox Layout**:
  Applied modern flexbox with responsive container constraints (`width: 100% !important; max-width: 100vw !important; overflow-x: hidden !important;`) across document, header, and hero containers.
- **Legacy Android Flexbox Fallbacks**:
  Added legacy flexbox vendor prefixes (`-webkit-box`, `-webkit-flex`, `-moz-box`, `-ms-flexbox`) for older Android and WebKit browsers.
- **Safe Block Fallback**:
  Added `@supports not (display: flex)` graceful fallback to block layout with centered alignment for legacy browsers.
- **Versioned CDN-Ready Minified Asset**:
  Generated and deployed `styles/mobile-alignment.v1.min.css` with versioned link (`?v=1.0.0`).
- **Zero-Layout-Shift Fallback**:
  Inlined the patch into the production bundle `index.html` alongside the versioned asset link.

#### Traceability & Standards
- **Branch Naming Convention**: `fix/mobile-alignment-v1`
- **Release Tagging Convention**: `v1.0.0-mobile-patch`
- **Commit Message Template**:
  ```git
  fix(mobile): patch header and body alignment, responsive scaling and fallbacks (v1.0.0)
  ```
- **Rollback Procedure**:
  To roll back, change the stylesheet link in `<head>` to the previous version (or remove `mobile-alignment.v1.min.css` reference) and run `node build-bundle.js`.
