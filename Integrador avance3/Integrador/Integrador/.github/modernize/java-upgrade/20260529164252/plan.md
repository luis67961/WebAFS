# Upgrade Plan: Integrador (20260529164252)

- **Generated**: 2026-05-29 16:42 UTC
- **HEAD Branch**: N/A
- **HEAD Commit ID**: N/A

## Available Tools

**JDKs**
- JDK 21.0.6: C:\Program Files\Java\jdk-21\bin (required by steps 1, 3, 5)
- JDK 25.0.1: C:\Program Files\Java\jdk-25\bin (available, not used)
- JDK 17: not available (baseline will be skipped)

**Build Tools**
- Maven 3.9.15: C:\Users\david\Downloads\apache-maven-3.9.15-bin\apache-maven-3.9.15\bin
- Maven Wrapper: 3.9.15 (no upgrade required for Java 21)

## Guidelines

> Note: You can add any specific guidelines or constraints for the upgrade process here if needed, bullet points are preferred.

## Options

- Working branch: appmod/java-upgrade-20260529164252
- Run tests before and after the upgrade: true

## Upgrade Goals

- Upgrade Java runtime from 17 to 21

## Technology Stack

| Technology/Dependency | Current | Min Compatible | Why Incompatible |
| --------------------- | ------- | -------------- | ---------------- |
| Java | 17 | 21 | User requested latest LTS runtime upgrade |
| Spring Boot | 3.3.0 | 3.3.0 | Current Spring Boot version supports Java 21 |
| Maven Wrapper | 3.9.15 | 3.9.15 | Compatible with Java 21 |
| maven-compiler-plugin | managed | 3.11+ recommended | Recommended for Java 21 compatibility |

## Derived Upgrades

- Java 21 is required by the user request and is available on the host.
- Maven 3.9.15 is already present and compatible with Java 21; wrapper upgrade is not required.
- No Spring Boot version upgrade is required because 3.3.0 supports Java 21.

## Impact Analysis

### Dependency Changes

| File | Dependency | Current | Action | Target | Reason |
|------|------------|---------|--------|--------|--------|
| pom.xml | java.version property | 17 | upgrade | 21 | Align project runtime with target JDK |
| pom.xml | maven-compiler-plugin configuration | source/target 17 | upgrade | source/target 21 | Compile against Java 21 language level |

### Source Code Changes

| File | Location | Current | Required Change | Reason |
|------|----------|---------|----------------|--------|
| pom.xml | build/plugins/maven-compiler-plugin | `<source>17</source><target>17</target>` | Update to `21` | Required for Java 21 compilation |
| pom.xml | properties/java.version | `17` | Update to `21` | Ensure Spring Boot and other plugins use Java 21 target |

### Configuration Changes

- None beyond `pom.xml` property and compiler configuration update.

### CI/CD Changes

- No CI/CD configuration files were detected in the project root requiring explicit Java version updates.

### Risks & Warnings

- **Baseline skipped**: JDK 17 is not installed on the host, so verifying the pre-upgrade baseline will be skipped. This means regression assessment will rely on current project behavior and post-upgrade validation.
- **Runtime-only issues**: No explicit `sun.*` or JDK-internal imports were detected in source code search; however, JDK 21 may still expose runtime incompatibilities in third-party dependencies. The final validation step must run the full test suite.

## Upgrade Steps

- Step 1: Setup Environment
  - Rationale: Confirm Java 21 and Maven are available on the host before changing the project.
  - Changes to Make: No code changes; verify required runtime/build tools are present.
  - Verification: `mvnw -v` and Java 21 validation via JDK path exists

- Step 2: Setup Baseline
  - Rationale: Establish whether the current project compiles and tests under the existing runtime; skip if base JDK unavailable.
  - Changes to Make: None if JDK 17 is unavailable.
  - Verification: skipped because JDK 17 is not installed on host

- Step 3: Upgrade project to Java 21
  - Rationale: Apply the runtime upgrade in source and build configuration.
  - Changes to Make: Update `pom.xml` `java.version` property and `maven-compiler-plugin` `source`/`target` values to 21.
  - Verification: `mvnw clean test-compile -q` using Java 21

- Step 4: CVE Validation & Fix
  - Rationale: Scan direct dependencies for known vulnerabilities and resolve any findings after runtime upgrade.
  - Changes to Make: Run CVE scan, upgrade patched dependency versions if needed, and recompile.
  - Verification: `mvnw clean test-compile -q` and CVE rescan

- Step 5: Final Validation
  - Rationale: Ensure the upgraded project compiles and all tests pass under Java 21.
  - Changes to Make: Fix any compilation or test failures introduced by the upgrade.
  - Verification: `mvnw clean test -q` using Java 21
