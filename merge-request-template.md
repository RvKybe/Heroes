### Merge Request Template

#### **Проверь, соответствует ли твой код каждому пункту из нижеперечисленных перед отправкой merge request!!!**

#### 0. Порядок действий

1. Привести код в соответствии с пунктами ниже;
2. Создать merge request:
    + Title: `Краткое описание или номера тикетов`
    + Description: `Полное описание изменений или копирование текста из commit'ов`
    + Assignee: `@Weiland`
    + Reviewer: `@lena_rogoleva`
    + Milestone: `none`
    + Labels: `none`
    + Merge options: `[✓] Squash commits when merge request is accepted.`
3. Проверить merge request на конфликты (при наличии - решить их);
4. Скопировать ссылку на merge request и перейти в канал mattermost'а `FRONTEND_REVIEW`;
5. Отправить сообщение по примеру:
<details>
    <summary>Пример</summary>
    <ul>
        <li>
            <b>!</b> *название проекта*
        </li>
        <li>
            <b>!</b> Ссылка на merge request
        </li>
        <li>
            <b>!</b> Перечисление ссылок на тикеты
        </li>
        <li>
            <b>!</b> *имя аналитика* протестировал(а)
        </li>
        <li>
            <b>?</b> Отчёт приложен в тикете *ссылка на тикет*
        </li>
        <li>
            <b>?</b> Заливать с бэком
        </li>
        <li>
            <b>?</b> Изменения по требованию заказчика *ФИО*
        </li>
        <li>
            <b>?</b> Просьба не заливать
        </li>
    </ul>
    <p>
        ! - обязательно
    </p>
    <p>
        ? - при наличии (дополнительно)
    </p>
</details>

6. Если открыты дискуссии по коду, то отписаться в них после выполнения и к сообщению прикрепить смайлик `:chad-php:`.

#### 1. Component HTML

1. [ ] Каждый атрибут тега должен начинаться с новой строки (за исключением самого первого)

<details>
    <summary>Подробнее</summary>
    <p>
        <b>Нельзя</b>
    </p>
    <pre>
        <code>
            &lt;dx-popup 
                [showTitle]="true" [dragEnabled]="false"
                [showCloseButton]="true" [(visible)]="dialogVisible"
                (onHidden)="onCancel()" title="Заголовок диалогового окна"
                      width="90vw"
                      height="250px"
                      maxWidth="500px"&gt;
                &lt;component-dialog (cancel)="onCancel()" (submit)="onSubmit()"
                &gt;&lt;/component-dialog&gt;
            &lt;/dx-popup&gt;
        </code>
    </pre>
    <p>
        <b>Можно</b>
    </p>
    <pre>
        <code>
            &lt;dx-popup [showTitle]="true"
                      [dragEnabled]="false"
                      [showCloseButton]="true"
                      [(visible)]="dialogVisible"
                      (onHidden)="onCancel()"
                      title="Заголовок диалогового окна"
                      width="90vw"
                      height="250px"
                      maxWidth="500px"&gt;
                &lt;component-dialog (cancel)="onCancel()"
                                  (submit)="onSubmit()"
                &gt;&lt;/component-dialog&gt;
            &lt;/dx-popup&gt;
        </code>
    </pre>
</details>
<br>

2. [ ] Если внутри блока ничего нет, то `>` должен находиться перед `<` 

<details>
    <summary>Подробнее</summary>
    <p>
        <b>Нельзя</b>
    </p>
    <pre>
        <code>
            &lt;div class="class-name"&gt;&lt;/div&gt;
        </code>
    </pre>
    <p>
        <b>Можно</b>
    </p>
    <pre>
        <code>
           &lt;div class-name
           &gt;&lt;/div&gt;
        </code>
    </pre>
</details>
<br>

3. [ ] Если внутри блока что-то есть, то `>` должен находиться на одной строке после последнего атрибута

<details>
    <summary>Подробнее</summary>
    <p>
        <b>Нельзя</b>
    </p>
    <pre>
        <code>
            &lt;div class="class-name"
            &gt;
                &lt;span&gt;
                    Текст
                &lt;/span&gt;
            &lt;/div&gt;
        </code>
    </pre>
    <p>
        <b>Можно</b>
    </p>
    <pre>
        <code>
           &lt;div class="class-name"&gt;
                &lt;span&gt;
                    Текст
                &lt;/span&gt;
            &lt;/div&gt;
        </code>
    </pre>
