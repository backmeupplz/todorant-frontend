export function setFavIcon(dark: Boolean) {
  const icons = [
    {
      rel: 'apple-touch-icon',
      sizes: '57x57',
      href: '/favicon/apple-icon-57x57.png'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '60x60',
      href: '/favicon/apple-icon-60x60.png'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '72x72',
      href: '/favicon/apple-icon-72x72.png'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '76x76',
      href: '/favicon/apple-icon-76x76.png'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '114x114',
      href: '/favicon/apple-icon-114x114.png'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '120x120',
      href: '/favicon/apple-icon-120x120.png'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '144x144',
      href: '/favicon/apple-icon-144x144.png'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '152x152',
      href: '/favicon/apple-icon-152x152.png'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/favicon/apple-icon-180x180.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '192x192',
      href: '/favicon/android-icon-192x192.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon/favicon-32x32.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '96x96',
      href: '/favicon/favicon-96x96.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon/favicon-16x16.png'
    }
  ]

  for (const icon of icons) {
    const link: any = document.querySelector(
      `link[rel*='${icon.rel}'][sizes*='${icon.sizes}']`
    )
    link.rel = icon.rel
    link.href = dark ? icon.href.replace('favicon', 'favicon-dark') : icon.href
  }

  const manifestLink: any = document.querySelector("link[rel*='manifest']")
  manifestLink.href = dark
    ? '/favicon-dark/manifest.json'
    : '/favicon/manifest.json'

  const meta: any = document.querySelector(
    "meta[name*='msapplication-TileImage']"
  )
  meta.content = dark
    ? '/favicon-dark/ms-icon-144x144.png'
    : '/favicon/ms-icon-144x144.png'
}
