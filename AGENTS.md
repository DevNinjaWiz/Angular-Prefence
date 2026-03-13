# agent.md

# Angular Development Guidelines

## 1. Function Naming Convention

Functions used in the HTML template **must follow the `on...` naming
convention**.

### Example

``` ts
onClick()
onNext()
onFinish()
onSubmit()
```

These functions represent **UI event handlers** triggered from the
template.

### Private Functions

Functions **not used directly in HTML** must be declared as **private
methods** inside the component.

``` ts
private calculateTotal() {}
private loadUserData() {}
private validateForm() {}
```

This improves:

-   Code readability
-   Clear separation between **UI actions** and **internal logic**

------------------------------------------------------------------------

# RxJS Coding Style (Watcher Pattern)

When implementing logic with **RxJS**, the **Observer / Watcher pattern
is preferred**.

Instead of putting logic inside click handlers, UI actions should **emit
events to Subjects**, and **watchers handle the business logic**.

## Preferred Pattern

### Subject Trigger

``` ts
private toNext = new Subject<void>();
```

### ngOnInit Watcher Setup

``` ts
readonly steps = contentChildren(StepComponent);
readonly steps$ = toObservable(this.steps);

ngOnInit() {
  this.initWatcher();
}

private initWatcher() {
  const watchToNextStep = this.toNext.pipe(
    // business logic here
  );

  merge(watchToNextStep)
    .pipe(takeUntil(this.destroy$))
    .subscribe();
}
```

### Preferred Watcher Declaration Style

If there are multiple watcher streams, always declare a private
`initWatcher()` method.

`ngOnInit()` or `ngAfterViewInit()` should only call `this.initWatcher()`.

Place all watcher `const` declarations, `merge(...)`, and `.subscribe()`
inside `initWatcher()`.

Do not split each watcher into separate private `watch...()` methods unless
there is a strong reuse reason.

If `toObservable()` or `toSignal()` is needed, declare it like a normal
class-level readonly variable above the lifecycle methods.

Example structure:

``` ts
class SampleComponent {
  readonly state = signal(false);
  readonly steps = contentChildren(StepComponent);
  readonly steps$ = toObservable(this.steps);
  readonly selectedStep = toSignal(this.selectedStep$);

  ngOnInit() {
    this.initWatcher();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

For observables, the variable name should always end with `$`.

Example:

``` ts
readonly steps$ = toObservable(this.steps);
```

This allows the observable or signal conversion to be reused across the
component without repeatedly calling `toObservable()` or `toSignal()`
inside functions.

Preferred:

``` ts
ngOnInit() {
  this.initWatcher();
}

private initWatcher() {
  const watchNext = this.toNext.pipe(
    // business logic here
  );

  const watchPrevious = this.toPrevious.pipe(
    // business logic here
  );

  merge(
    watchNext,
    watchPrevious
  )
    .pipe(takeUntil(this.destroy$))
    .subscribe();
}
```

### UI Action

``` ts
onNextStep() {
  this.toNext.next();
}
```

### Important Rule

**Do NOT place business logic inside `on...` methods.**

Event handlers should **only emit events**.

All logic should be implemented inside **watchers**.

------------------------------------------------------------------------

# Signal Usage Rules (Angular Modern Best Practice)

Angular **Signals should be the default state management mechanism**.

For any state or variable that is held and used as **local state**,
Angular **signal** is the preferred way to model it.

Signals should also be the preferred choice for **reactivity programming**
when the use case is primarily local state synchronization or derived state.

If the action flow is mainly driven by UI events such as `onClick`,
`onChange`, or `onType`, then **RxJS can be used** for that action flow.

If the problem is primarily about holding, deriving, synchronizing, or
consuming local state, **prefer signals first** before RxJS.

Use signals for:

-   Component state
-   Inputs
-   Outputs
-   Derived values
-   Local state synchronization
-   Local reactive state consumption

### Example

``` ts
count = signal(0);

doubleCount = computed(() => this.count() * 2);
```

------------------------------------------------------------------------

## Signal Mutation Rule

**Signals must NOT be mutated inside UI handlers (`on...` methods).**

Instead, update signals **inside watcher pipelines**.

If a signal-based Angular API is more appropriate for the scenario, prefer
that Angular signal approach.

### Incorrect

``` ts
onClick() {
  this.count.set(this.count() + 1);
}
```

### Correct

``` ts
onClick() {
  this.increment$.next();
}

private increment$ = new Subject<void>();

ngOnInit() {
  this.initWatcher();
}