</details>
<br>

4. [ ] Содержимое тегов должно начинаться с новой строки <br> **Исключение:** строчные теги (img, span, a и т.д.)

<details>
    <summary>Подробнее</summary>
    <p>
        <b>Нельзя</b>
    </p>
    <pre>
        <code>
            &lt;div class="label"&gt;Нельзя&lt;/div&gt;
        </code>
    </pre>
    <p>
        <b>Можно</b>
    </p>
    <pre>
        <code>
           &lt;div class="label"&gt;
               Можно
           &lt;/div&gt;
        </code>
    </pre>
</details>
<br>

5. [ ] Текст не должен соседствовать с html нодой

<details>
    <summary>Подробнее</summary>
    <p>
        <b>Нельзя</b>
    </p>
    <pre>
        <code>
            &lt;p&gt;
                Какой-то текст 
                &lt;b&gt;
                    и еще какой-то текст
                &lt;/b&gt;
            &lt;/p&gt;
        </code>
    </pre>
    <p>
        <b>Можно</b>
    </p>
    <pre>
        <code>
           &lt;p&gt;
               &lt;span&gt;Какой-то текст&lt;/span&gt; 
               &lt;b&gt;
                   и еще какой-то текст
               &lt;/b&gt;
           &lt;/p&gt;
        </code>
    </pre>
</details>
<br>

6. [ ] Не должно быть литералов массивов и объектов (за исключением input/binding и output компонентов/тегов)

*Учесть, что статическая конфигурация любых структур шаблона должна быть вынесена также из кода класса компонента в отдельный файл*

<details>
    <summary>Подробнее</summary>
    <p>
        <b>Нельзя</b>
    </p>
    <pre>
        <code>
            &lt;div *ngFor="let item of [{id: 1, name: 'a'}, {id: 2, name: 'b'}];"&gt;
              {{ item.name }}
            &lt;/div&gt;
        </code>
    </pre>
    <p>
        <b>Можно</b>
    </p>
    <pre>
        <code>
           &lt;div *ngFor="let item of items;"&gt;
             {{ item.name }}
           &lt;/div&gt;
        </code>
    </pre>
</details>
<br>

7. [ ] Переменные в фигурных скобках для экранизации текста должны быть отделены пробелами

<details>
    <summary>Подробнее</summary>
    <p>
        <b>Нельзя</b>
    </p>
    <pre>
        <code>
            &lt;div *ngFor="let item of items;"&gt;
              {{item.name}}
            &lt;/div&gt;
        </code>
    </pre>
    <p>
        <b>Можно</b>
    </p>
    <pre>
        <code>
           &lt;div *ngFor="let item of items"&gt;
             {{ item.name }}
           &lt;/div&gt;
        </code>
    </pre>
</details>
<br>

8. [ ] Очередность атрибутов у тегов/компонентов по их важности должна быть соблюдена - от самого важного к наименее важному:

* Структурные директивы: `*ngFor="let item of items;""`
* Идентификатор элемента: `#dialogComponent`
* Input свойства, биндинги, директивы: `[width]="width"`
* Two Way Binding: `[(visible)]="visible"`
* Output обработчики событий: `(click)="onClick($event)"`
* Статические свойства: `width="100px"`
* Классы `class="wrapper"` - последним

<details>
    <summary>Подробнее</summary>
    <p>
        <b>Пример</b>
    </p>
    <pre>
        <code>
            &lt;dx-data-grid *ngIf="dataLoaded"
                          #dataGrid
                          [dataSource]="dataSource"
                          (onRowSelectionChange)="onSelectionChange($event)"
                          class="data-grid"
            &gt;&lt;/dx-data-grid&gt;
        </code>
    </pre>
</details>
<br>

9. [ ] Максимум 1 пробел между нодами (при условии, что пробел разъединяет 2 равноценных блока для наглядности и не иначе)

<details>
    <summary>Подробнее</summary>
    <p>
        <b>Нельзя</b>
    </p>
    <pre>
        <code>
            &lt;dxi-column [allowHeaderFiltering]="true"
                [allowSearch]="false"
                [allowFiltering]="false"
                dataField="status.name"
                caption="Статус"
                dataType="string"
                alignment="center"&gt;
.
                &lt;dxo-header-filter [dataSource]="statusHeaderFilters"
                &gt;&lt;/dxo-header-filter&gt;
