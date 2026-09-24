/** "Venessa Gilbride" → "VG" — used for monogram placeholders until headshots arrive. */
export function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}
