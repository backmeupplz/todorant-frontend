declare const analytics: {
  logEvent: Function
}

export function logEvent(eventName: string, meta?: object) {
  analytics.logEvent(eventName, meta)
}
