# Bordj Steel — Points à confirmer avant la mise en ligne

Document établi le 26 octobre 2026, à l'attention de Bordj Steel (Bordj Bou Arréridj,
groupe Condor).

Le nouveau site est achevé sur le plan technique. Ce qui reste à régler ne relève plus du
développement : il s'agit de chiffres, de fichiers et d'une décision de mise en ligne que
seule votre équipe peut fournir.

Chaque point est posé ci-dessous sous forme de question, avec les options possibles. Vous
pouvez répondre directement dans ce document, en cochant une option ou en inscrivant la
valeur retenue. Aucune réponse ne demande de connaissance technique : nous nous chargeons
de la mise en œuvre.

---

## Récapitulatif

| N° | Question | Ce qu'elle débloque | Réponse attendue |
|---|---|---|---|
| 1 | Nom de domaine définitif du site | La mise en ligne et le formulaire de contact | Une option |
| 2 | Classement au feu des panneaux sandwich | Une contradiction publiée aujourd'hui | Une option + le document justificatif |
| 3 | Capacité annuelle de galvanisation | Trois valeurs différentes publiées | Une valeur |
| 4 | Capacité annuelle de charpente | Deux valeurs différentes publiées | Une valeur (ou deux, avec leur régime) |
| 5 | Capacité annuelle PRS | Deux valeurs différentes publiées | Une valeur |
| 6 | Cohérence tonnes/mois et tonnes/an (charpente) | Un calcul qui ne tombe pas juste | Une valeur mensuelle |
| 7 | Dimensions des bains et longueur maximale de pièce | Deux séries de dimensions publiées | Une série |
| 8 | « Bains de traitement : 13 » — nombre ou longueur ? | Un chiffre dont l'unité est ambiguë | Une précision |
| 9 | Les cinq numéros de téléphone | Des coordonnées jamais confirmées | Validation ligne par ligne |
| 10 | Les trois certificats ISO en PDF | Trois boutons de téléchargement désactivés | Trois fichiers |
| 11 | Catalogues en anglais et en arabe | Deux liens de téléchargement désactivés | Deux fichiers |
| 12 | Photo de la cornière d'angle extérieur | Une fiche produit sans visuel | Une photo |
| 13 | Identité de « Tazedj » | Un logo absent dans le carrousel | Une confirmation + un logo |
| 14 | Dernière entrée de la frise historique (2025) | Une date qui vieillit | Une précision |
| 15 | Dates de publication des deux offres d'emploi | Deux dates approximatives affichées | Deux dates |

Les points **1 et 2** sont ceux qui ne peuvent pas attendre. Le premier conditionne la
mise en ligne elle-même ; le second concerne une information de sécurité actuellement
publiée en deux versions contradictoires.

---

## 1. Quel sera le nom de domaine définitif du site ?

C'est la décision qui conditionne toutes les autres opérations de mise en ligne.

Voici l'état constaté des trois adresses en jeu :

| Adresse | Vers quoi elle pointe | État constaté |
|---|---|---|
| `bordj-steel.com` | `10.45.72.212` | Adresse **privée** (réseau interne) : elle ne sert rien publiquement. Une personne extérieure n'atteint aucune page. |
| `bordjsteel.dz` | `41.111.205.14` | Serveur réel, qui répond — mais avec un **certificat de sécurité expiré**, et il sert encore l'**ancien** site. |
| `bordjsteelb2b.netlify.app` | Hébergeur du nouveau site | C'est là que le **nouveau** site est déployé aujourd'hui. |

Deux conséquences concrètes :

- L'adresse configurée actuellement comme adresse officielle du site est
  `bordj-steel.com`, c'est-à-dire une adresse qui ne peut servir personne. C'est pourtant
  elle qui est déclarée aux moteurs de recherche.
- Un visiteur qui tape `bordjsteel.dz` voit un **avertissement de sécurité de son
  navigateur avant d'avoir vu la moindre page**, à cause du certificat expiré. C'est le
  cas aujourd'hui, sur l'ancien site, et cela le resterait sur le nouveau si rien n'est
  fait.

À noter : toutes les adresses e-mail et l'ensemble des textes du site utilisent
`bordjsteel.dz`.

**Point important — le formulaire de contact en dépend.** Le formulaire du nouveau site
n'enverra aucun message tant que cette question n'est pas tranchée. Le service d'envoi
d'e-mails exige que le domaine expéditeur soit vérifié par une configuration DNS ; cette
vérification ne peut être faite qu'une fois le domaine retenu. En attendant, le formulaire
n'annonce jamais un envoi qu'il n'a pas effectué : il affiche l'adresse e-mail directe pour
que le visiteur puisse écrire. Le site promet une réponse sous 24 heures ; aujourd'hui ce
message ne part donc pas par le formulaire.

