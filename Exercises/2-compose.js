"use strict";

const compose = (...fns) => {
  const handlers = [];
  const inner = (x) => {
    let res = x;
    const last = fns.length - 1;
    try {
      for (let i = last; i >= 0; i--) {
        res = fns[i](res);
      }
      return res;
    } catch (error) {
      for (const handler of handlers) {
        handler(error);
      }
      return undefined;
    }
  };
  inner.on = (name, handler) => {
    if (name === "error") handlers.push(handler);
  };
  return inner;
};

module.exports = { compose };
