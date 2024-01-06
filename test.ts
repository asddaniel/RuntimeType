import { Type, TypeOptions } from "./src/index";

// Définition d'un objet d'exemple
const sampleObject = {
  nom: "Donald",
  age: 26,
  loisirs: ["lecture", "codage"],
  adresse: {
    ville: "Cotonou",
    pays: "Benin",
  },
};

// Définition d'un tableau d'exemple
const sampleArray = [1, "deux", { cle: "valeur" }];

// Définition des options
const options: TypeOptions = {
  immutable: false, // passez à true pour tester
  errorCallback: (expectedType, receivedType) => {
    console.error(
      `Type error - Expected:  ${expectedType}, Received : ${receivedType}`
    );
  },
  allowOptional: true, // passez à false pour tester
};

// Utiliser la fonction Type avec l'objet d'exemple
const typedObject = Type(sampleObject, options);

// Utiliser la fonction Type avec le tableau d'exemple
const typedArray = Type(sampleArray, options);

// Tester les modifications
try {
  // Modification de l'objet typé (cela devrait fonctionner si les types correspondent)
  typedObject.age = 31;

  // Modification de l'objet typé (ne fonctionne pas, cette ligne devrait déclencher une erreur)
  typedObject.age = "31";

  // Modification du tableau typé (cela devrait fonctionner si les types correspondent)
  typedArray[1] = "trois";

  // Décommentez la ligne ci-dessous pour tester l'immutabilité (cela devrait déclencher une erreur)
  //typedObject.nom = "Jane";
} catch (erreur) {
  console.error(erreur.message);
}

// Afficher les résultats
console.log("Typed Object :", typedObject);
console.log("Typed Array :", typedArray);
