/**
 * C19-P-F Photo Upload Failure — Fixture
 *
 * Authoritative Figma: Node 382:1590 (EN) & Node 980:9752 (ES)
 * Flow Context: W02 Service Discovery & Intake / C19-P-F
 */

export interface C19PFSavedPhotoItem {
  id: string;
  titleKey: "photoSofaTitle" | "photoMattressTitle" | "photoTableTitle";
  subtitleKey: "photoSub";
  imageKey: "sofa" | "mattresses" | "table";
  testID: string;
}

export const C19PF_SAVED_PHOTOS: C19PFSavedPhotoItem[] = [
  {
    id: "sofa-saved",
    titleKey: "photoSofaTitle",
    subtitleKey: "photoSub",
    imageKey: "sofa",
    testID: "c19pf-photo-sofa",
  },
  {
    id: "mattress-saved",
    titleKey: "photoMattressTitle",
    subtitleKey: "photoSub",
    imageKey: "mattresses",
    testID: "c19pf-photo-mattress",
  },
  {
    id: "table-saved",
    titleKey: "photoTableTitle",
    subtitleKey: "photoSub",
    imageKey: "table",
    testID: "c19pf-photo-table",
  },
];