private initWatcher() {
  const watchIncrement = this.increment$.pipe(
    tap(() => this.count.update(v => v + 1))
  );

  merge(watchIncrement)
    .pipe(takeUntil(this.destroy$))
    .subscribe();
}
```

------------------------------------------------------------------------

# Avoid Using Angular `effect()`

The use of Angular **`effect()` should be avoided by default**.

Reasons:

-   Effects can introduce **implicit reactive side effects**
-   Harder to trace execution flow
-   Watcher pattern using **RxJS is preferred for clarity and
    debugging**

## Rule

If the implementation **requires `effect()`**, the agent **must ask the
user for permission before using it**.

Do not introduce `effect()` automatically.

------------------------------------------------------------------------

# Watcher Subscription Strategy

All watchers should be **initialized through `initWatcher()`**.

`ngOnInit()` should stay **short and concise** by only calling
`this.initWatcher()` whenever possible.

If a component requires a later lifecycle hook such as
`ngAfterViewInit()` or `ngAfterContentInit()`, that hook should also stay
short and only call `this.initWatcher()`.

Multiple watchers should be **merged into a single subscription**.

The preferred style is:

-   In `ngOnInit()`, `ngAfterViewInit()`, or `ngAfterContentInit()`, call
    `this.initWatcher()`
-   Declare each watcher as a `const` inside `initWatcher()`
-   Declare `toObservable()` / `toSignal()` conversions as class-level
    readonly variables
-   Ensure observable variable names end with `$`
-   Use `merge(...)`
-   Use `.pipe(takeUntil(this.destroy$))`
-   Use a single `.subscribe()`

### Example

``` ts
ngOnInit() {
  this.initWatcher();
}

private initWatcher() {

  const watcher1 = this.action1$.pipe(...);

  const watcher2 = this.action2$.pipe(...);

  merge(
    watcher1,
    watcher2
  )
  .pipe(takeUntil(this.destroy$))
  .subscribe();

}
```

------------------------------------------------------------------------

# Unsubscribe Pattern

Always use a **destroy notifier**.

``` ts
private destroy$ = new Subject<void>();

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

This ensures all watchers unsubscribe safely.

------------------------------------------------------------------------

# Angular Feature Requirements

The following **modern Angular features must be used whenever
possible**.

## Standalone Components

``` ts
@Component({
  standalone: true
})
```

------------------------------------------------------------------------

## Signals

Use:

-   `signal`
-   `computed`
-   Other Angular signal APIs when appropriate

Prefer signals for:

-   Local state
-   Derived state
-   Reactive state consumption
-   Synchronizing state inside a component

RxJS is still appropriate when the flow is mainly driven by UI action
events such as button clicks, typing, submit flows, or explicit event
streams.

Because Angular evolves quickly, always check the official Angular
documentation at `https://angular.dev/` when in doubt.

If a newer Angular signal API is more appropriate for the use case,
prefer using it based on the official documentation.

Avoid:

-   `effect` (unless user approval is given)

------------------------------------------------------------------------

## Signal Inputs / Outputs

Prefer modern Angular APIs for component communication.

------------------------------------------------------------------------

## New Control Flow Syntax

Use modern Angular control flow:

``` html
@if (isLoading()) {
  <spinner />
}

@for (item of items(); track item.id) {
  <item-card [item]="item" />
}
```

Avoid legacy syntax:

    *ngIf
    *ngFor

------------------------------------------------------------------------

# Utility Function Placement

If a TypeScript file contains **utility logic** that does not need access
to component instance members, it can be declared **outside** the Angular
class.

Example:

``` ts
class SampleComponent {}

const sliceIndex = () => {}
```

For these standalone utility helpers, **arrow functions are preferred**.

Use this approach when the function:

-   Does not depend on `this`
-   Is a pure utility/helper
-   Can be reused more clearly outside the class body

------------------------------------------------------------------------

# Validation and Command Execution

Do **not** run `test`, `lint`, or `build` commands by default for code
changes.

Unless the user explicitly requests validation, there is **no need** to run
tests, lint, or build.

The default expectation is:

-   Make the code change
-   Verify by code inspection when appropriate
-   Do not run extra validation commands unless requested by the user

------------------------------------------------------------------------

# Summary

The coding style enforced by this agent prioritizes:

-   **Modern Angular patterns**
-   **Reactive event flow**
-   **Observer / Watcher architecture**
-   **Signal-based state management**
-   **Clear separation between UI events and business logic**

Key principles:

-   UI handlers → **emit events**
-   Watchers → **contain business logic**
-   Signals → **manage state**
-   `merge()` → **combine watchers**
-   `takeUntil()` → **handle unsubscription**
