// Real Kairos photos (all families have signed photo releases).
// Pages reference photos by role, so swapping a picture is a one-line change here.

export type Photo = { src: string; alt: string };

const p = (src: string, alt: string): Photo => ({ src, alt });

export const photos = {
  studentsLearning: p("/images/photo-1.jpg", "Students learning at Kairos Learning Solutions"),
  smallGroup: p("/images/photo-2.jpg", "Kairos students in a small-group lesson"),
  craftProject: p("/images/photo-3.jpg", "Two Kairos students working on a craft project together"),
  presenting: p("/images/photo-4.jpg", "A Kairos student presenting a hands-on project she built"),
  outdoors: p("/images/photo-5.jpg", "Kairos students enjoying an outdoor picnic together"),
};

export const heroPhotos = {
  main: photos.studentsLearning,
  secondary: photos.presenting,
};

/** Gallery set used by the photo-led concepts (B and D). */
export const galleryPhotos: Photo[] = [
  photos.smallGroup,
  photos.craftProject,
  photos.presenting,
  photos.outdoors,
  photos.studentsLearning,
];

/** Concept D's looping hero clip. Undefined until the encoded files are in /public/video. */
export const heroVideo: { mp4: string; webm?: string } | undefined = undefined;
