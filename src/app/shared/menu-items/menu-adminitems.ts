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
        state: 'dashboard',
        name: 'Health Organization',
        type: 'link',
        icon: 'ti-home'
      },
      {
        state: 'business',
        name: 'Business',
        type: 'link',
        icon: 'ti-id-badge'
      },     
      {
        state: 'users',
        name: 'User Registrations',
        type: 'link',
        icon: 'ti-user'
      },
      {
        state: 'transaction',
        name: 'Visitor Log',
        type: 'link',
        icon: 'ti-mobile'
      },  
      {
        state: 'subscriptions',
        name: 'Subscriptions',
        type: 'link',
        icon: 'ti-layers'
      },
      {
        state: 'payments',
        name: 'Subscription Payments',
        type: 'link',
        icon: 'ti-credit-card'
      },
      {
        state: 'faqs',
        name: 'FAQs',
        type: 'link',
        icon: 'ti-comments-smiley'
      },      
      {
        state: 'terms',
        name: 'Terms',
        type: 'link',
        icon: 'ti-receipt',
      }, 
      {
        state: 'setting',
        name: 'Setting',
        type: 'link',
        icon: 'ti-settings',
      }       
    ],
  },  
];

@Injectable()
export class AdminMenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}
