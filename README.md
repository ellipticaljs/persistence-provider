ELLIPTICAL REPOSITORY PROVIDER
===========================



## Installation

``` bash

bower install elliptical-repository-provider --save

```

## Usage

```html
<link rel="import" href="bower_components/elliptical-repository-provider/elliptical-repository-provider.html">


```

```js
import RepositoryProvider from 'elliptical-repository-provider';

class MyProvider extends RepositoryProvider{
   constructor(keyName,$persistenceProvider,filterProp){
     super(keyName,$persistenceProvider,filterProp)
   }
   
   _onPost(params){
      //...
   }
   
   _onPut(params){
      //...
   }
   
}