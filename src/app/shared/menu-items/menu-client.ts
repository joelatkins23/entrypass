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
        state: 'client_payments',
        name: 'Transaction',
        type: 'link',
        icon: 'ti-credit-card'
      }     
    ],
  },  
];

@Injectable()
export class ClientmenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}
