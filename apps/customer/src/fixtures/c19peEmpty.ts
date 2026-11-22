/**
 * C19-P-E Empty Media State — Fixture
 *
 * Authoritative Figma: Node 382:1644 (EN) & Node 980:9822 (ES)
 * Flow Context: W02 Service Discovery & Intake / C19-P-E
 */

export interface C19PEEmptyConfig {
	hasPhotos: boolean;
	totalPhotosAttached: number;
}

export const C19PE_EMPTY_CONFIG: C19PEEmptyConfig = {
	hasPhotos: false,
	totalPhotosAttached: 0,
};
