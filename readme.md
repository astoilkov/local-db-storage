# `db-storage`

> Tiny wrapper around `IndexedDB` that mimics `localStorage` API

[![Gzipped Size](https://img.shields.io/bundlephobia/minzip/db-storage)](https://bundlephobia.com/result?p=db-storage)
[![Build Status](https://img.shields.io/github/actions/workflow/status/astoilkov/db-storage/main.yml?branch=main)](https://github.com/astoilkov/db-storage/actions/workflows/main.yml)

## Install

```bash
npm install db-storage
```

## Why

- If you want to use IndexedDB but don't want to deal with its complex API.
- If you want to store more data than what `localStorage` supports but still want a simple API.

## Usage

```ts
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

Like `localStorage.setItem()` but async. It supports non-primitive values like objects. It also supports circular references.

#### `removeItem(key: string): Promise<void>`

Like `localStorage.removeItem()` but async.

#### `clear(): Promise<void>`

Like `localStorage.clear()` but async.

## Related

- [`use-local-storage-state`](https://github.com/astoilkov/use-local-storage-state) — React hook that persists data in `localStorage`.
- [`use-session-storage-state`](https://github.com/astoilkov/use-session-storage-state) — React hook that persists data in `sessionStorage`.
