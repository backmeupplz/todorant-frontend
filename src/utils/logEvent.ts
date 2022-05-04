import { logEventToMicro } from '@/utils/micro'

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
    try {
      logEventToMicro(eventName)
    } catch {
      ;(global as any).Countly.q.push([
        'micro_logging_failed',
        {
          count: 1,
        },
      ])
    }
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
