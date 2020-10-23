---
id: audit
title: Performance Audit
sidebar_label: Performance Audit
---

###### Here you will find the whole performance audit of another todo list website (written in french).

##### Audited application : **http://todolistme.net**

![Capture d’écran 2020-10-16 à 13.31.13](static/img/Capture d'écran 2020-10-16 à 13.31.13.png)


### Outils de mesure

##### • Google Chrome

##### • Console de développement

##### • Lighthouse



### Performances

![Capture d’écran 2020-10-16 à 13.48.58](/Users/a.jacquier.bret/Documents/OPENCLASSROOMS/P8/todo-list-doc/static/img/Capture d'écran 2020-10-16 à 13.48.58.png)

![Capture d’écran 2020-10-16 à 13.47.47](/Users/a.jacquier.bret/Documents/OPENCLASSROOMS/P8/todo-list-doc/static/img/Capture d'écran 2020-10-16 à 13.47.47.png)



Sur une échelle de 0 à 100, la performance globale du site web est de 49. Cette mesure inclue les résultats de sections du site indirectement liées à son objectif premier, à savoir une application web de « Todo List ».



 **Voici le détails de ces résultats :**

- Premier rendu de contenu : **0.5s**

- Index de vitesse : **2s**
- Rendu du plus large contenu : **2.9s**
- Délai avant interaction : **3.7s**
- Temps total de blocage : **0.86s**
- Décalage cumulatif de la mise en page : **0.22s**

 



**Voici le détails des recommandations proposées par Lighthouse :**

- Utiliser des formats d’images de nouvelle génération (jpeg2000, Jpeg XR, WebP…)
  - Gain de temps estimé : **~ 0.92s**
- Supprimer le code Javascript inutilisé
  - Gain de temps estimé : **~ 0.48s**

- Utiliser le protocole HTTP/2
  - Gain de temps estimé : **~ 0.34s**
- Utiliser les méthodes de « préconnexion » aux ressources distantes
  - Gain de temps estimé : **~ 0.13s**





### Performances ciblées sur l’application « TodoListMe »



Le temps nécessaire au chargement des ressources HTML, Javascript, CSS, ainsi que des assets (JPG, PNG…) est d’environ 1,25s. Le reste des ressources comprend le chargement de données tierces telles que l’API de Google Ads, des extensions Google Chrome, des plugins Facebook et Twitter, elles ne sont donc pas prises en compte dans le rapport de performances globales de l’application.
 Les ressources les plus longues à charger son majoritairement les assets, et donc pour la plupart, les images utilisées au sein du site.
 Les ressources les plus rapides à charger sont les fichiers de code Javascript et CSS, ainsi que le code HTML.

 Passé la récupération des données distantes au chargement de la page, nous pouvons noter que durant les 6,9 secondes de capture des performances de l’application, environ 4,9s concernent l’inactivité de l’utilisateur, 0,8s concernent l’éxécution du code Javascript, et 0,7s concernent les temps de rendu et de « painting » de la page. Quant aux 0,4s restantes, elles concernent le temps utilisé par le système.

 Les différences notables en termes de performance entre cette application de « todo list » et la notre, réside dans l’optimisation du code et des ressources. Ce site web utilise des ressources via CDN, ce qui, dans la plupart du temps, permet d’obtenir un code préalablement minifié, ainsi que des assets compressés. Dans notre cas, aucune technologie de réduction de la taille du code et des ressources n’est utilisée.



## CONCLUSION DE L’AUDIT

![Capture d’écran 2020-10-23 à 13.03.10](/Users/a.jacquier.bret/Documents/OPENCLASSROOMS/P8/todo-list-doc/static/img/Capture d'écran 2020-10-23 à 13.03.10.png)



Pour optimiser notre application, et dans l’objectif de la rendre le plus « scalable » possible, la plus importante tâche est d’optimiser les performances du code (voir image ci-dessus), est donc de réduire son temps d’exécution, ce qui se traduit par une connaissance approfondie des mécanismes offerts par le langage en question, et in fine une utilisation plus adéquate des méthodes et fonctions offertes par celui-ci. Mais aussi par le biais d’outils permettant la « minification » et la mise en cache des ressources. Quant au temps de rendu et de « painting », il est crucial d’éviter au maximum l’utilisation d’images non compressées au sein de nos méthodes de rendu, ainsi que de simplement minimiser les effets visuels associés à l’exécution des fonctions offertes par notre application, effets qui, de fait, alourdissent la note du site web audité en termes de vitesse d’exécution (confirmé par le temps de rendu des effets utilisés. ~0.7s).