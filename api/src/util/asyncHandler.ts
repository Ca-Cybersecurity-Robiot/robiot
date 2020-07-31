/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Prend une fonction en paramètre
 * et l'execute dans une promise
 * @param fn
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const asyncHandler = (fn: any) =>
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    function asyncHandlerWrap(...args: any[]) {
        const fnReturn = fn(...args);
        const next = args[args.length - 1];
        return Promise.resolve(fnReturn).catch(next);
    };

export default asyncHandler;
