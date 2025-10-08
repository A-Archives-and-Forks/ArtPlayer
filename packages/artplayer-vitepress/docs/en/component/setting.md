# Settings Panel

## Built-in

First, you need to open the settings panel. It comes with four built-in items: `flip`, `playbackRate`, `aspectRatio`, `subtitleOffset`

<div className="run-code">▶ Run Code</div>

```js{4}
var art = new Artplayer({
    container: '.artplayer-app',
    url: '/assets/sample/video.mp4',
	setting: true,
    flip: true,
    playbackRate: true,
    aspectRatio: true,
    subtitleOffset: true,
});
```

## Create - Button

| Property   | Type                | Description          |
| ---------- | ------------------- | -------------------- |
| `html`     | `String`, `Element` | Element DOM          |
| `icon`     | `String`, `Element` | Element icon         |
| `onClick` | `Function`          | Element click event  |
| `width`    | `Number`            | List width           |
| `tooltip`  | `String`            | Tooltip text         |

<div className="run-code">▶ Run Code</div>

```js
var art = new Artplayer({
    container: '.artplayer-app',
    url: '/assets/sample/video.mp4',
    setting: true,
    settings: [
        {
            html: 'Button',
            icon: '<img width="22" height="22" src="/assets/img/state.svg">',
            tooltip: 'tooltip',
			onClick(item, $dom, event) {
                console.info(item, $dom, event);
				return 'new tooltip'
			}
        },
    ],
});
```

## Create - Selector List

| Property   | Type                | Description          |
| ---------- | ------------------- | -------------------- |
| `html`     | `String`, `Element` | Element DOM          |
| `icon`     | `String`, `Element` | Element icon         |
| `selector` | `Array`             | Element list         |
| `onSelect` | `Function`          | Element click event  |
| `width`    | `Number`            | List width           |
| `tooltip`  | `String`            | Tooltip text         |

<div className="run-code">▶ Run Code</div>

```js
var art = new Artplayer({
    container: '.artplayer-app',
    url: '/assets/sample/video.mp4',
    setting: true,
    settings: [
        {
            html: 'Subtitle',
            width: 250,
            tooltip: 'Subtitle 01',
            selector: [
                {
                    default: true,
                    html: '<span style="color:red">Subtitle 01</span>',
                    url: '/assets/sample/subtitle.srt?id=1',
                },
                {
                    html: '<span style="color:yellow">Subtitle 02</span>',
                    url: '/assets/sample/subtitle.srt?id=2',
                },
            ],
            onSelect: function (item, $dom, event) {
                console.info(item, $dom, event);
                art.subtitle.url = item.url;
                return item.html;
            },
        },
        {
            html: 'Quality',
            width: 150,
            tooltip: '1080P',
            selector: [
                {
                    default: true,
                    html: '1080P',
                    url: '/assets/sample/video.mp4?id=1080',
                },
                {
                    html: '720P',
                    url: '/assets/sample/video.mp4?id=720',
                },
                {
                    html: '360P',
                    url: '/assets/sample/video.mp4?id=360',
                },
            ],
            onSelect: function (item, $dom, event) {
                console.info(item, $dom, event);
                art.switchQuality(item.url, item.html);
                return item.html;
            },
        },
    ],
});
```

## Create - Nested List

<div className="run-code">▶ Run Code</div>

