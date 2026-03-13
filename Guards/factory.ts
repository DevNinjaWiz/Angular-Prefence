export function createCanMatchFactory<T>(
  guardType: Type<T>,
  handler: (guard: T, route: Route, segments: UrlSegment[]) => ...
): CanMatchFn {
  return (route, segments) => handler(inject(guardType), route, segments)
}