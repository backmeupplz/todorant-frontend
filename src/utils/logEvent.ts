export function logEvent(eventName: string, meta?: object) {
  try {
    ;(global as any).Countly.q.push([
      'add_event',
      {
        count: 1,
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
    ;(global as any).Countly.q.push(['userData.set', name, value])
    ;(global as any).Countly.q.push(['userData.save'])
  } catch (err) {
    // Do nothing
  }
}
