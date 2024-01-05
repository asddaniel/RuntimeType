//const primitiveType = ['number', 'string', 'boolean', 'function', 'undefined', 'symbol', 'bigint']

export type ObjectType = {
  [key: string]: any;
};

//Ajout de la prise en charge des tableaux en modifiant la fonction getObjectTypes pour
//qu'elle traite également les tableaux de manière récursive.
// Ajout de la gestion des options (allowOptional et immutable) dans la fonction Type.
// Amélioration de la logique d'erreur dans la fonction Type en utilisant une approche plus claire
export type TypeOptions = {
  errorCallback?: (expectedType: string, receivedType: string) => void;
  immutable?: boolean;
  allowOptional?: boolean;
};

export function getObjectTypes(obj: ObjectType): ObjectType {
  const result: ObjectType = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      //  Utilisation de la ternaire pour assigner le type
      result[key] =
        typeof value === "object" && value !== null
          ? getObjectTypes(value)
          : Array.isArray(value)
          ? value.map((item: any) =>
              typeof item === "object" && item !== null
                ? getObjectTypes(item)
                : typeof item
            )
          : typeof value;
    }
  }

  return { ...result };
}

export const getDataType = (data: any): string | ObjectType => {
  // Utilisation de typeof pour obtenir le type d'une variable plutôt que de répéter typeof plusieurs fois.
  const type = typeof data;

  //  Utilisation de la ternaire pour gérer le cas "object"
  return type === "object" && data !== null && !Array.isArray(data)
    ? getObjectTypes(data)
    : type;
};

const isEqual = (object1: any, object2: any): boolean => {
  // Utilisation de l'opérateur de comparaison directe
  // Remplacement de la boucle manuelle de comparaison de caractères par une simple comparaison de chaînes avec JSON.stringify pour améliorer la lisibilité.
  return JSON.stringify(object1) === JSON.stringify(object2);
};

export const Type = <T>(initialValue: T, options?: TypeOptions): T => {
  let hasSetType = false;
  let initialData = JSON.parse(JSON.stringify(initialValue));
  let data: any = {};
  if (typeof initialValue != "object" || initialValue === null) {
    data = initialData;
    //initialdata = val.value
  } else {
    const result: ObjectType = {};
    for (const key in initialValue) {
      if (initialValue.hasOwnProperty(key)) {
        const value = initialValue[key];
        if (typeof value === "object" && value !== null) {
          result[key] = Type(value, options);
        } else {
          result[key] = value;
        }
      }
    }
    initialData = result;
    data = initialData;
  }
  const val = new Proxy(data, {
    set: (target, prop, value) => {
      // Si l'option immutable est activée, empêche les modifications
      if (options?.immutable) {
        throw new Error("Cannot modify immutable object");
      }

      if (!hasSetType && !options?.allowOptional) {
        // Si le type n'a pas été défini et que allowOptional est à false,
        // lance une erreur pour tentative de définir une propriété optionnelle
        throw new Error(
          `Property '${String(prop)}' is not allowed to be optional`
        );
      }

      // Si le type n'a pas encore été défini, compare les types
      if (!hasSetType) {
        hasSetType = true;
        const expectedType = JSON.stringify(getDataType(initialData[prop]));
        const receivedType = JSON.stringify(getDataType(value));

        if (!isEqual(getDataType(initialData[prop]), getDataType(value))) {
          // Si les types ne correspondent pas, déclenche une erreur ou appelle la fonction errorCallback
          if (options?.errorCallback) {
            options.errorCallback(expectedType, receivedType);
          } else {
            throw new Error(
              `Type ${receivedType} is not assignable to type ${expectedType}`
            );
          }
        }
      } else if (!isEqual(getDataType(target[prop]), getDataType(value))) {
        // Si le type a été défini, compare les types lors de chaque modification
        const expectedType = JSON.stringify(getDataType(target[prop]));
        const receivedType = JSON.stringify(getDataType(value));

        // Déclenche une erreur ou appelle la fonction errorCallback si les types ne correspondent pas
        if (options?.errorCallback) {
          options.errorCallback(expectedType, receivedType);
        } else {
          throw new Error(
            `Type ${receivedType} is not assignable to type ${expectedType}`
          );
        }
      }
      // Applique la modification à la propriété de l'objet
      target[prop as keyof T] = value;
      return true;
    },
  });

  return val;
};
