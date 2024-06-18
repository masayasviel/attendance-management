import type { Routes } from '@angular/router';
import { type Action, type MetaReducer, provideState } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { InternalFeatureKey, InternalReducer, type State } from './internal/store/internal.reducer';
import { TemplateComponent } from './internal/template/template.component';

const localStorageSyncReducer: MetaReducer<State, Action> = (reducer) =>
  localStorageSync({
    keys: ['records'],
    rehydrate: true,
    storage: localStorage,
    storageKeySerializer: (key) => `attendance_management_for_${key}`,
  })(reducer);

const metaReducers: Array<MetaReducer<State, Action>> = [localStorageSyncReducer];

export const routes: Routes = [
  {
    path: '**',
    component: TemplateComponent,
    providers: [provideState(InternalFeatureKey, InternalReducer, { metaReducers })],
    loadChildren: () => import('./internal/internal.routes').then((m) => m.routes),
  },
];
