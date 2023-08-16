import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {PreloaderService} from "./entities/services/preloader.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public preloaderIsVisible$: Observable<boolean> = this._preloaderService.IsVisible$;
    constructor (private readonly _preloaderService: PreloaderService) {
    }
}
