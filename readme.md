# `local-db-storage`

> `IndexedDB` wrapper that mimics `localStorage` API

[![Gzipped Size](https://img.shields.io/bundlephobia/minzip/local-db-storage)](https://bundlephobia.com/result?p=local-db-storage)
[![Build Status](https://img.shields.io/github/actions/workflow/status/astoilkov/local-db-storage/main.yml?branch=main)](https://github.com/astoilkov/local-db-storage/actions/workflows/main.yml)

## Install

```bash
npm install local-db-storage
```

## Why

- **Simple.** `localStorage` like API, without the complications of `IndexedDB`.
- **Capacity.** `IndexedDB` can store hundred of megabytes to gigabytes of data. `localStorage` limit is around 5-10MB.
- **Performance.** `IndexedDB` is async and doesn't block the UI. `IndexedDB` can store objects without serialization which shaves off the time to do `JSON.parse()` and `JSON.stringify()` that's needed when working with `localStorage`.
- **No good alternatives.** The most popular library [`localForage`](https://github.com/localForage/localForage) (25k stars) is complex and unmaintained.
- **Availability.** `IndexedDB` is available both in Web Worker and Service Worker, `localStorage` is not. You can write data in those places and then access it in the main thread.
- **Maintenance.** I've been consistently maintaining many open-source libraries including [`use-local-storage-state`](https://github.com/astoilkov/use-local-storage-state) with ~500k downloaders per month.

## Usage

```ts
import dbStorage from 'local-db-storage'

async function addTodo(todo): Promise<void> {
    await dbStorage.setItem(todo.id, todo)
}

async function getTodo(id: string): Promise<Todo> {
    await dbStorage.getItem<Todo>(id)
}
```

## API

#### `getItem<T>(key: string): Promise<T>`

Like `localStorage.getItem()` but async.

#### `setItem(key: string, value: any): Promise<void>`

Like `localStorage.setItem()` but async.

_Note:_ It supports non-primitive values (ex: objects). It also supports circular references.

#### `removeItem(key: string): Promise<void>`

Like `localStorage.removeItem()` but async.

#### `clear(): Promise<void>`

Like `localStorage.clear()` but async.

#### `DBStorage(name: string)`

Creates a new `DBStorage` instance.

```ts
import { DBStorage } from 'local-db-storage'

const dbStorage = new DBStorage('my-custom-db-storage')

await dbStorage.setItem('initial', 'hello world')
```

## Related

- [`use-db`](https://github.com/astoilkov/use-db) — React hook for `IndexedDB` that uses this library and mimics `setState` API.
- [`use-local-storage-state`](https://github.com/astoilkov/use-local-storage-state) — React hook that persists data in `localStorage`.
- [`use-session-storage-state`](https://github.com/astoilkov/use-session-storage-state) — React hook that persists data in `sessionStorage`.
