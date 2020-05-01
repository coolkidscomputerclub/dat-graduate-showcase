import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = false;

const SECURITY_HEADERS = {
  'Content-Security-Policy': 'upgrade-insecure-requests',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Xss-Protection': '1; mode=block',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Feature-Policy':
    "accelerometer 'none' ; ambient-light-sensor 'none' ; autoplay 'self' ; camera 'none' ; encrypted-media 'none' ; fullscreen 'self' ; geolocation 'none' ; gyroscope 'none' ; magnetometer 'none' ; microphone 'none' ; midi 'none' ; payment 'self' ; picture-in-picture * ; speaker 'self' ; sync-xhr 'none' ; usb 'none' ; notifications 'self' ; vibrate 'self' ; push 'self' ; vr 'none'",
  'Cache-Control': 'public, max-age=0, must-revalidate',
  'Content-Type': 'text/html; charset=UTF-8',
};

addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event));
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      );
    }

    event.respondWith(new Response('Internal Error', { status: 500 }));
  }
});

async function handleEvent(event) {
  const url = new URL(event.request.url);
  const options = {};

  try {
    if (DEBUG) {
      options.cacheControl = {
        bypassCache: true,
      };
    }

    if (url.pathname.endsWith('/') || url.pathname.endsWith('index.html')) {
      options.cacheControl = {
        bypassCache: true,
      };
    }

    if (
      url.pathname.endsWith('robots.txt') ||
      url.pathname.endsWith('sitemap.xml')
    ) {
      options.cacheControl = {
        edgeTTL: 60 * 60,
      };
    }

    if (url.pathname.includes('/_nuxt/')) {
      options.cacheControl = {
        edgeTTL: 365 * 60 * 60 * 24,
      };
    }

    const response = await getAssetFromKV(event, options);

    modifyHeaders(response);

    return response;
  } catch (e) {
    // if an error is thrown try to serve the asset at 404.html
    if (!DEBUG) {
      try {
        const notFoundResponse = await getAssetFromKV(event, {
          mapRequestToAsset: req =>
            new Request(`${new URL(req.url).origin}/404.html`, req),
        });

        return new Response(notFoundResponse.body, {
          ...notFoundResponse,
          status: 404,
        });
      } catch (e) {} // eslint-disable-line no-empty
    }

    return new Response(e.message || e.toString(), { status: 500 });
  }
}

function modifyHeaders(response) {
  const contentType = response.headers.get('Content-Type');

  if (WORKER_ENV === 'staging') {
    response.headers.set('X-Robots-Tag', 'noindex');
    // TODO: could also remove Fathom script and Coil link here
  }

  if (contentType === 'text/html') {
    Object.entries(SECURITY_HEADERS).forEach(([name, value]) =>
      response.headers.set(name, value),
    );

    return;
  }

  if (contentType === 'text/plain' || contentType === 'application/xml') {
    response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');

    return;
  }

  if (
    contentType === 'text/css' ||
    contentType === 'application/javascript' ||
    contentType === 'application/json'
  ) {
    response.headers.set(
      'Cache-Control',
      `public, max-age=${365 * 60 * 60 * 24}, immutable`,
    );

    return;
  }

  if (contentType.startsWith('image/')) {
    response.headers.set(
      'Cache-Control',
      `public, max-age=${7 * 60 * 60 * 24}`,
    );
  }
}