.
            &lt;/dxi-column&gt;
        </code>
    </pre>
    <p>
        <b>Можно</b>
    </p>
    <pre>
        <code>
            &lt;dxo-sorting [showSortIndexes]="false"
                         mode="multiple"
            &gt;&lt;/dxo-sorting&gt;
.
            &lt;dxo-paging [enabled]="false"
            &gt;&lt;/dxo-paging&gt;
.
            &lt;dxo-filter-row [visible]="true"
            &gt;&lt;/dxo-filter-row&gt;
.
            &lt;dxo-header-filter [visible]="true"
                               [allowSearch]="true"
            &gt;&lt;/dxo-header-filter&gt;
        </code>
    </pre>
</details>
<br>

10. [ ] Использование ENUM

<details>
    <summary>Подробнее</summary>
    <p>
        <b>Нельзя</b>
    </p>
    <pre>
        <code>
            &lt;dxi-column [allowSearch]="false"
                        [allowHeaderFiltering]="false"
                        [allowFiltering]="true"
                        [format]="{ 
                            type: 'dd.MM.yyyy' 
                        }"
                        dataField="name"
                        sortOrder="desc"
                        caption="Дата отправления"
                        alignment="center"
                        dataType="date"
            &gt;&lt;/dxi-column&gt;
        </code>
    </pre>
    <p>
        <b>Можно</b>
    </p>
    <pre>
        <code>
            &lt;dxi-column [dataField]="ITEM.NAME"
                        [allowSearch]="false"
                        [allowHeaderFiltering]="false"
                        [allowFiltering]="true"
                        [format]="{ 
                            type: 'dd.MM.yyyy' 
                        }"
                        sortOrder="desc"
                        caption="Дата отправления"
                        alignment="center"
                        dataType="date"
            &gt;&lt;/dxi-column&gt;
        </code>
    </pre>
</details>
<br>

11. [ ] Оформление объектов для dx компонентов

<details>
    <summary>Подробнее</summary>
    <p>
        <b>Нельзя</b>
    </p>
    <pre>
        <code>
            &lt;dx-toolbar&gt;
                &lt;dxi-item [options]="{type: 'normal', stylingMode: 'text', icon: 'arrowleft', text: 'Текст', onClick: onClick}"
                          location="before"
                          widget="dxButton"
                &gt;&lt;/dxi-item&gt;
            &lt;/dx-toolbar&gt;
        </code>
    </pre>
    <p>
        <b>Можно</b>
    </p>
    <pre>
        <code>
            &lt;dx-toolbar&gt;
                &lt;dxi-item [options]="{
                            type: 'normal',
                            stylingMode: 'text',
                            icon: 'arrowleft',
                            text: 'Текст',
                            onClick: onClick
                          }"
                          location="before"
                          widget="dxButton"
                &gt;&lt;/dxi-item&gt;
            &lt;/dx-toolbar&gt;
        </code>
    </pre>
</details>
<br>

#### 2. Component SCSS

1. [ ] Стили должны максимально соответствовать дереву шаблона (вложенные селекторы), но небольшое уплощение допускается;

2. [ ] font-size всегда в rem-ах (через SASS функцию rem(?px))

<details>
    <summary>Подробнее</summary>
    <p>
        <b>Нельзя</b>
    </p>
    <pre>
        <code>
            .some-class {
              font-size: 16px;
            }
        </code>
    </pre>
    <p>
        <b>Можно</b>
    </p>
    <pre>
        <code>
           .some-class {
             font-size: rem(16px);
           }
        </code>
    </pre>
</details>
<br>

3. [ ] Использование `:ng-deep` разрешено только в крайних случаях и внутри `:host` компонента

4. [ ] Как можно больше вынесений одинаковых стилей в mixin (универсальные вынесены в библиотеку)

<details>
    <summary>Подробнее</summary>
    <p>
        <b>Нельзя</b>
    </p>
    <pre>
        <code>
            .some-class {
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: center;
            }
        </code>
    </pre>
    <p>
        <b>Можно</b>
    </p>
    <pre>
        <code>
            @mixin flexWrapper($dir: column, $jc: flex-start, $ai: flex-start) {
                display: flex;
                flex-direction: $dir;
                justify-content: $jc;
                align-items: $ai;
            }
            <br>
            .some-class {
              @include flexWrapper(column, flex-start, center);
            }
        </code>
    </pre>
