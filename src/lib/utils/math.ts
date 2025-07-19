export const toRadians = (angle: number) => angle * (Math.PI / 180);
export const toDegrees = (radians: number) => radians / (Math.PI / 180);
export const mod = (number: number, divider: number) => ((number % divider) + divider) % divider;