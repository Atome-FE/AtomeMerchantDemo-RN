# Atome paylater react native SDK
## Installation

```sh
npm install react-native-atome-paylater
```

## Usage

```js
import {isAtomeAppInstalled} from 'react-native-atome-paylater';
import {handlePaymentURL} from 'react-native-atome-paylater';

const init = async () => {
  const installed = await isAtomeAppInstalled();
  console.log(installed);
};

handlePaymentURL('url');

React.useEffect(() => {
  init();
}, []);

```

## License

MIT