</details>
<br>

5. [ ] Цвета задавать только через переменные (палитра гайд лайна в библиотеке)

<details>
    <summary>Подробнее</summary>
    <p>
        <b>Нельзя</b>
    </p>
    <pre>
        <code>
            .some-class {
                background-color: #FAFAFA;
            }
        </code>
    </pre>
    <p>
        <b>Можно</b>
    </p>
    <pre>
        <code>
            $base: #FAFAFA;
            <br>
            .some-class {
                background-color: $base;
            }
        </code>
    </pre>
</details>
<br>


6. [ ] Пиксели заменять на SASS функцию rem(?px)

<details>
    <summary>Подробнее</summary>
    <p>
        <b>Нельзя</b>
    </p>
    <pre>
        <code>
            .some-class {
                padding: 16px;
            }
        </code>
    </pre>
    <p>
        <b>Можно</b>
    </p>
    <pre>
        <code>
            .some-class {
                padding: rem(16px);
            }
            <br>
            .some-class {
                padding: $padding; // Переменные для стандартных и равномерных отступов содержатся в библиотеке
            }
        </code>
    </pre>
</details>
<br>

7. [ ] Все стили компонента содержатся в `:host`

#### 3. Component TS

1. [ ] Комментарии обязательны, формат JSDoc:

<details>
    <summary>Подробнее</summary>
    <pre>
        <code>
            /**
             * Описание метода
             *
             * @param {number} a - важное число
             * @return {boolean}
             * @private
             */
            private _method(a: number): boolean {
                return !!a;
            }
        </code>
    </pre>
</details>
<br>

2. [ ] Все subscribe должны быть обработаны с помощью отписки через .pipe(takeUntilDestroyed(this._destroyRef)) и добавлением первой строки `private readonly _destroyRef: DestroyRef = inject(DestroyRef);`

3. [ ] Порядок выше конструктора (каждый блок отделен пробелом от следующего)

<details>
    <summary>Подробнее</summary>
    <pre>
        <code>
            @ViewChild(DxDrawerComponent, { static: false }) 
            public drawer: DxDrawerComponent;
            <br>
            @Input()
            public item: IItem;
            <br>
            @Output()
            public close: EventEmitter<null> = new EventEmitter<null>();
            <br>
            @Select() - при наличии NGXS
            <br>
            Формы
            <br>
            Публичные переменные
            <br>
            Приватные переменные 
            <br>
            Энамы и типы, объявленные для работы в HTML с помощью конструкции:
            public ITEM: typeof LItem = LItem;
        </code>
    </pre>
</details>
<br>

4. [ ] Сервисы, объявленные в конструкторе должны стандартно иметь модификатор доступа `private` и быть `readonly`

<details>
    <summary>Подробнее</summary>
    <pre>
        <code>
            constructor(
                private readonly _utilitiesService: UtilitiesService,
                private readonly _appService: AppService,
                private readonly _appFormBuilderService: AppFormBuilderService,
            ) {
                super();
            }
        </code>
    </pre>
</details>
<br>

5. [ ] После конструктора находятся lifecycle hooks (ngOnDestroy в конце файла) для них модификатор доступа и возвращаемый тип тоже обязательны

6. [ ] Порядок ниже lifecycle hooks

<details>
    <summary>Подробнее</summary>
    <p>
        1. Публичные методы
    </p>
    <p>
        2. Приватные методы
    </p>
    <p>
        3. Геттеры
    </p>
    <p>
        4. Сеттеры
    </p>
</details>
<br>

#### 4. Interface

1. [ ] Отдельный файл с названием `*.interface.ts`

2. [ ] Вместо стандартной приписки `Interface` в названии используется префикс `I`
   
3. [ ] Комментарии обязательны, формат JSDoc:

<details>
    <summary>Подробнее</summary>
    <pre>
        <code>
            /**
             * Интерфейс преподавателя
             *
             * @param {number} AGE - возраст
             * @extends IItem
             */
            export interface ITeacher extends IItem {
                [LTeacher.AGE]: number;
            }
        </code>
    </pre>
</details>
<br>

4. [ ] Если ваш интерфейс содержит вложенный объект, то этот объект необходимо вынести в отдельный интерфейс

