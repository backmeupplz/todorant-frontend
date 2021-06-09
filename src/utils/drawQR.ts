import QRCodeStyling from 'qr-code-styling'

export function drawQR(id: string, data: string) {
  const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    data,
    image: '/img/todorant-squircle.webp',
    dotsOptions: {
      type: 'dots',
      gradient: {
        type: 'linear',
        colorStops: [
          { offset: 0, color: '#F36427' },
          { offset: 1, color: '#3C66F5' },
        ],
      },
    },
    cornersSquareOptions: {
      type: 'extra-rounded',
      gradient: {
        type: 'linear',
        colorStops: [
          { offset: 0, color: '#F36427' },
          { offset: 1, color: '#3C66F5' },
        ],
      },
    },
    cornersDotOptions: {
      type: 'dot',
      gradient: {
        type: 'linear',
        colorStops: [
          { offset: 0, color: '#F36427' },
          { offset: 1, color: '#3C66F5' },
        ],
      },
    },
    backgroundOptions: {
      color: 'transparent',
    },
    imageOptions: {
      hideBackgroundDots: false,
      crossOrigin: 'anonymous',
    },
  })
  const htmlElement = document.getElementById(id)
  if (htmlElement) {
    qrCode.append(htmlElement)
  } else {
    console.error('Html element for QR code was not found')
  }
  return qrCode
}
