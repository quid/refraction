Calendar example, you are probably looking for [InputDate](#inputdate) anyway:

```js
const addDays = require('date-fns/add_days');
initialState = { current: new Date(), selected: new Date() };
<DatePicker
  current={state.current}
  selected={state.selected}
  minDate={addDays(new Date(), -10)}
  onChangeCurrent={current => setState({ current })}
  onCancel={() => console.log('handle cancel')}
  onSelect={selected => setState({ selected })}
/>;
```
