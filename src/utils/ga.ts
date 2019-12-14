declare const gtag: Function

export function reportGA(eventName: string, meta?: object) {
  gtag('event', eventName, meta)
}
