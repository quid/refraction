The modal component provides a solution for creating dialogs, popups, lightboxes, or whatever else.

```js
const ImportanceTypes = require('./importanceTypes');

const ICONS = ['', 'question', 'network', 'heart'];

initialState = {
  importance: ImportanceTypes.ACTION,
  icon: ICONS[0],
  centerVertically: false,
  isOpen: false,
};

<div>
  <Button onClick={() => setState({ isOpen: true })}>Open</Button>

  <Modal
    title="Did You Know...?"
    icon={state.icon}
    importance={state.importance}
    renderActionLeft={actionClassName => (
      <Button
        className={actionClassName}
        onClick={() => setState({ isOpen: false })}
      >
        Close
      </Button>
    )}
    centerVertically={state.centerVertically}
    renderActionRight={actionClassName => [
      <Button className={actionClassName} href="#" key="1">
        Hold on
      </Button>,
      <Button className={actionClassName} importance="primary" key="2">
        Never look back
      </Button>,
    ]}
    isOpen={state.isOpen}
  >
    Importance:
    <select onChange={evt => setState({ importance: evt.target.value })}>
      {Object.values(ImportanceTypes).map(importance => (
        <option key={importance} value={importance}>
          {importance}
        </option>
      ))}
    </select>
    <br />
    <br />
    Icon:
    <select onChange={evt => setState({ icon: evt.target.value })}>
      {ICONS.map(icon => (
        <option key={icon} value={icon}>
          {icon}
        </option>
      ))}
    </select>
    <br />
    <br />
    Vertical align:
    <input
      type="checkbox"
      onChange={() =>
        setState(({ centerVertically }) => ({
          centerVertically: !centerVertically,
        }))
      }
      checked={state.centerVertically}
    />
  </Modal>
</div>;
```

If you would like to have a `<form>` within the modal, you can do that by using `isForm={true}` prop. Also pass `formProps` so that you can handle `onSubmit` event.

```js
const ImportanceTypes = require('./importanceTypes');

const ICONS = ['', 'question', 'network', 'heart'];

initialState = {
  importance: ImportanceTypes.ACTION,
  icon: ICONS[0],
  centerVertically: false,
  isOpen: false,
};

<div>
  <Button onClick={() => setState({ isOpen: true })}>Open</Button>

  <Modal
    isForm={true}
    title="Did You Know...?"
    icon={state.icon}
    importance={state.importance}
    renderActionLeft={actionClassName => (
      <Button
        className={actionClassName}
        onClick={() => setState({ isOpen: false })}
      >
        Close
      </Button>
    )}
    centerVertically={state.centerVertically}
    renderActionRight={actionClassName => [
      <Button className={actionClassName} type="cancel" href="#" key="1">
        Cancel
      </Button>,
      <Button
        className={actionClassName}
        type="submit"
        importance="primary"
        key="2"
      >
        Submit
      </Button>,
    ]}
    isOpen={state.isOpen}
    formProps={{
      onSubmit: evt => {
        evt.preventDefault();
        alert('You have submitted the form.');
      },
    }}
  >
    Importance:
    <select onChange={evt => setState({ importance: evt.target.value })}>
      {Object.values(ImportanceTypes).map(importance => (
        <option key={importance} value={importance}>
          {importance}
        </option>
      ))}
    </select>
    <br />
    <br />
    Icon:
    <select onChange={evt => setState({ icon: evt.target.value })}>
      {ICONS.map(icon => (
        <option key={icon} value={icon}>
          {icon}
        </option>
      ))}
    </select>
    <br />
    <br />
    Vertical align:
    <input
      type="checkbox"
      onChange={() =>
        setState(({ centerVertically }) => ({
          centerVertically: !centerVertically,
        }))
      }
      checked={state.centerVertically}
    />
  </Modal>
</div>;
```
