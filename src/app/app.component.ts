import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {PreloaderService} from "./entities/services/preloader.service";
import {EHeroFormMode} from "./entities/enums/hero-form-mode.enum";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public preloaderIsVisible$: Observable<boolean> = this._preloaderService.isVisible$;
    protected readonly EHeroFormMode = EHeroFormMode;

    constructor (private readonly _preloaderService: PreloaderService) {
    }
}
