import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Main',
    main: [
      {
        state: 'location',
        name: 'Location',
        type: 'link',
        icon: 'ti-home'
      },     
      {
        state: 'business_transaction',
        name: 'Visitor Log',
        type: 'link',
        icon: 'ti-mobile'
      },     
      {
        state: 'business_payment',
        name: 'Subscription Payment',
        type: 'link',
        icon: 'ti-credit-card'
      }      
    ],
  },  
];

@Injectable()
export class BusinessmenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
