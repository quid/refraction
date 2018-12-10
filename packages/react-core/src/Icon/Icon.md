With the `Icon` component you can insert one of the supported icons
in your component:

```js
<Icon name="globe" style={{ fontSize: '2em' }} />
```

This is the complete list of available icons:

```js noeditor
const iconNames = require('./icons/quid-icons.json').icons.map(
  ({ icon }) => icon.tags[0]
);
const cell = {
  maxWidth: 0,
};
const icon = {
  padding: '.5em 1em',
  fontSize: '2em',
};
const name = {
  whiteSpace: 'normal',
  wordWrap: 'break-word',
  minWidth: 0,
  marginLeft: '1em',
};

<div style={{ overflow: 'auto', maxHeight: 400 }}>
  <table className="DemoTable">
    <tbody>
      {iconNames
        .reduce((acc, icon, i) => {
          i % 2 === 1 &&
            acc.push([
              icon.split(',')[0],
              iconNames[i + 1] && iconNames[i + 1].split(',')[0],
            ]);
          return acc;
        }, [])
        .map((icons, i) => (
          <tr key={i}>
            <td style={cell}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Icon style={icon} name={icons[0]} />
                <div style={name}>{icons[0]}</div>
              </div>
            </td>

            <td style={cell}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Icon style={icon} name={icons[1]} />
                <div style={name}>{icons[1]}</div>
              </div>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
</div>;
```
