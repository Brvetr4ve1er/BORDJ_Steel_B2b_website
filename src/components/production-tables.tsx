
"use client";

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

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
              <TableRow className="hover:bg-secondary/20">
                <TableCell className="px-4 py-3">Charpente métallique</TableCell>
                <TableCell className="px-4 py-3">12000 T/an (1 000 T/mois)</TableCell>
              </TableRow>
              <TableRow className="hover:bg-secondary/20">
                <TableCell className="px-4 py-3">Ligne de profilés soudés (PRS)</TableCell>
                <TableCell className="px-4 py-3">2 000 T/an</TableCell>
              </TableRow>
              <TableRow className="hover:bg-secondary/20">
                <TableCell className="px-4 py-3">Mâts et autres produits</TableCell>
                <TableCell className="px-4 py-3">5 000 T/an</TableCell>
              </TableRow>
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