```js
var art = new Artplayer({
    container: '.artplayer-app',
    url: '/assets/sample/video.mp4',
    setting: true,
    settings: [
        {
            html: 'Multi-level',
            selector: [
                {
                    html: 'Setting 01',
                    width: 150,
                    selector: [
                        {
                            html: 'Setting 01 - 01',
                        },
                        {
                            html: 'Setting 01 - 02',
                        },
                    ],
                    onSelect: function (item, $dom, event) {
                        console.info(item, $dom, event);
                        return item.html;
                    },
                },
                {
                    html: 'Setting 02',
                    width: 150,
                    selector: [
                        {
                            html: 'Setting 02 - 01',
                        },
                        {
                            html: 'Setting 02 - 02',
                        },
                    ],
                    onSelect: function (item, $dom, event) {
                        console.info(item, $dom, event);
                        return item.html;
                    },
                },
            ],
        },
    ],
});

## Create - Toggle Button

| Property   | Type                | Description               |
| ---------- | ------------------- | ------------------------- |
| `html`     | `String`, `Element` | DOM element of the item   |
| `icon`     | `String`, `Element` | Icon of the item          |
| `switch`   | `Boolean`           | Default state of the button |
| `onSwitch` | `Function`          | Button toggle event       |
| `tooltip`  | `String`            | Tooltip text              |

<div className="run-code">▶ Run Code</div>

```js
var art = new Artplayer({
    container: '.artplayer-app',
    url: '/assets/sample/video.mp4',
    setting: true,
    settings: [
        {
            html: 'PIP Mode',
            tooltip: 'Close',
            icon: '<img width="22" height="22" src="/assets/img/state.svg">',
            switch: false,
            onSwitch: function (item, $dom, event) {
                console.info(item, $dom, event);
                const nextState = !item.switch;
                art.pip = nextState;
                item.tooltip = nextState ? 'Open' : 'Close';
                return nextState;
            },
        },
    ],
});
```

## Create - Range Slider

| Property   | Type                | Description               |
| ---------- | ------------------- | ------------------------- |
| `html`     | `String`, `Element` | DOM element of the item   |
| `icon`     | `String`, `Element` | Icon of the item          |
| `range`    | `Array`             | Default state array       |
| `onRange`  | `Function`          | Event triggered on completion |
| `onChange` | `Function`          | Event triggered on change |
| `tooltip`  | `String`            | Tooltip text              |

```js
const range = [5, 1, 10, 1];
const value = range[0];
const min = range[1];
const max = range[2];
const step = range[3];
```

<div className="run-code">▶ Run Code</div>

```js
var art = new Artplayer({
    container: '.artplayer-app',
    url: '/assets/sample/video.mp4',
    setting: true,
    settings: [
        {
            html: 'Slider',
            tooltip: '5x',
            icon: '<img width="22" height="22" src="/assets/img/state.svg">',
            range: [5, 1, 10, 1],
            onChange: function (item, $dom, event) {
                console.info(item, $dom, event);
                return item.range[0] + 'x';
            },
        },
    ],
});
```

## Add

<div className="run-code">▶ Run Code</div>

```js{9-14}
var art = new Artplayer({
    container: '.artplayer-app',
    url: '/assets/sample/video.mp4',
    setting: true,
});

art.setting.show = true;

art.setting.add({
    html: 'Slider',
    tooltip: '5x',
    icon: '<img width="22" height="22" src="/assets/img/state.svg">',
    range: [5, 1, 10, 1],
});
```

## Remove

<div className="run-code">▶ Run Code</div>

```js{22}
var art = new Artplayer({
    container: '.artplayer-app',
    url: '/assets/sample/video.mp4',
    setting: true,
    flip: true,
    settings: [
        {
            name: 'slider',
            html: 'Slider',
            tooltip: '5x',
            icon: '<img width="22" height="22" src="/assets/img/state.svg">',
            range: [5, 1, 10, 1],
        },
    ],
});

art.setting.show = true;

art.on('ready', () => {
    setTimeout(() => {
        // Delete the setting by name
        art.setting.remove('slider');
    }, 3000);
});
```

## Update

<div className="run-code">▶ Run Code</div>

```js{21-27}
var art = new Artplayer({
    container: '.artplayer-app',
    url: '/assets/sample/video.mp4',
    setting: true,
    settings: [
        {
            name: 'slider',
            html: 'Slider',
            tooltip: '5x',
            icon: '<img width="22" height="22" src="/assets/img/state.svg">',
            range: [5, 1, 10, 1],
        },
    ],
});

art.setting.show = true;

art.on('ready', () => {
    setTimeout(() => {
        // Update the setting by name
        art.setting.update({
            name: 'slider',
            html: 'PIP Mode',
            tooltip: 'Close',
            icon: '<img width="22" height="22" src="/assets/img/state.svg">',
            switch: false,
        });
    }, 3000);
});