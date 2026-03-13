 import { inject, Injectable } from '@angular/core'

import { Route, Router, UrlSegment } from '@angular/router'

import { PAGEMODE } from '@tranglo1/shared/enum'

import { createCanMatchFactory } from './page-mode-can-match.factory'


@Injectable()

export class ModeGuard {

  router = inject(Router)


  checkMode(route: Route, segments: UrlSegment[], modes: PAGEMODE[], index: number, defaultPage: string) {

    const mode = segments[index]?.path

    const isAllowed = modes.includes(mode as PAGEMODE)

    if (!isAllowed) {

      return this.router.parseUrl(defaultPage)

    }

    return true

  }

}


export const modeCanMatch = (modes: PAGEMODE[], index: number, defaultPage: string) =>

  createCanMatchFactory(ModeGuard, (guard, route, segments) =>

    guard.checkMode(route, segments, modes, index, defaultPage)

  ) 