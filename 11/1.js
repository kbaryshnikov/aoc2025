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

const you = devices.you;
const out = devices.out;
const stack = [you];
let pathesCount = 0;
while (stack.length) {
  const links = stack.pop();
  for (const link of links) {
    if (link === out) {
      pathesCount++;
    } else {
      stack.push(link);
    }
  }
}
console.log(pathesCount);
