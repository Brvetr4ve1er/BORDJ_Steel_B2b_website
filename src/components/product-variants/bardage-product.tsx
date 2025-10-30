import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function BardageProduct({ product }: { product: any }) {
  if (!product || !product.productSpecifications) {
    return <p>Données produit non disponibles.</p>;
  }

  const {
    documentMetadata,
    productSpecifications: specs,
    installationInformation: install,
    chargesEtPorteesAdmissibles: charges,
    caracteristiquesGeometriques: geo,
    stylingGuidelines: style
  } = product;

  return (
    <article className="max-w-6xl mx-auto bg-white text-gray-900 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-6 space-y-4">
          <h2 className="text-lg font-bold" style={{ color: style?.colors?.primary }}>{specs.title}</h2>

          <div>
            <h3 className="font-semibold">{specs.utilisation.heading}</h3>
            <p className="text-sm mt-1">{specs.utilisation.description}</p>
            <ul className="list-disc ml-5 mt-2 text-sm">
              {specs.utilisation.applications.map((a: string, i: number) => <li key={i}>{a}</li>)}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mt-3">{specs.definition.heading}</h3>
            <div className="text-sm mt-1 space-y-1">
              {specs.definition.specifications.map((s: any, i: number) => (
                <p key={i}><strong>{s.parameter}:</strong> {s.value}</p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mt-3">{specs.revetement.heading}</h3>
            <ul className="list-disc ml-5 mt-1 text-sm">
              {specs.revetement.specifications.map((r: any, i: number) => <li key={i}>{r.material}</li>)}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mt-3">{specs.ameIsolante.heading}</h3>
            <p className="text-sm mt-1">{specs.ameIsolante.type}</p>
            <p className="text-sm mt-1"><strong>{specs.caracteristiquesTechniques.conductiviteThermique.label}:</strong> {specs.caracteristiquesTechniques.conductiviteThermique.value}</p>
            <p className="text-sm mt-1"><strong>{specs.caracteristiquesTechniques.densite.label}:</strong> {specs.caracteristiquesTechniques.densite.value}</p>

          </div>

          <div>
            <h3 className="font-semibold mt-3">{specs.caracteristiquesTechniques.reactionAuFeu.label}</h3>
             <ul className="list-disc ml-5 mt-1 text-sm">
                {specs.caracteristiquesTechniques.reactionAuFeu.classifications.map((c: string, i: number) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
          </div>

          <div>
            <h3 className="font-semibold mt-3">{specs.tolerance.heading}</h3>
            <ul className="mt-1 text-sm list-disc ml-5">
              {specs.tolerance.tolerances.map((t: any, i: number) => (
                <li key={i}><strong>{t.parameter}:</strong> {t.value}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4 p-4 border rounded">
            <h4 className="font-semibold">{specs.coefficientIsolationThermique.heading}</h4>
            <div className="overflow-auto mt-2">
              <Table>
                <TableHeader>
                  <TableRow className="bg-accent text-accent-foreground">
                    <TableHead className="text-accent-foreground">Épaisseur (mm)</TableHead>
                    {specs.coefficientIsolationThermique.table.headers.epaisseur_mm.map((h: number) => (
                      <TableHead key={h} className="text-accent-foreground text-center">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {specs.coefficientIsolationThermique.table.data.map((row: any, idx: number) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{row.unit}</TableCell>
                      {specs.coefficientIsolationThermique.table.headers.epaisseur_mm.map((h: number) => (
                        <TableCell key={h} className="text-center">{row.values[h]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mt-4 p-4 border rounded">
            <h4 className="font-semibold">{specs.dimensionnementDuPanneau.heading}</h4>
            <div className="overflow-auto mt-2">
              <Table>
                <TableHeader>
                  <TableRow className="bg-accent text-accent-foreground">
                    {specs.dimensionnementDuPanneau.table.headers.map((h: string) => (
                      <TableHead key={h} className="text-accent-foreground">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {specs.dimensionnementDuPanneau.table.data.map((r: any) => (
                    <TableRow key={r.type}>
                      <TableCell>{r.type}</TableCell>
                      <TableCell className="text-center">{r.longueur_mm}</TableCell>
                      <TableCell className="text-center">{r.largeur_utile_mm}</TableCell>
                      <TableCell className="text-center">{r.epaisseur_mm}</TableCell>
                      <TableCell className="text-center">{r.poids_kg_m2}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        <aside className="lg:col-span-6 space-y-4">
          <div className="p-4 border rounded">
            <h3 className="font-semibold">{install.etancheiteDesRives.heading}</h3>
            <div className="text-sm mt-2 space-y-2">
              {install.etancheiteDesRives.paragraphs.map((p: string, i: number) => <p key={i}>{p}</p>)}
            </div>
          </div>

          <div className="p-4 border rounded">
            <h3 className="font-semibold">{charges.title}</h3>
            <p className="text-xs text-gray-600">{charges.subtitle}</p>
            <div className="mt-3 overflow-auto">
               <Table>
                <TableHeader>
                  <TableRow className="bg-accent text-accent-foreground">
                    <TableHead className="text-accent-foreground" rowSpan={2}>{charges.tableStructure.mainHeaders.col1}</TableHead>
                    <TableHead className="text-accent-foreground" colSpan={2}>{charges.tableStructure.mainHeaders.col2}</TableHead>
                    <TableHead className="text-accent-foreground" colSpan={5}>{charges.tableStructure.mainHeaders.col3}</TableHead>
                  </TableRow>
                  <TableRow className="bg-accent/80 text-accent-foreground">
                    <TableHead className="text-accent-foreground">Kg/m²</TableHead>
                    <TableHead className="text-accent-foreground">daN/m²</TableHead>
                    {charges.tableStructure.subHeaders.epaisseurGroup1.map((h: number) => (
                      <TableHead key={`g1-${h}`} className="text-accent-foreground text-center">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {charges.tableData.map((row: any, idx: number) => (
                    <TableRow key={idx}>
                      <TableCell>{/* Empty for layout */}</TableCell>
                      <TableCell>{row.kg_m2}</TableCell>
                      <TableCell>{row.dan_m2}</TableCell>
                      {Object.keys(row.entraxeGroup1).map(k => (
                        <TableCell key={k} className="text-center">{row.entraxeGroup1[k]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="p-4 border rounded">
            <h3 className="font-semibold">{geo.title}</h3>
            <div className="mt-2 space-y-3 text-sm">
              {geo.diagrams.map((d: any, i: number) => (
                <figure key={i} className="border p-2 text-center">
                  <div className="h-28 bg-gray-50 flex items-center justify-center font-mono text-gray-400">Schéma: {d.caption}</div>
                  <figcaption className="text-xs text-gray-600 mt-1">{d.description}</figcaption>
                </figure>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">{geo.notes}</p>
          </div>
        </aside>
      </div>
    </article>
  );
}
