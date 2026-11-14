import type { FC } from "react";
import {
  type IconProps,
  ServiceApplianceIcon,
  ServiceAssemblyAddonIcon,
  ServiceFurnitureIcon,
  ServiceGarageIcon,
  ServiceJunkIcon,
  ServiceMattressIcon,
  ServiceMovingIcon,
  ServiceStoreIcon,
} from "../components/home/C01Icons";

export interface ServiceCategoryItem {
  id: string;
  name: string;
  i18nKey: string;
  icon: FC<IconProps>;
  isDisabled?: boolean;
}

export const C01_SERVICE_CATEGORIES: ServiceCategoryItem[] = [
  {
    id: "junk-removal",
    name: "Junk Removal",
    i18nKey: "home.serviceJunkRemoval",
    icon: ServiceJunkIcon,
  },
  {
    id: "moving",
    name: "Moving",
    i18nKey: "home.serviceMoving",
    icon: ServiceMovingIcon,
  },
  {
    id: "furniture-pickup",
    name: "Furniture Pickup",
    i18nKey: "home.serviceFurniturePickup",
    icon: ServiceFurnitureIcon,
  },
  {
    id: "appliance-removal",
    name: "Appliance Removal",
    i18nKey: "home.serviceApplianceRemoval",
    icon: ServiceApplianceIcon,
  },
  {
    id: "mattress-removal",
    name: "Mattress Removal",
    i18nKey: "home.serviceMattressRemoval",
    icon: ServiceMattressIcon,
  },
  {
    id: "garage-cleanout",
    name: "Garage Cleanout",
    i18nKey: "home.serviceGarageCleanout",
    icon: ServiceGarageIcon,
  },
  {
    id: "store-pickup",
    name: "Store Pickup",
    i18nKey: "home.serviceStorePickup",
    icon: ServiceStoreIcon,
  },
  {
    id: "assembly-addon",
    name: "Assembly Add-on",
    i18nKey: "home.serviceAssemblyAddon",
    icon: ServiceAssemblyAddonIcon,
    isDisabled: true,
  },
];

export interface RecentJobItem {
  id: string;
  title: string;
  addressLine1: string;
  addressLine2: string;
  status: string;
  date: string;
}

export const C01_RECENT_JOB_DEMO: RecentJobItem = {
  id: "HX-JOB-HIST-001",
  title: "Junk Removal",
  addressLine1: "1234 E Thomas Rd",
  addressLine2: "Phoenix, AZ 85014",
  status: "✓ Completed",
  date: "Apr 12, 2024",
};

export interface SavedAddressItem {
  id: string;
  label: string;
  address: string;
}

export const C01_SAVED_ADDRESS_DEMO: SavedAddressItem = {
  id: "HX-ADDR-001",
  label: "Home",
  address: "1234 E Thomas Rd, Phoenix, AZ 85014",
};
