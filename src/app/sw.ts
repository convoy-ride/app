import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { BackgroundSyncQueue, Serwist } from "serwist";

// #https://serwist.pages.dev/docs/next/getting-started
// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const __QUEUE_NAME__ = "serwist-background-sync-queue";

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache
});

const queue = new BackgroundSyncQueue(__QUEUE_NAME__);

async function bgSync(ev: FetchEvent) {
  try {
    const response = await fetch(ev.request.clone());
    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    await queue.pushRequest({ request: ev.request });
    return Response.error();
  }
}

// Add background sync to requests matching a specific pattern
self.addEventListener("fetch", (ev) => {
  if (ev.request.method !== "POST") return;
  ev.respondWith(bgSync(ev));
});

serwist.addEventListeners();
