export const TERRAIN = {
  seed: 12345,
  noiseScale: 5,
  octaves: 7,
  persistence: 0.7,
  contrast: 2.2,
  textures: [
    { from: 0, to: 30, name: "water", color: "#4688bc", src: "" },
    { from: 30, to: 40, name: "sand", color: "#ddc38b", src: "" },
    { from: 40, to: 75, name: "grass", color: "#76a45c", src: "" },
    { from: 75, to: 101, name: "stone", color: "#888888", src: "" }
  ]
};
// Set src to a texture path, e.g. "./textures/grass.png".
// Colors are used until texture files are configured.

function random(x, y) {
  let n = Math.imul(x, 374761393) + Math.imul(y, 668265263)
    + Math.imul(TERRAIN.seed, 1442695041);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
}
function lerp(a, b, t) {
  t = t * t * (3 - 2 * t);
  return a + (b - a) * t;
}
function noise(x, y) {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  return lerp(
    lerp(random(ix, iy), random(ix + 1, iy), fx),
    lerp(random(ix, iy + 1), random(ix + 1, iy + 1), fx),
    fy
  );
}
export function getHeight(x, y) {
  let value = 0, amplitude = 1, frequency = 1, total = 0;
  for (let i = 0; i < TERRAIN.octaves; i++) {
    value += noise(x / TERRAIN.noiseScale * frequency,
      y / TERRAIN.noiseScale * frequency) * amplitude;
    total += amplitude;
    amplitude *= TERRAIN.persistence;
    frequency *= 2;
  }
  // Stretch the height distribution so water and mountains appear more often.
  return Math.max(0, Math.min(100, 50 + ((value / total) - 0.5) * 100 * TERRAIN.contrast));
}
export function getBiome(height) {
  return TERRAIN.textures.find(t => height >= t.from && height < t.to)
    ?? TERRAIN.textures[TERRAIN.textures.length - 1];
}
export function paintTile(tile, x, y) {
  const height = getHeight(x, y);
  const biome = getBiome(height);
  tile.dataset.x = x;
  tile.dataset.y = y;
  tile.dataset.height = height.toFixed(2);
  tile.dataset.biome = biome.name;
  tile.style.backgroundColor = biome.color;
  tile.style.backgroundImage = biome.src ? `url("${biome.src}")` : "none";
  tile.style.backgroundSize = "100% 100%";
  tile.style.backgroundRepeat = "no-repeat";
  tile.style.imageRendering = "pixelated";
}
