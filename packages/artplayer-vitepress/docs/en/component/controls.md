# Controllers

## Configuration

| Property    | Type                | Description                                      |
| ----------- | ------------------- | ------------------------------------------------ |
| `disable`   | `Boolean`           | Whether to disable the component                 |
| `name`      | `String`            | Unique component name for CSS class identification |
| `index`     | `Number`            | Component index for display priority             |
| `html`      | `String`, `Element` | Component DOM element                            |
| `style`     | `Object`            | Component style object                           |
| `click`     | `Function`          | Component click event                            |
| `mounted`   | `Function`          | Triggered after component mounting               |
| `tooltip`   | `String`            | Component tooltip text                           |
| `position`  | `String`            | `left` and `right` control controller placement  |
| `selector`  | `Array`             | Array of selector list objects                   |
| `onSelect`  | `Function`          | Function triggered when selector item is clicked |

## Creation

<div className="run-code">▶ Run Code</div>

```js
var art = new Artplayer({
    container: '.artplayer-app',
    url: '/assets/sample/video.mp4',
    controls: [
        {
            name: 'your-button',
            index: 10,
            position: 'left',
            html: 'Your Button',
            tooltip: 'Your Button',
            style: {
                color: 'red',
            },
            click: function (...args) {
                console.info('click', args);
            },
            mounted: function (...args) {
                console.info('mounted', args);
            },
        },
        {
            name: 'subtitle',
            position: 'right',
            html: 'Subtitle',
            selector: [
                {
                    default: true,
                    html: '<span style="color:red">subtitle 01</span>',
                },
                {
                    html: '<span style="color:yellow">subtitle 02</span>',
                },
            ],
            onSelect: function (item, $dom) {
                console.info(item, $dom);
                return 'Your ' + item.html;
            },
        },
    ],
});

// Get the Element of control by name
console.info(art.controls['your-button']);
console.info(art.controls['subtitle']);
```

## Addition

<div className="run-code">▶ Run Code</div>

```js{6-21}
var art = new Artplayer({
    container: '.artplayer-app',
    url: '/assets/sample/video.mp4',
});

art.controls.add({
    name: 'button1',
    index: 10,
    position: 'left',
    html: 'Your Button',
    tooltip: 'Your Button',
    style: {
        color: 'red',
    },
    click: function (...args) {
        console.info('click', args);
    },
    mounted: function (...args) {
        console.info('mounted', args);
    },
});

// Get the Element of control by name
console.info(art.controls['button1']);
```

## Removal

<div className="run-code">▶ Run Code</div>

```js{21}
var art = new Artplayer({
    container: '.artplayer-app',
    url: '/assets/sample/video.mp4',
    controls: [
        {
            name: 'button1',
            index: 10,
            position: 'right',
            html: 'Your Button',
            tooltip: 'Your Button',
            style: {
                color: 'red',
            },
        }
    ]
});

art.on('ready', () => {
    setTimeout(() => {
        // Delete the control by name
        art.controls.remove('button1');
    }, 3000);
});
```

## Update

<div className="run-code">▶ Run Code</div>

```js{26-40}
var art = new Artplayer({
    container: '.artplayer-app',
    url: '/assets/sample/video.mp4',
    controls: [
        {
            name: 'button1',
            index: 10,
            position: 'right',
            html: 'Subtitle',
            selector: [
                {
                    default: true,
                    html: 'subtitle 01',
                },
                {
                    html: 'subtitle 02',
                },
            ],
        }
    ]
});

art.on('ready', () => {
    setTimeout(() => {
        // Update the control by name
        art.controls.update({
            name: 'button1',
            index: 10,
            position: 'right',
            html: 'New Subtitle',
            selector: [
                {
                    default: true,
                    html: 'new subtitle 01',
                },
                {
                    html: 'new subtitle 02',
                },
            ],
        });
    }, 3000);
});