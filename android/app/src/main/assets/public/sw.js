/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-b1bafff1'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "ea912c88b5937a96270af5476f5c76e5"
  }, {
    "url": "pwa-512x512.png",
    "revision": "8e3a0f263e27558325a91a2eb34e3b92"
  }, {
    "url": "pwa-192x192.png",
    "revision": "e9e0e93cbebacb171acacb7c492e5c8f"
  }, {
    "url": "index.html",
    "revision": "997b4e1657d3067c5e690820cbf64593"
  }, {
    "url": "icon.svg",
    "revision": "402a322d27617dd31c480c9a33498a7c"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "1283d328b314c6ea1e55878efdce4998"
  }, {
    "url": "assets/index-DcJhopoQ.js",
    "revision": null
  }, {
    "url": "assets/index-D5JhhsLI.css",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "1283d328b314c6ea1e55878efdce4998"
  }, {
    "url": "icon.svg",
    "revision": "402a322d27617dd31c480c9a33498a7c"
  }, {
    "url": "pwa-192x192.png",
    "revision": "e9e0e93cbebacb171acacb7c492e5c8f"
  }, {
    "url": "pwa-512x512.png",
    "revision": "8e3a0f263e27558325a91a2eb34e3b92"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "ea912c88b5937a96270af5476f5c76e5"
  }, {
    "url": "robots.txt",
    "revision": "834d725e4e4cc0a517b23d46fd1a555f"
  }, {
    "url": "sitemap.xml",
    "revision": "76a1ca1c78c5632185f758f6ad200407"
  }, {
    "url": "manifest.webmanifest",
    "revision": "13714b2e4f84936796ca8205294944b7"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "google-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "gstatic-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/images\.unsplash\.com\/.*/i, new workbox.StaleWhileRevalidate({
    "cacheName": "unsplash-images-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 30,
      maxAgeSeconds: 2592000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
