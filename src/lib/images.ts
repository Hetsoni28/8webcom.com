// Most content images in Sanity came from the old site and are smaller than the space they fill,
// so re-encoding them at Next's default quality (75) visibly softens them further.
// Use this for those images; large originals (hero slides, page headers) stay at 75.
// Every value used must be listed in next.config `images.qualities`.
export const DETAIL_QUALITY = 90;
