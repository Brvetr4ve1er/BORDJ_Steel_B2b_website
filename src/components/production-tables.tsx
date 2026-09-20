
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { charpenteCapacity } from '@/config/company-data';

/**
 * The capacity rows are no longer written out here. They used to be three
 * hardcoded <TableRow>s whose numbers contradicted the hero stat on this same
 * page, with nothing connecting the two — see the CLIENT NOTE above
 * `charpenteCapacity` in src/config/company-data.ts.
 *
 * The norms table below is left as markup on purpose: it is prose, not figures,
 * and nothing else on the site restates it.
 */
function tonnage(row: (typeof charpenteCapacity.eightHourTable)[number]): string {
  const fr = (n: number) => n.toLocaleString('fr-FR');
  return row.perMonth === null
    ? `${fr(row.perYear)} T/an`
    : `${fr(row.perYear)} T/an (${fr(row.perMonth)} T/mois)`;
}

export function ProductionTables() {
  return (
    <div className="space-y-8">
      <Card className="bg-background rounded-lg shadow-md overflow-hidden">
        <CardHeader className="bg-accent text-accent-foreground px-4 py-3">
          <CardTitle className="text-lg font-bold">CAPACITÉ DE PRODUCTION (EN 08 HEURES)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50">
                <TableHead className="px-4 py-3 font-bold text-primary">Produits</TableHead>
                <TableHead className="px-4 py-3 font-bold text-primary">Tonnes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {charpenteCapacity.eightHourTable.map((row) => (
                <TableRow key={row.product} className="hover:bg-secondary/20">
                  <TableCell className="px-4 py-3">{row.product}</TableCell>
                  <TableCell className="px-4 py-3">{tonnage(row)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="bg-background rounded-lg shadow-md overflow-hidden">
        <CardHeader className="bg-accent text-accent-foreground px-4 py-3">
          <CardTitle className="text-lg font-bold">CONFORMITÉ AUX NORMES ET RÈGLES</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50">
                <TableHead className="px-4 py-3 font-bold text-primary">Normes</TableHead>
                <TableHead className="px-4 py-3 font-bold text-primary">Règles</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="px-4 py-4">
                  <ul className="space-y-1 list-disc list-inside">
                    <li>EN</li>
                    <li>AFNORE</li>
                    <li>ISU</li>
                    <li>DIN et annexes</li>
                  </ul>
                </TableCell>
                <TableCell className="px-4 py-4">
                  <ul className="space-y-1 list-disc list-inside">
                    <li>PRA 90</li>
                    <li>Neige-séisme 3</li>
                    <li>CTCM</li>
                  </ul>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
