InputDate example:

```js
const addDays = require('date-fns/add_days');
initialState = {
  value: new Date().toISOString().split('T')[0],
  isOpen: false,
};

const handleChange = value => console.log(value) || setState({ value });
const handleToggle = isOpen => setState({ isOpen });
<div style={{ position: 'relative', zIndex: 3 }}>
  <InputDate
    value={state.value}
    // eg. 2018-02-13
    min={
      addDays(new Date(), -5)
        .toISOString()
        .split('T')[0]
    }
    onChange={handleChange}
    onToggle={handleToggle}
    isOpen={state.isOpen}
  />
</div>;
```

Disabled InputDate example:

```js
initialState = {
  value: new Date().toISOString().split('T')[0],
  isOpen: false,
};

const handleChange = value => setState({ value });
const handleToggle = isOpen => setState({ isOpen });
<InputDate
  disabled
  value={state.value}
  onChange={handleChange}
  onToggle={handleToggle}
  isOpen={state.isOpen}
/>;
```

InputDate with `calendarValue` which give you control over calendar pagination:

```js
const { Button } = require('@quid/react-core');
const addDays = require('date-fns/add_days');
initialState = {
  value: new Date().toISOString().split('T')[0],
  isOpen: false,
  calendarValue: new Date(),
};

const handleChange = value =>
  console.log(value) || setState({ value, calendarValue: new Date(value) });
const handleToggle = isOpen => setState({ isOpen });
const handleCalendarChange = calendarValue => setState({ calendarValue });

<div style={{ position: 'relative', zIndex: 3 }}>
  <InputDate
    value={state.value}
    onChange={handleChange}
    calendarValue={state.calendarValue}
    onCalendarChange={handleCalendarChange}
  />{' '}
  <Button
    onClick={() => {
      setState({
        calendarValue: new Date(state.value),
      });
    }}
  >
    Reset calendar position
  </Button>
</div>;
```
