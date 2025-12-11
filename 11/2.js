import { readInput } from '../input.js';

const devices = {};
const findOrAddDevice = (deviceName) => (devices[deviceName] ??= Object.assign(new Set(), { deviceName }));
const addDeviceLink = (deviceName, links) => {
  const device = findOrAddDevice(deviceName);
  for (const link of links) {
    device.add(findOrAddDevice(link));
  }
};

readInput((s) => {
  const [key, values] = s.split(': ', 2);
  addDeviceLink(key, values.split(' '));
});

const svr = devices.svr;
const fft = devices.fft;
const dac = devices.dac;
const out = devices.out;

const cache = new Map();
function walk(dev, visited) {
  const key = `${dev.deviceName}${visited}`;
  let result = cache.get(key);
  if (result === undefined) {
    result = walk_(dev, visited);
    cache.set(key, result);
  }
  return result;
}

function walk_(dev, visited) {
  if (dev === out) {
    return visited === 0b11;
  }
  if (dev === fft) {
    visited |= 0b01;
  } else if (dev === dac) {
    visited |= 0b10;
  }
  let count = 0;
  for (const link of dev) {
    count += walk(link, visited);
  }
  return count;
};

const result = walk(svr, 0);
console.log(result);
