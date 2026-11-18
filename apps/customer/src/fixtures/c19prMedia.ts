/**
 * C19-P-R Replace Item Photo — Fixture
 *
 * Authoritative Figma: Node 382:1546 (EN) & Node 980:9692 (ES)
 * Flow Context: W02 Service Discovery & Intake / C19-P-R
 */

export interface C19PRSelectedItem {
  id: string;
  titleKey: "photoTitle";
  subtitleKey: "photoSub";
  imageKey: "sofa";
  testID: string;
}

export const C19PR_SELECTED_ITEM: C19PRSelectedItem = {
  id: "sofa-existing",
  titleKey: "photoTitle",
  subtitleKey: "photoSub",
  imageKey: "sofa",
  testID: "c19pr-photo-sofa-existing",
};
