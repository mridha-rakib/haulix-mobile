/**
 * HAULIX Customer Mobile App — Phase 03.23
 * C20-V Incomplete Access Validation Fixtures
 *
 * Authoritative Figma:
 *   - English: Node 382:1822 (430 × 1103 px)
 *   - Spanish: Node 980:10048 (430 × 1103 px)
 *
 * Scope: Incomplete access demonstration state.
 * Blocks progression to quotation until safety & pickup details are confirmed.
 */

export interface C20VMissingRow {
  id: string;
  label: string;
  labelEs: string;
  value: string;
  valueEs: string;
}

export interface C20VMissingData {
  rows: C20VMissingRow[];
  actionRequired: boolean;
}

export const C20V_DEFAULT_DATA: C20VMissingData = {
  rows: [
    {
      id: "stairs",
      label: "Stairs",
      labelEs: "Escaleras",
      value: "Not confirmed",
      valueEs: "Sin confirmar",
    },
    {
      id: "parking",
      label: "Parking",
      labelEs: "Estacionamiento",
      value: "Unknown",
      valueEs: "Desconocido",
    },
    {
      id: "heavy-item",
      label: "Heavy-item access",
      labelEs: "Acceso para objetos pesados",
      value: "Door and hallway clearance unknown",
      valueEs: "Ancho libre de puertas y pasillos desconocido",
    },
  ],
  actionRequired: true,
};
