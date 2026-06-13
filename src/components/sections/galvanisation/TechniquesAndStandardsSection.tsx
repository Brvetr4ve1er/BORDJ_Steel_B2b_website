"use client";

// Editorial + tabular "Techniques et Normes" block for the Galvanisation page.
// Content preserved verbatim from the original monolithic page component.
export function TechniquesAndStandardsSection() {
  return (
    <div className="bg-background rounded-2xl shadow-xl overflow-hidden h-full">
        <div className="bg-accent px-8 py-10">
          <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground mb-4">
            TECHNIQUES ET NORMES
          </h2>
          <p className="text-xl text-accent-foreground/80 italic font-medium">
            « Une technique qui repose sur un choix pertinent de l'acier »
          </p>
        </div>
        <div className="px-8 py-10 space-y-8">
          <div className="prose max-w-none">
            <p className="text-foreground leading-relaxed text-justify mb-4 text-lg">
              Le revêtement d'une pièce galvanisée à chaud (épaisseur, structure et aspect) varie
              principalement suivant la composition de l'acier. Sa teneur en silicium et en phosphore
              joue un rôle important sur sa réactivité vis-à-vis du zinc liquide.
            </p>
            <p className="text-foreground leading-relaxed mb-2 text-lg">
              D'où l'importance de bien choisir l'acier que l'on va galvaniser.
            </p>
            <p className="text-foreground leading-relaxed text-lg">
              La norme <span className="font-semibold">NF A 35-503 (2008)</span> définit 3 catégories d'aciers aptes à la galvanisation,
              suivant la teneur de ces deux éléments.
            </p>
          </div>
          <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
            <h3 className="text-xl font-bold text-primary mb-3">
              Les aciers de catégorie A et catégorie B sont normalement réactifs :
            </h3>
            <p className="text-foreground leading-relaxed text-lg">
              Après galvanisation, ils ont un bel aspect uniforme avec des épaisseurs au moins conformes
              à la norme <span className="font-semibold">NF EN ISO 1461</span>.
            </p>
          </div>
          <div className="overflow-x-auto">
            <h3 className="text-lg font-bold text-accent-foreground bg-accent px-4 py-3 mb-0">
              La Norme AFNOR NF 35-503 : Ce qu'il faut en retenir(*)
            </h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border px-4 py-3 text-center font-bold text-sm">Aspect</th>
                  <th className="border border-border px-4 py-3 text-center font-bold text-sm">
                    Résistance mécanique<br/>du revêtement
                  </th>
                  <th className="border border-border px-4 py-3 text-center font-bold text-sm">
                    Masse de revêtement
                  </th>
                  <th className="border border-border px-4 py-3 text-center font-bold text-sm">Utilisation</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-background hover:bg-muted/50 transition-colors">
                  <td className="border border-border px-4 py-4">
                    <div className="flex items-center">
                      <span className="bg-accent text-accent-foreground font-bold px-3 py-1 rounded mr-3">Cat. A</span>
                      <span className="text-foreground">Excellent</span>
                    </div>
                  </td>
                  <td className="border border-border px-4 py-4 text-center text-foreground">Excellente</td>
                  <td className="border border-border px-4 py-4 text-center text-foreground">
                    Standard, conforme au<br/>minimum de la norme
                  </td>
                  <td className="border border-border px-4 py-4 text-center text-foreground">
                    Recherche esthétique et<br/>anticorrosion
                  </td>
                </tr>
                <tr className="bg-muted/50 hover:bg-muted/80 transition-colors">
                  <td className="border border-border px-4 py-4">
                    <div className="flex items-center">
                      <span className="bg-accent text-accent-foreground font-bold px-3 py-1 rounded mr-3">Cat. B</span>
                      <span className="text-foreground">Bon</span>
                    </div>
                  </td>
                  <td className="border border-border px-4 py-4 text-center text-foreground">Bonne</td>
                  <td className="border border-border px-4 py-4 text-center text-foreground">
                    Standard, Généralement<br/>supérieure au minimum de la<br/>norme
                  </td>
                  <td className="border border-border px-4 py-4 text-center text-foreground">
                    Recherche anticorrosion et<br/>aspect correct
                  </td>
                </tr>
                <tr className="bg-background hover:bg-muted/50 transition-colors">
                  <td className="border border-border px-4 py-4">
                    <div className="flex items-center">
                      <span className="bg-accent text-accent-foreground font-bold px-3 py-1 rounded mr-3">Cat. C</span>
                      <span className="text-foreground">Moyen</span>
                    </div>
                  </td>
                  <td className="border border-border px-4 py-4 text-center text-foreground">Moyenne</td>
                  <td className="border border-border px-4 py-4 text-center text-foreground">
                    Plus forte - pour milieux<br/>agressifs
                  </td>
                  <td className="border border-border px-4 py-4 text-center text-foreground">
                    Recherche optimum de<br/>protection
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-muted-foreground mt-2 italic">(*)Ces éléments sont purement indicatifs.</p>
          </div>
          <div className="bg-destructive/10 border-l-4 border-destructive p-6 rounded-r-lg">
            <h3 className="text-xl font-bold text-primary mb-3">
              Les aciers de catégorie C sont plus réactifs :
            </h3>
            <p className="text-foreground leading-relaxed mb-3 text-lg">
              Leur aspect après galvanisation est plus mat, avec possibilité de zones grisées marbrées
              ou rugueuses, sans conséquence sur la tenue à la corrosion.
            </p>
            <p className="text-foreground leading-relaxed text-lg">
              Les épaisseurs atteignent 120 à 200 microns, voire plus. Elles peuvent dépasser 200
              microns pour des pièces nécessitant des temps d'immersion plus importants.
            </p>
          </div>
          <div className="overflow-x-auto">
            <h3 className="text-lg font-bold text-accent-foreground bg-accent px-4 py-3 mb-0">
              Classification des aciers suivant leur teneur en silicium et en phosphore (*)
            </h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border px-4 py-3 text-center font-bold text-sm">Elément %</th>
                  <th className="border border-border px-4 py-3 text-center font-bold text-sm">Catégorie A</th>
                  <th className="border border-border px-4 py-3 text-center font-bold text-sm">Catégorie B</th>
                  <th className="border border-border px-4 py-3 text-center font-bold text-sm">Catégorie C</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-background hover:bg-muted/50 transition-colors">
                  <td className="border border-border px-4 py-3 text-center font-bold text-primary">Si</td>
                  <td className="border border-border px-4 py-3 text-center text-foreground">&lt; 0.030</td>
                  <td className="border border-border px-4 py-3 text-center text-foreground">&lt; 0.040</td>
                  <td className="border border-border px-4 py-3 text-center text-foreground">0.14 &lt; Si &lt; 0.25</td>
                </tr>
                <tr className="bg-muted/50 hover:bg-muted/80 transition-colors">
                  <td className="border border-border px-4 py-3 text-center font-bold text-primary">
                    Si +2.5 P<br/>P
                  </td>
                  <td className="border border-border px-4 py-3 text-center text-foreground">&lt; 0.090</td>
                  <td className="border border-border px-4 py-3 text-center text-foreground">&lt; 0.110</td>
                  <td className="border border-border px-4 py-3 text-center text-foreground">0.035</td>
                </tr>
              </tbody>
            </table>
            <div className="bg-accent text-accent-foreground px-4 py-3 mt-0 text-center text-sm">
              Par accord à la commande, l'analyse sur produit peut être effectuée.
            </div>
          </div>
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground italic">(*) Extrait de la norme NF A 35-503</p>
          </div>
        </div>
      </div>
  );
}
