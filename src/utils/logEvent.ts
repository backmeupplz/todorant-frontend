let Countly: any

export function logEvent(eventName: string, meta?: object) {
  try {
    Countly.q.push([
      'add_event',
      {
        key: eventName,
        segmentation: meta,
      },
    ])
  } catch (err) {
    // Do nothing
  }
}

export function setUserProperty(name: string, value: any) {
  try {
    Countly.q.push(['userData.set', name, value])
    Countly.q.push(['userData.save'])
  } catch (err) {
    // Do nothing
  }
}
