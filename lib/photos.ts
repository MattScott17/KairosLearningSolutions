// Real Kairos photos (all families have signed photo releases). Most come from the photo
// library in public/images/library (see docs/redesign/photo-library.md for the full list).
// Pages reference photos by role, so swapping a picture is a one-line change here.

export type Photo = { src: string; alt: string; /** CSS object-position, to keep faces in the crop. */ position?: string };

const p = (src: string, alt: string): Photo => ({ src, alt });
const lib = (file: string, alt: string): Photo => p(`/images/library/${file}`, alt);

export const photos = {
  studentsLearning: lib("pxl-20250917-200019803.jpg", "Students working on laptops in the main Kairos classroom"),
  smallGroup: lib("pxl-20250929-162713766.jpg", "Students working at laptops around the classroom tables"),
  craftProject: lib("img-4840.jpg", "An early learner smiling beside the pattern-block design she made"),
  presenting: lib("pxl-20250922-172151783.jpg", "A student holding up the name plaque he designed and 3D printed"),
  outdoors: p("/images/photo-5.jpg", "Kairos students enjoying an outdoor picnic together"),
  readingTogether: lib("img-3659.jpg", "A teacher reading a picture book with two young students"),
  homework: lib("img-3385.jpg", "Students reading and writing at the long classroom tables"),
  threeDPrinting: lib("pxl-20250915-180157921.jpg", "Two students at the 3D printer with the models they printed"),
  cooking: lib("img-0945.jpg", "A student cooking pancakes on the griddle during a cooking class"),
  handprints: lib("img-0929.jpg", "A young student pressing an orange handprint onto paper"),
  circleTime: lib("img-3593.jpg", "Young children holding up colored blocks during a Spanish colors lesson"),
  teamwork: lib("pxl-20250912-161414960.jpg", "Students passing a hula hoop around a circle in a team-building game"),
  staff: lib("img-3341.jpg", "Kairos staff together at the front desk"),
  craftTable: lib("img-9490.jpg", "Students gluing paper shapes at a table in front of the rainbow mural"),
  rollerCoaster: lib("img-3343.jpg", "A student holding up her paper roller-coaster project"),
  planting: lib("img-3527.jpg", "Planting seeds in a labeled seedling tray"),
  gym: lib("img-4731.jpg", "A student hanging from gymnastic rings at the gym"),
  candles: lib("img-5443.jpg", "A student holding the candles he dipped himself"),
  collage: lib("img-3641.jpg", "Students making torn-paper tree collages around a craft table"),
};

export const heroPhotos = {
  main: photos.craftTable,
  secondary: photos.presenting,
};

/** The one feature photo on each interior page. */
export const pagePhotos = {
  about: photos.staff,
  apex: photos.threeDPrinting,
  earlyLearners: photos.circleTime,
  summer: { ...photos.outdoors, position: "30% 70%" } as Photo,
  fallClasses: photos.collage,
  conceptAGuide: photos.handprints,
};

/** Photo strip and the photo-led concepts (B and D). */
export const galleryPhotos: Photo[] = [
  photos.craftTable,
  photos.threeDPrinting,
  photos.handprints,
  photos.readingTogether,
  photos.cooking,
  photos.teamwork,
  photos.circleTime,
  photos.rollerCoaster,
  photos.planting,
  photos.gym,
  photos.candles,
  photos.collage,
];

export type HeroVideo = { mp4: string; webm?: string };

/** Concept D's looping hero clip. Undefined until the encoded files are in /public/video. */
export const heroVideo: HeroVideo | undefined = undefined;

/** Photo shown beside each row of the programs-and-prices list, keyed by the row's link. */
export const programPhotos: Record<string, Photo> = {
  "/services/private-tutoring": photos.readingTogether,
  "/services/homeschool-support": photos.studentsLearning,
  "/early-learners": photos.craftProject,
  "/apex": photos.threeDPrinting,
  "/fall-classes": photos.collage,
};
