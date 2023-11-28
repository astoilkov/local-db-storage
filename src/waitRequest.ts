export default async function waitRequest<T>(
    request: IDBRequest,
    errorMessage?: string,
): Promise<T> {
    return new Promise((resolve, reject) => {
        request.addEventListener("success", () => {
            resolve(request.result);
        });
        request.addEventListener("error", () => {
            reject(errorMessage);
        });
    });
}
