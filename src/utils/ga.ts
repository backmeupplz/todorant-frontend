declare const gtag: Function

export function reportGA(eventName: string, meta?: object) {
  console.log('Reporting', eventName, meta)
  gtag('event', eventName, meta)
}
