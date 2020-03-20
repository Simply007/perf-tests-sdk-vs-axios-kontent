# Kontent Delivery SDK vs Direct calls performance tests

## Get starter

1. make copy project `.env.template` and name it `.env`

1. Install packages

  ```sh
  npm install / yarn
  ```

1. Run test

  ```sh
  npm start / yarn start
  ```

### Output showcase

```plain
Starting test
Loading all items test for en-US
Loading en-US: 377.685ms
All items loaded for en-US
Unioning items for en-US
For language en-US it is 30 item + 3 linked items
All items unioned for en-US
Unioning en-US: 5.308ms
In total after union 33
Loading all items test for es-ES
Loading es-ES: 245.420ms
All items loaded for es-ES
Unioning items for es-ES
For language es-ES it is 33 item + 3 linked items
All items unioned for es-ES
Unioning es-ES: 1.531ms
In total after union 36
Total items: 69
Delivery SDK test: 716.256ms
$ node axios.js
Starting test
Loading all items test for en-US
Loading en-US: 272.592ms
All items loaded for en-US
In total after union 33
Loading all items test for es-ES
Loading es-ES: 152.328ms
All items loaded for es-ES
In total after union 36
Total items: 69
Axios test: 432.458ms
Done in 2.49s.
```