**Veuillez cocher une option :**

- [ ] **Option A — `bordjsteel.dz`** devient l'adresse du nouveau site. Cohérent avec les
      e-mails et tous les textes. Demande : renouveler le certificat de sécurité, et
      faire pointer le domaine vers le nouveau site (l'ancien est alors remplacé).
- [ ] **Option B — `bordj-steel.com`** devient l'adresse du nouveau site. Demande :
      rendre ce domaine accessible publiquement (il pointe aujourd'hui vers une adresse
      interne), puis mettre les textes et les e-mails en cohérence.
- [ ] **Option C — conserver `bordjsteelb2b.netlify.app`** à titre provisoire, le temps de
      décider. Le site fonctionne, mais l'adresse n'est pas commerciale et la question
      reviendra.
- [ ] Autre : ________________________________

**Merci de préciser également :** qui, chez vous ou chez votre prestataire, administre la
zone DNS et le certificat du domaine retenu ? Nous avons besoin de ce contact pour
procéder.

---

## 2. Classement au feu des panneaux sandwich — deux valeurs contradictoires sont publiées

**C'est le point le plus sensible de ce document.**

Le site affiche aujourd'hui, sur les pages panneaux sandwich, deux informations qui ne
peuvent pas être vraies en même temps :

| Où | Ce qui est écrit |
|---|---|
| Bandeau de chiffres clés de la page Panneaux sandwichs | **« B, S2-d0 »**, présenté comme la réaction au feu du produit |
| Tableaux de caractéristiques produit, ligne « Réaction au feu » | **les deux valeurs dans la même cellule** : « B3 : standard » et « B,S2-d0 » |

Ce ne sont pas deux manières de dire la même chose. **B3 est la classe des matériaux
facilement inflammables.** B-s2,d0 est, à l'inverse, un classement de bonne tenue au feu.
Les deux sont en ligne simultanément.

Il faut insister sur un point : la contradiction n'est pas seulement entre le bandeau et les
tableaux. **Elle est à l'intérieur d'une même cellule** des tableaux de caractéristiques,
qui annonce les deux classements l'un sous l'autre, sans indiquer lequel s'applique. Un
lecteur attentif ne peut pas trancher. La notation varie en outre d'une page de produit à
l'autre (« B,S2-d0 », « B-S2-d0 », « B, S2-d0 »), ce qui mérite d'être uniformisé en même
temps.

Pourquoi cela compte, dit simplement : le classement au feu est l'une des premières
caractéristiques qu'un bureau d'études, un maître d'ouvrage ou un contrôleur technique
vérifie, en particulier pour des chambres froides et du bardage. Deux déclarations
opposées sur une même page produisent l'un ou l'autre de ces effets, selon le lecteur :

- un prescripteur conclut que l'information n'est pas fiable et écarte le produit de son
  appel d'offres ;
- ou bien il retient la valeur favorable, la reporte dans son dossier, et la différence
  apparaît plus tard — au moment où elle coûte le plus cher.

Dans les deux cas, l'entreprise perd quelque chose. C'est pourquoi ce point doit être
tranché avant la mise en ligne, et non après.

**Veuillez cocher une option :**

- [ ] **Option A — B-s2,d0 est le classement correct** pour toute la gamme. Les tableaux
      sont corrigés. *Merci de joindre la référence du document justificatif
      (procès-verbal d'essai, déclaration de performance ou équivalent).*
- [ ] **Option B — « B3 : standard » est le classement correct** pour la gamme standard,
      et B-s2,d0 correspond à une version spécifique. *Merci de préciser laquelle :
      quels produits, quelles épaisseurs, quelle âme isolante.*
- [ ] **Option C — le classement dépend de l'âme isolante** (par exemple PUR ou PIR).
      *Merci de fournir la correspondance, produit par produit ; nous l'afficherons sous
      forme de tableau.*
- [ ] Autre : ________________________________

Nous ne pouvons ni choisir ni deviner à votre place : il s'agit d'une caractéristique
certifiée de votre produit. En l'absence de réponse, la seule solution que nous pourrions
vous proposer serait de retirer provisoirement toute mention de classement au feu, plutôt
que de laisser deux valeurs contradictoires en ligne — une solution commercialement
mauvaise, puisque c'est une information que vos clients recherchent. Votre réponse est
nettement préférable.

---

## 3. Quelle est la capacité annuelle de galvanisation ?

Trois valeurs différentes sont publiées en ce moment, pour la même grandeur :

| Valeur affichée | Où elle apparaît aujourd'hui |
|---|---|
| **60 000 T/an** | Page d'accueil (bandeau de chiffres) et page de présentation des unités |
| **25 000 tonnes/an** | Page Galvanisation : chiffre clé et sous-titre |
| **20 000 t/an** | Page Galvanisation : texte courant |

Un visiteur qui parcourt deux pages voit donc deux chiffres, et un écart de 1 à 3. Aucune
vérification technique ne permet de choisir à votre place : il s'agit de la capacité de
votre propre installation.

**Valeur à retenir : ______________ T/an**

- [ ] Cette valeur est à afficher partout, à l'identique.
- [ ] Les écarts correspondent à des régimes de marche différents. Dans ce cas, merci de
      préciser lequel pour chaque valeur (nous les afficherons alors avec leur mention,
      par exemple « en deux équipes ») : ________________________________

---

## 4. Quelle est la capacité annuelle de charpente métallique ?

Deux valeurs sont publiées, sur la même page :

| Valeur affichée | Où elle apparaît aujourd'hui |
|---|---|
| **25 000 T/an** | Bandeau d'en-tête de la page Charpente métallique |
| **12 000 T/an** | Tableau de capacité de production de la même page |

**Valeur à retenir : ______________ T/an**

- [ ] Une seule valeur est juste ; l'autre est à supprimer.
- [ ] Les deux sont justes mais ne décrivent pas le même régime de marche. Dans ce cas,
      merci d'indiquer le régime associé à chacune, afin que le site le précise au lieu
      de laisser croire à une erreur : ________________________________

---

## 5. Quelle est la capacité annuelle de la ligne PRS ?

| Valeur affichée | Où elle apparaît aujourd'hui |
|---|---|
| **3 000 T/an** | Bandeau d'en-tête de la page Charpente métallique |
| **2 000 T/an** | Tableau de capacité de production de la même page |

**Valeur à retenir : ______________ T/an**

---

## 6. Capacité mensuelle de charpente : le calcul publié ne tombe pas juste

Le site écrit, dans la présentation des unités : **« 1500 T/mois (25000 T/an) »**.

Or **1 500 × 12 = 18 000**, et non 25 000. Par ailleurs, le tableau de la page produit
indique **1 000 T/mois**. Il y a donc trois chiffres mensuels ou annuels qui ne se
recoupent pas.

C'est le genre de détail qu'un acheteur industriel vérifie de tête, en lisant la page.

**Veuillez indiquer :**

- Capacité mensuelle à retenir : ______________ T/mois
- [ ] Nous recalculons la valeur annuelle à partir de ce chiffre, afin que les deux
      concordent toujours.
- [ ] La valeur annuelle à retenir est celle de la question 4, et la mention mensuelle
      doit être retirée pour éviter toute contradiction.

---

## 7. Dimensions des bains de galvanisation et longueur maximale de pièce

Deux séries de dimensions sont publiées :

| Dimensions du bain | Longueur maximale de pièce |
|---|---|
| **12 × 1,5 × 3 m** | **13 m** |
| **13 × 1,8 × 3,5 m** | **15 m** |

Ces valeurs figurent parmi les premières informations qu'un client cherche : elles
déterminent si sa pièce passe ou non.

- Dimensions du bain à retenir : ______ × ______ × ______ m
- Longueur maximale de pièce à retenir : ______ m

---

## 8. « Bains de traitement : 13 » — s'agit-il d'un nombre de bains ou d'une longueur ?

Le site affiche un chiffre clé « Bains de traitement : 13 », avec une unité de longueur.
Or 13 ressemble ici à un **nombre de bains**, et l'unité de longueur semble provenir d'une
confusion avec la longueur de 13 m évoquée à la question 7.

- [ ] Il s'agit bien du **nombre** de bains de la ligne : ______ bains.
- [ ] Il s'agit d'une **longueur**, et la valeur correcte est : ______ m.
- [ ] Ce chiffre n'a pas lieu de figurer et peut être retiré.

---

## 9. Validation des cinq numéros de téléphone

Cinq numéros de téléphone sont publiés sur le site. Ils n'ont jamais été confirmés par vos
équipes. Nous préférons ne pas les recopier ici, pour éviter de propager une erreur
éventuelle : ils figurent sur la page **Contact** du site, et nous vous invitons à les lire
sur cette page.

**Pour chaque ligne publiée, merci d'indiquer :**

| Ligne affichée sur la page Contact | Numéro correct | Service / interlocuteur | À conserver ? |
|---|---|---|---|
| 1 | | | oui / non |
| 2 | | | oui / non |
| 3 | | | oui / non |
| 4 | | | oui / non |
| 5 | | | oui / non |

Si la page Contact affiche plus de lignes que les cinq ci-dessus, merci d'ajouter les
lignes manquantes au tableau.

**Merci de préciser aussi :** quelle ligne doit être mise en avant comme contact
commercial principal ?

---

## 10 à 12. Fichiers à nous transmettre

Pour ces trois points, aucune modification du site n'est nécessaire : **le site gère déjà
proprement l'absence de ces fichiers**, et il suffit de nous les transmettre pour que les
éléments correspondants s'activent. Aucun lien du site ne renvoie aujourd'hui vers une page
d'erreur.

| N° | Ce qui est attendu | Nom de fichier attendu | Comportement actuel du site |
|---|---|---|---|
| 10 | Certificat **ISO 9001** (PDF) | `Bordj-Steel-ISO-9001.pdf` | La fiche affiche un bouton désactivé « Bientôt disponible » au lieu d'un lien mort |
| 10 | Certificat **ISO 14001** (PDF) | `Bordj-Steel-ISO-14001.pdf` | Idem |
| 10 | Certificat **ISO 45001** (PDF) | `Bordj-Steel-ISO-45001.pdf` | Idem |
| 11 | **Catalogue en anglais** (PDF) | Même forme de nom que le catalogue français existant, `Bordj-Steel-Catalogue-FR.pdf` (nous confirmerons le nom exact à la réception) | Le lien est déjà désactivé plutôt que cassé ; seule la version française existe |
| 11 | **Catalogue en arabe** (PDF) | Idem | Idem |
| 12 | **Photo de la « Cornière d'angle extérieur »** | — | La fiche affiche « Photo à venir » |

Précision sur le point 12 : cette fiche montrait auparavant la photo de la cornière
d'angle **intérieur**, c'est-à-dire la photo d'une **autre pièce**. Nous avons retiré
cette image plutôt que de laisser un acheteur se tromper de produit. Une seule photo de
la pièce extérieure suffit à compléter la fiche.

---

## 13. Qui est « Tazedj » ?

Le carrousel de références comporte une entrée « Tazedj » dont le logo est absent. Nous
n'avons pas pu l'identifier avec certitude : le nom de domaine correspondant ne répond pas,
et le résultat le plus proche renvoie à une marque de boissons sans rapport avec vos
activités. Nous avons donc préféré afficher le nom en texte, plutôt que de publier le logo
d'une entreprise qui n'est pas la bonne.

- [ ] Il s'agit bien d'une référence à conserver. Dénomination exacte :
      ________________________________ — merci de joindre le logo.
- [ ] Cette entrée doit être retirée du carrousel.

---

## 14. Dernière entrée de la frise historique

La frise « notre histoire » se termine sur une entrée datée de **2025**. Telle quelle, elle
vieillira à chaque mois qui passe.

- [ ] Ajouter une entrée plus récente. Événement et date à afficher :
      ________________________________
- [ ] Reformuler la dernière entrée pour qu'elle ne porte pas de date.
- [ ] La laisser en l'état.

---

## 15. Dates de publication des deux offres d'emploi

La page Recrutement publie deux offres d'emploi, chacune accompagnée d'une mention du type
« publiée il y a X mois ». Cette mention est aujourd'hui **approximative** : elle est
reconstituée à partir de ce que la page affichait auparavant, et non d'une date que vous
nous auriez communiquée. Nous ne souhaitons pas la présenter comme exacte.

**Merci d'indiquer, pour chacune des deux offres :**

| Offre | Date réelle de publication | Toujours ouverte ? |
|---|---|---|
| 1 | | oui / non |
| 2 | | oui / non |

- [ ] Les deux offres sont closes et peuvent être retirées de la page.

---

## Comment répondre

Vous pouvez renvoyer ce document complété, ou répondre point par point en reprenant les
numéros. Un retour partiel est utile : chaque réponse débloque immédiatement sa partie du
site.

Par ordre d'effet :

1. **Question 1 (domaine)** — débloque la mise en ligne et, avec elle, le formulaire de
   contact.
2. **Question 2 (classement au feu)** — retire une contradiction d'information technique
   actuellement publiée.
3. **Questions 3 à 8 (chiffres)** — chaque valeur confirmée est ensuite affichée une seule
   fois, de manière identique sur tout le site, de sorte que l'écart ne puisse pas
   réapparaître.
4. **Questions 9 à 15** — validations, fichiers et précisions ; aucune ne bloque la mise en
   ligne.

Nous restons à votre disposition pour tout éclaircissement sur l'un de ces points.
