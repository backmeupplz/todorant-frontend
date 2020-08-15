declare const firebase: any

export function logEvent(eventName: string, meta?: object) {
  try {
    firebase.analytics().logEvent(eventName, meta)
  } catch (err) {
    // Do nothing
  }
}

export function setUserProperty(name: string, value: any) {
  const obj = {} as { [index: string]: string }
  obj[name] = value
  try {
    firebase.analytics().setUserProperties(obj)
  } catch (err) {
    // Do nothing
  }
}