<details>
    <summary>Подробнее</summary>
    <p>
        <b>Нельзя</b>
    </p>
    <pre>
        <code>
            export interface A {
                a: number;
                b: {
                    c: string;
                    d: boolean;
                };
            }
        </code>
    </pre>
    <p>
        <b>Можно</b>
    </p>
    <pre>
        <code>
           export interface IA {
               a: number;
               b: B;
           }
           <br>
           export interface IB {
               c: string;
               d: boolean;
           }
        </code>
    </pre>
</details>
<br>

5. [ ] Любые объединения интерфейсов/типов должны быть вынесены в отдельный тип

<details>
    <summary>Подробнее</summary>
    <p>
        <b>Нельзя</b>
    </p>
    <pre>
        <code>
            export interface IItem {
                id: number;
                name: string;
                value: number;
            }
        </code>
    </pre>
    <p>
        <b>Можно</b>
    </p>
    <pre>
        <code>
           export interface IItem extends IIdName {
               value: number;
           }
        </code>
    </pre>
</details>
<br>

6. [ ] Справочники

<details>
    <summary>Подробнее</summary>
    <p>
        <b>Нельзя</b>
    </p>
    <pre>
        <code>
            const itemsDictionary: { [id: number]: Item; };
        </code>
    </pre>
    <p>
        <b>Можно</b>
    </p>
    <pre>
        <code>
            const itemsDictionary: Record<number, Item>;
        </code>
    </pre>
</details>
<br>

7. [ ] `any` разрешены только для body и params в Service

#### 5. Enum (для интерфейсов)

1. [ ] Каждый энам создается для отдельного интерфейса (за исключением универсальных) в отдельном файле с названием `*.label.ts`;

2. [ ] Вместо стандартной приписки `Enum` в названии используется префикс `L`;

3. [ ] Соблюдение верхнего регистра свойств
<details>
    <summary>Подробнее</summary>
    <p>
        <b>Нельзя</b>
    </p>
    <pre>
        <code>
            itemId = 'itemId'
        </code>
    </pre>
    <p>
        <b>Можно</b>
    </p>
    <pre>
        <code>
            ITEM_ID = 'itemId'
        </code>
    </pre>
</details>
<br>

4. [ ] Свойства не должны искажать логику свойств бэкенда
<details>
    <summary>Подробнее</summary>
    <p>
        <b>Нельзя</b>
    </p>
    <pre>
        <code>
            ITEM = 'itemId'
        </code>
    </pre>
    <p>
        <b>Можно</b>
    </p>
    <pre>
        <code>
            ITEM_ID = 'itemId'
        </code>
    </pre>
</details>
<br>

5. [ ] Использование при объявлении интерфейсов

<details>
    <summary>Подробнее</summary>
    <p>
        <b>Нельзя</b>
    </p>
    <pre>
        <code>
        export interface IItem {
            id: number;
            name: string;
        }
        </code>
    </pre>
    <p>
        <b>Можно</b>
    </p>
    <pre>
        <code>
        export interface IStatus {
            [LItem.ID]: number;
            [LItem.NAME]: string;
        }
        </code>
    </pre>
</details>
<br>

6. [ ] Обязательное использование в HTML

#### 6. Enum (не для интерфейсов)

1. [ ] Вместо создания большого количества констант создается файл с названием `*.enum.ts`, который в себе содержит перечисление всех переменных

<details>
    <summary>Пример</summary>
    <pre>
        <code>
        /**
         * Типы статусов
         *
         * AWAITING_MODERATION - ожидает модерации
         * REJECTED - отклонено
         * APPROVED - одобрено
         * AWAITING_RE_MODERATION - ожидает повторной модерации
         * REVOKED_BY_STUDENT - отозвано студентом
         * AWAITING_STUDENT_EDITING - ожидает редактирования студентом
         * CONFIRMED_BY_TIMEOUT - подтверждено по таймауту
         */
        export enum EStatus {
            AWAITING_MODERATION = 1,
            REJECTED,
            APPROVED,
            AWAITING_RE_MODERATION,
            REVOKED_BY_STUDENT,
            AWAITING_STUDENT_EDITING,
            CONFIRMED_BY_TIMEOUT
        }
        </code>
    </pre>
</details>

2. [ ] Вместо стандартной приписки `Enum` в названии используется префикс `E`

3. [ ] Последовательность чисел

