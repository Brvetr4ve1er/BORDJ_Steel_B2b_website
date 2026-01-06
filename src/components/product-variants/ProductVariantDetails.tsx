
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductVariant, ProductVariantSection } from '@/config/product-variant-schema';
import { ProductImageGallery } from '../product-image-gallery';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { OneSupportIcon } from './one-support-icon';
import { TwoSupportsIcon } from './two-supports-icon';

// --- Section Renderers ---

const KeyValueSection: React.FC<{ section: Extract<ProductVariantSection, { type: 'keyValue' }> }> = ({ section }) => (
  <div className="mb-6">
    <h2 className="text-xl font-bold text-accent mb-4">{section.title}</h2>
    {section.items.map((item, index) => (
      <div key={index} className="mb-4">
        <h3 className="font-bold mb-2 text-lg">{item.key}:</h3>
        {item.value.split('\n').map((line, lineIndex) => (
          <p key={lineIndex} className="text-base list-item ml-4">{line}</p>
        ))}
      </div>
    ))}
  </div>
);

const ListSection: React.FC<{ section: Extract<ProductVariantSection, { type: 'list' }> }> = ({ section }) => (
  <div className="mb-6">
    <h3 className="font-bold mb-2 text-lg">{section.title}:</h3>
    <ul className="list-disc ml-5 mt-2 text-base space-y-1">
      {section.items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  </div>
);

const TableSection: React.FC<{ section: Extract<ProductVariantSection, { type: 'table' }> }> = ({ section }) => {
    const isChargesTable = section.title.includes('CHARGES ET PORTÉES');
    const isHibondChargesTable = section.title.includes('HI-BOND');
    const isProprietesTable = section.title.includes('PROPRIÉTÉS');

    if (isHibondChargesTable) {
        // Special render for HI-BOND charges table due to its unique structure
        return (
            <div className="mt-8">
                <h2 className="text-gray-700 text-lg font-bold mb-6">{section.title}</h2>
                <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="bg-red-700 border border-white text-white text-xs font-bold p-2 w-16">EP</th>
                                <th className="bg-red-700 border border-white text-white text-xs font-bold p-2 w-24" dangerouslySetInnerHTML={{ __html: section.headers[1].replace(' ', '<br/>') }} />
                                <th className="bg-red-700 border border-white text-white text-xs font-bold p-2 w-24" dangerouslySetInnerHTML={{ __html: section.headers[2].replace(' ', '<br/>') }} />
                                <th colSpan={10} className="bg-red-700 border border-white text-white text-xs font-bold p-2">{section.headers[3]}</th>
                            </tr>
                            <tr>
                                <th className="bg-red-700 p-0"></th><th className="bg-red-700 p-0"></th><th className="bg-red-700 p-0"></th>
                                {section.headers.slice(4).map((h, i) => <th key={i} className="bg-red-700 border border-white text-white text-xs font-bold p-2 w-20">{h}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {section.rows.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} rowSpan={cellIndex === 0 && (row[0] !== section.rows[rowIndex-1]?.[0]) ? 3 : 1} className={`border border-gray-300 text-center text-sm p-2 ${cellIndex > 2 ? 'bg-gray-200' : 'bg-gray-200 font-bold align-middle'}`}>
                                            {(cellIndex !== 0 || (row[0] !== section.rows[rowIndex-1]?.[0])) ? cell : null}
                                        </td>
                                    )).filter(c => c)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
    
    if(isProprietesTable) {
        return (
             <div className="mb-4 overflow-x-auto">
                <h2 className="text-gray-600 font-bold text-lg mb-4">{section.title}</h2>
                <table className="w-full border-collapse border border-gray-400 text-xs">
                    <thead>
                        <tr>
                            <th rowSpan={2} className="bg-red-700 text-white border border-white p-2 font-bold align-middle">{section.headers[0]}</th>
                            <th rowSpan={2} className="bg-red-700 text-white border border-white p-2 font-bold align-middle" dangerouslySetInnerHTML={{ __html: section.headers[1].replace(' ', '<br/>') }}></th>
                            <th colSpan={4} className="bg-red-700 text-white border border-white p-2 font-bold">{section.headers[2]}</th>
                            <th colSpan={4} className="bg-red-700 text-white border border-white p-2 font-bold">{section.headers[3]}</th>
                            <th colSpan={2} className="bg-red-700 text-white border border-white p-2 font-bold" dangerouslySetInnerHTML={{ __html: section.headers[4].replace(' ', '<br/>') }}></th>
                        </tr>
                        <tr>
                           {(section.subheaders?.['Haut de la tôle en compression'] || []).map((sh, i) => <th key={i} className="bg-red-700 text-white border border-white p-1 font-bold">{sh}</th>)}
                           {(section.subheaders?.['Bas de la tôle en compression'] || []).map((sh, i) => <th key={i} className="bg-red-700 text-white border border-white p-1 font-bold">{sh}</th>)}
                           {(section.subheaders?.['Cisaillement voilement'] || []).map((sh, i) => <th key={i} className="bg-red-700 text-white border border-white p-1 font-bold">{sh}</th>)}
                        </tr>
                    </thead>
                     <tbody>
                        {section.rows.map((row, index) => (
                            <tr key={index}>
                                {row.map((cell, cellIndex) => (
                                     <td key={cellIndex} className="bg-gray-100 border border-gray-400 p-2 text-center">{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
    <div className="mb-4">
        <h3 className="font-bold mb-3 text-lg">{section.title}</h3>
        {section.subtitle && <p className="text-sm text-muted-foreground mb-3">{section.subtitle}</p>}
        <Table>
            <TableHeader>
            <TableRow className="bg-accent text-accent-foreground">
                {section.headers.map((header: string, index: number) => 
                    <TableHead key={index} className="text-accent-foreground" dangerouslySetInnerHTML={{ __html: header.replace('(mm)', '<br/>(mm)').replace('kg/m²', 'Kg/m²').replace('Système de', 'Système de<br/>') }}></TableHead>
                )}
            </TableRow>
            {isChargesTable && (
                <TableRow>
                    <TableHead className="text-center font-semibold" colSpan={2}></TableHead>
                    <TableHead className="text-center font-semibold" colSpan={section.icon === 'two-supports' ? (section.headers.length - 2) / 2 : section.headers.length - 2}>
                        {section.icon === 'one-support' && <OneSupportIcon className="h-16 mx-auto" />}
                        {section.icon === 'two-supports' && <OneSupportIcon className="h-16 mx-auto" />}
                    </TableHead>
                     {section.icon === 'two-supports' && (
                        <TableHead className="text-center font-semibold" colSpan={(section.headers.length - 2) / 2}>
                            <TwoSupportsIcon className="h-16 mx-auto" />
                        </TableHead>
                    )}
                </TableRow>
            )}
            </TableHeader>
            <TableBody>
                {section.rows.map((row: any, rowIndex: number) => (
                    <TableRow key={rowIndex}>
                    {row.map((cell: string, cellIndex: number) => (
                        <TableCell key={cellIndex} className={cellIndex === 0 ? 'bg-secondary/20 font-medium' : 'text-center'}>{cell}</TableCell>
                    ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
    )
};


const TextSection: React.FC<{ section: Extract<ProductVariantSection, { type: 'text' }> }> = ({ section }) => (
  <div className="mb-6">
    <h3 className="font-semibold text-lg mb-3">{section.title}</h3>
    {section.content.split('\n').map((p, i) => <p key={i} className="text-base text-justify mb-2">{p}</p>)}
  </div>
);

const ImageSection: React.FC<{ section: Extract<ProductVariantSection, { type: 'image' }> }> = ({ section }) => (
  <div className="mb-6 mt-8">
    {section.title && <h3 className="font-semibold text-lg mb-3">{section.title}</h3>}
    <div className="border-2 border-border bg-secondary/10 p-4">
      <div className="bg-white border border-border p-4 flex items-center justify-center">
        <Image 
          src={section.image.src}
          alt={section.image.alt}
          width={800}
          height={250}
          className="object-contain w-full"
          data-ai-hint={section.image.aiHint}
        />
      </div>
      {section.caption && <p className="text-center text-sm mt-2">{section.caption}</p>}
    </div>
  </div>
);

const ImageGridSection: React.FC<{ section: Extract<ProductVariantSection, { type: 'imageGrid' }> }> = ({ section }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {section.items.map((item, index) => (
      <Card key={index} className="overflow-hidden group">
        <CardHeader className="p-0">
          <div className="relative aspect-square">
            <Image
              src={item.image.src}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={item.image.aiHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 bg-secondary">
          <CardTitle className="text-lg">{item.name}</CardTitle>
          <p className="text-muted-foreground">{item.length}</p>
        </CardContent>
      </Card>
    ))}
  </div>
);


const sectionComponentMap = {
  keyValue: KeyValueSection,
  list: ListSection,
  table: TableSection,
  text: TextSection,
  image: ImageSection,
  imageGrid: ImageGridSection,
};

// --- Main Generic Component ---

export function ProductVariantDetails({ product }: { product: ProductVariant }) {
  if (!product) {
    return <div className="text-center p-8">Veuillez sélectionner un produit pour voir les détails.</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="md:sticky top-24">
            <ProductImageGallery mainImage={product.mainImage} />
        </div>
        <div>
          <div className="border-l-8 border-accent pl-4 mb-6">
            <h1 className="text-2xl font-bold text-accent uppercase">{product.title}</h1>
          </div>
          {product.sections.map((section, index) => {
            const Component = sectionComponentMap[section.type] as React.ElementType;
            return Component ? <Component key={index} section={section} /> : null;
          })}
        </div>
      </div>
    </div>
  );
}
