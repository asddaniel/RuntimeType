# Documentation du package `runtimetype`

## Présentation Générale

`runtimetype` est une package de vérification de type pour JavaScript. Elle permet de s'assurer que les valeurs que vous passez à vos fonctions et les propriétés que vous assignez à vos objets sont du type correct au moment de l'execution dans le navigateur. Cela peut vous aider à détecter les erreurs de type et à améliorer la robustesse de votre application. elle complete le travail du typescript en s'assurant des type specifique lors du developpement, en production.

## Comment Utiliser `runtimetype`

Pour utiliser `runtimetype`, vous devez tout d'abord l'installer via npm ou Yarn.
```bash
npm i '@asddaniel/runtimetype' 
```

 Une fois que c'est fait, vous pouvez l'importer dans votre projet et l'utiliser comme suit :
NB: vous devez vous assurer de toujours donner un objet comme parametre de la fonction Type, elle ne supporte pas les primitives
```typescript
import { Type } from '@asddaniel/runtimetype';

// Créer un objet typé avec la valeur initiale "Bonjour"
const message = Type({msg:'Bonjour'});

// Assigner une valeur de type différent à l'objet typé
// Cela déclenchera une erreur de type.
message.msg = 123;
```

### Options Avancées

Vous pouvez également fournir une fonction de rappel `errorCallback` à la fonction `Type` pour gérer les erreurs de type de manière personnalisée. Cette fonction est appelée lorsque le type d'une valeur ne correspond pas au type attendu.

```typescript
import { Type } from '@asddaniel/runtimetype';

// Créer un objet typé avec la valeur initiale "Bonjour"
const message = Type({msg:'Bonjour'}, (expectedType, receivedType) => {
    // Gérer l'erreur de type ici
    console.error(`le type ${receivedType} ne peut pas etre assignee a ${expectedType}`);
});
```

### Types Pris en Charge

`runtimetype` prend en charge les types primitifs suivants :

* `number`
* `string`
* `boolean`
* `function`
* `undefined`
* `symbol`
* `bigint`

Il prend également en charge les types d'objets suivants :

* `array`
* `object`
* `class`



## Exemples d'Utilisation

Voici quelques exemples d'utilisation de `runtimetype` :

* Vérifier le type d'arguments de fonction :
```typescript
import { Type } from '@asddaniel/runtimetype';

function addNumbers(a: number, b: number): number {
    // Vérifier que les arguments sont des nombres
    a = Type({value:a});
    b = Type({value:b});

    return a.value + b.value;
}
```



## Avantages de l'Utilisation de `runtimetype`

Utiliser `runtime` présente plusieurs avantages, notamment :

* Amélioration de la robustesse de votre code : En vous assurant que les valeurs que vous passez à vos fonctions et les propriétés que vous assignez à vos objets sont du type correct et qu'elle ne pourront jamais etre executee avec des valeurs tronquee, vous pouvez réduire le risque d'erreurs de type.
* Amélioration de la lisibilité de votre code : En utilisant `runtimetype`, vous pouvez rendre votre code plus explicite et plus facile à comprendre, car les types des variables et des propriétés sont clairement spécifiés.
* Amélioration de la maintenabilité de votre code : En utilisant `runtimetype`, vous pouvez rendre votre code plus facile à maintenir, car il est plus facile de détecter les erreurs de type et de les corriger.

## Conclusion

`runtimetype` est un outil puissant qui peut vous aider à améliorer la robustesse, la lisibilité et la maintenabilité de votre code JavaScript. Il est facile à utiliser et peut être intégré à votre projet en quelques minutes.