<details>
    <summary>Подробнее</summary>
    <p>
        <b>Нельзя</b>
    </p>
    <pre>
        <code>
        export enum EStatus {
            AWAITING_MODERATION = 1,
            REJECTED = 2,
            APPROVED = 3,
            AWAITING_RE_MODERATION = 5,
            REVOKED_BY_STUDENT = 6,
            AWAITING_STUDENT_EDITING = 7,
            CONFIRMED_BY_TIMEOUT = 8
        }
        </code>
    </pre>
    <p>
        <b>Можно</b>
    </p>
    <pre>
        <code>
        export enum EStatus {
            AWAITING_MODERATION = 1,
            REJECTED,
            APPROVED,
            AWAITING_RE_MODERATION = 5,
            REVOKED_BY_STUDENT,
            AWAITING_STUDENT_EDITING,
            CONFIRMED_BY_TIMEOUT
        }
        </code>
    </pre>
</details>
<br>

4. [ ] Обязательное использование в HTML

#### 7. Service

1. [ ] Комментарии к каждому методу в формате JSDoc

<details>
    <summary>Подробнее</summary>
    <pre>
        <code>
            /**
             * Метод загрузки данных людей
             *
             * @param {number} id - идентификатор программы
             */
            public loadData(id: number): void {
.
            }
        </code>
    </pre>
</details>
<br>

2. [ ] На каждое обращение к серверу необходимо создавать отдельный метод сервиса

<details>
    <summary>Подробнее</summary>
    <p>
        <b>Нельзя</b>
    </p>
    <pre>
        <code>
            public loadData(id: number): ... {
                return forkJoin(
                    this._apiService.get('...'),
                    this._apiService.get('...')
                ).pipe(
                    map(([a, b]: [string, string]) => {
                        return {a, b};
                    })
                )
            }
        </code>
    </pre>
    <p>
        <b>Можно</b>
    </p>
    <pre>
        <code>
           public loadData(id: number): ... {
               return forkJoin(
                   this.loadA(),
                   this.loadB()
               ).pipe(
                   map(([a, b]: [string, string]) => {
                       return {a, b};
                   })
               )
           }
           <br>
           public loadA(): ... {
               return this._apiService.get('...');
           }
           <br>
           public loadB(): ... {
               return this._apiService.get('...');
           }
        </code>
    </pre>
</details>
<br>

3. [ ] При многоразовом использовании конструкции `this.*$$.next(...)` требуется заменить на сеттер

<details>
    <summary>Пример</summary>
    <pre>
        <code>
            /**
            * Установка выбранного элемента
            * @param {IItem, null} selectedItem - выбранный элемент
            */
            public set selectedItem(selectedItem: IItem | null) {
                this._selectedItem$$.next(selectedItem);
            }
            <br>
            this._appService.selectedItem = selectedItem;
        </code>
    </pre>
</details>
<br>
   
4. [ ] Соблюдение порядка внутри метода

<details>
    <summary>Пример</summary>
    <pre>
        <code>
            /**
             * Загрузка подробной информации об элементе
             * @param {number} id - идентификатор элемента
             */
            public loadElementFullInformation(id: number): void {
                const body = {
                    id
                };
.
                const params = {
                    act: '...',
                    method: '...'
                };
.
                this._apiService.postPromise(body, params)
                    .then((data: ApiResponse...) => {
                        this._elementFullInformation$$.next(data.rows);
                    })
                    .catch(() => {
                        this._notificationService.showNotification('Ошибка при получении подробной информации об элементе!', NotificationTypes.ERROR);
                        this._elementFullInformation$$.next(null);
                    });
            }
        </code>
    </pre>
</details>
<br>

5. [ ] Обязательно наличие обработчика ошибки (catch), внутри - уведомление и код, выполняемый в случае ошибки

6. [ ] Тип возвращаемых данных с помощью интерфейса ApiResponse

#### 8. Mock

1. [ ] Файл с названием `*.mock.ts`

2. [ ] В названии мока должен быть постфикс `Mock`: `MItems` и обязательно с заглавной буквы

<details>
    <summary>Пример</summary>
    <pre>
        <code>
            export const MStatuses: IItem[] = [
                {
                    [LItem.ID]: EStatus.MODERATION,
                    [LItem.NAME]: 'Ожидает модерации'
                },
                {
                    [LItem.ID]: EStatus.REJECTED,
                    [LItem.NAME]: 'Отклонено'
                },
                {
                    [LItem.ID]: EStatus.APPROVED,
                    [LItem.NAME]: 'Одобрено'
                }
            ];
        </code>
    </pre>
