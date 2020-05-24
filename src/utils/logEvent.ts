declare const firebase: any

export function logEvent(eventName: string, meta?: object) {
  firebase.analytics().logEvent(eventName, meta)
}

export function setUserProperty(name: string, value: any) {
  const obj = {} as { [index: string]: string }
  obj[name] = value
  firebase.analytics().setUserProperties(obj)
}
