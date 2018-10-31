# redux-react-connect-by-name

A Redux connector that allows you to:

- Name your reducers and actions
- Reuse a general selector for your reducer

This has a few benefits of:

- Have your action creators bound to dispatch for you
- Not requiring you to specify a new selector for every component you want to connect to the Redux store
- Have consistent namespacing for components that connect to multiple reducers' state
- Keeping the component file clean of selector construction
- Create a convenient location in the reducer to expose derived state

## Install

```
npm install redux-react-connect-by-name
```

## Usage

As a decorator:
```jsx
import {
    makeBreakfast
} from "./actions";

// getPancakes = (state) => state.pancakes;
import {
    getPancakes
} from "./selectors";

import connect from "redux-react-connect-by-name";

@connect([
    /* selectors */
    {name: "pancakes", select: getPancakes}
], [
    /* actions */
    // `name` is the name of the prop you want the action(s) to be mapped to
    {name: "actions", makeBreakfast}
])
export class Pancakes extends React.Component {
    static propTypes = {
        pancakes: PropTypes.array,

        actions: PropTypes.shape({
            makeBreakfast: PropTypes.func
        })
    }

    // ...
}
```

As a wrapper:
```jsx
// similar to above..
class Pancakes extends React.Component {
    static propTypes = {
        pancakes: PropTypes.array,

        actions: PropTypes.shape({
            makeBreakfast: PropTypes.func
        })
    }

    // ...
}

// `connect` returns a function that you can then call with your component
const connectTo = connect([
    {name: "pancakes", select: getPancakes}
], [
    {name: "actions", makeBreakfast}
]);

export const PancakesConnected = connectTo(Pancakes);
```