</details>

#### 9. Pipe

1. [ ] Файл с названием `*.pipe.ts`

2. [ ] Комментарии обязательны, формат JSDoc

3. [ ] В названии нет слова `pipe`

<details>
    <summary>Пример</summary>
    <pre>
        <code>
            @Pipe({
                name: 'iconUrl'
            })
            export class IconUrlPipe implements PipeTransform {
                /**
                  * Фильтрация массива
                  *
                  * @example [1, 2] -> [1]
                  * @template T
                  * @param {T[]} array - исходный массив
                  * @param {string, null} filterString - значение по которому будем фильтровать
                  * @param {number} [minFilterStringLength = 1] - минимальная длина фильтрующей строки при которой начинается фильтрация
                  * @param {string} [arrayObjectKey = ''] - ключ объекта в котором будет искаться фильтрующая строка
                  * @return {T[]}
                */
                public transform<T>(array: T[], filterString: string | null, minFilterStringLength: number = 1, arrayObjectKey: string = ''): T[] {
                    return (filterString && filterString.length >= minFilterStringLength)
                        ? array.filter((el: T) => (arrayObjectKey ? el[arrayObjectKey] : el).toLowerCase().includes(filterString.toLowerCase()))
                        : (minFilterStringLength > 1 ? [] : array);
                }
 .               
            }
        </code>
    </pre>
</details>

#### 10. Lib

1. [ ] Файл с названием `*.lib.ts`

2. [ ] Содержание файла - переиспользуемые функции, относящиеся к компоненту и статические конфигурации

<details>
    <summary>Пример №1</summary>
    <pre>
        <code>
            export abstract class AppLib {
                /**
                * Стандартный приказ
                */
                public static readonly defaultOrder: IOrder = {
                    [LItem.ID]: EOrder.NEW,
                    [LItem.NAME]: 'Новый приказ',
                    [LOrder.REQUIRED]: false,
                    [LOrder.FILES_COUNT]: 0
                };
            }
            <br>
            public defaultOrder: IOrder = AppLib.defaultOrder;
        </code>
    </pre>
</details>

<details>
    <summary>Пример №2</summary>
    <pre>
        <code>
            export abstract class AppLib {
                /**
                * Создание массива недель графика
                */
                public static createWeeksArray(): number[] {
                    return Array.from(new Array(this.maxWeek - this.minWeek + 1)).map((_: any, index: number) => index + 1);
                }
            }
            <br>
            public weekBlocks: number[] = AppLib.createWeeksArray();
        </code>
    </pre>
</details>

<details>
    <summary>Пример №3</summary>
    <pre>
        <code>
            export abstract class AppLib {
                /**
                * Максимальный номер недели
                */
                public static maxWeek: number = 52;
            }
            <br>
            public maxWeek: number = AppLib.maxWeek;
        </code>
    </pre>
</details>

#### 11. Общее

1. [ ] Строки и числа в коде должны быть как минимум объявлены через переменную (no magic strings, no magic numbers)
2. [ ] Не допускается наличие console, debugger
3. [ ] Не допускается наличие пустых constructor, пустых обработчиков lifecycle hooks
4. [ ] Именование файлов должно соответствовать именованию классов (или другой сущности, которой отведен файл) внутри
5. [ ] Код должен быть отформатирован либо собственноручно, либо через комбинацию клавиш `CTRL + ALT + L`
6. [ ] Формат записи объектов и массивов должен быть следующий - каждая скобка, каждое поле с новой строки
7. [ ] Соблюдается структура компонентов
8. [ ] Для каждой структурной единицы выделена отдельная папка с характерным названием: `interfaces, enums, components...`
9. [ ] Модификаторы доступа обязательны
10. [ ] Для `private` переменных/методов обязателен префикс `_`
11. [ ] Возвращаемый тип методов обязателен
12. [ ] Работа с Reactive Forms вынесена в локальные `*-form-builder.service.ts` компонента
13. [ ] Подсказки сделаны только с помощью компонента из библиотеки (Tooltip Module)
14. [ ] Всякая логика в constructor запрещена (выносить в ngOnInit)
15. [ ] Если подписка нужна для получения переменной, которая используется только в HTML, то такие подписки заменять AsyncPipe
16. [ ] Если в подписке не используется переменная, то ее не нужно прописывать
17. [ ] Название переменной должно соответствовать названию Observable
