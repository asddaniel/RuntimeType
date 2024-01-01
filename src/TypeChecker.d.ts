// typeChecker.d.ts

// Déclaration pour le type des objets génériques
export type ObjectType = {
    [key: string]: any;
  };
  
  // Déclaration pour la fonction getObjectTypes
  export function getObjectTypes(obj: ObjectType): ObjectType;
  
  // Déclaration pour la fonction getDataType
  export function getDataType(data: any): string | ObjectType;
  
  // Déclaration pour le type de la fonction de rappel errorCallback
  type ErrorCallback = (expectedType: string, receivedType: string) => void;
  
  // Déclaration pour la fonction Type
  export function Type<T>(
    initialValue: T, 
    errorCallback?: ErrorCallback
  ): T;
  
  // Vous pouvez ajouter d'autres types ou déclarations si nécessaire.
  