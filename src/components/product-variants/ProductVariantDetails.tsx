
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductVariant, ProductVariantSection, TableHeaderGroup } from '@/config/product-variant-schema';
import { ProductImageGallery } from '../product-image-gallery';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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

// Presentational tweaks the config deliberately keeps out of its data
// (line breaks inside long labels, unit casing).
const formatHeaderLabel = (label: string) =>
    label
        .replace('(mm)', '<br/>(mm)')
        .replace('kg/m²', 'Kg/m²')
        .replace('Système de', 'Système de<br/>');

const TableSection: React.FC<{ section: Extract<ProductVariantSection, { type: 'table' }> }> = ({ section }) => {
    // The body is the source of truth for how wide the table really is.
    const bodyCols = Math.max(
        ...section.rows.map((row) => row.length),
        section.subheaders?.length ?? 0,
        0,
    );

    // Column grouping comes from explicit config metadata: a plain `headers`
    // array is simply one group per body column, while `headerGroups` declares
    // the spans (and support diagrams) of tables such as "1 appui" / "2 appuis".
    const declaredGroups: TableHeaderGroup[] =
        section.headerGroups ?? (section.headers ?? []).map((label) => ({ label, span: 1 }));
    const groups: TableHeaderGroup[] = declaredGroups.map((group) => ({
        ...group,
        span: Math.max(1, Math.trunc(group.span)),
    }));

    // Safety net for config drift: never let the header row under-run the body.
    const declaredCols = groups.reduce((total, group) => total + group.span, 0);
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && declaredCols < bodyCols) {
        lastGroup.span += bodyCols - declaredCols;
    }

    const hasIconRow = groups.some((group) => Boolean(group.icon));

    return (
    <div className="mb-4">
        <h3 className="font-bold mb-3 text-lg">{section.title}</h3>
        {section.subtitle && <p className="text-sm text-muted-foreground mb-3">{section.subtitle}</p>}
        <Table>
            <TableHeader>
            <TableRow className="bg-accent text-accent-foreground">
                {groups.map((group, index) =>
                    <TableHead key={index} scope={group.span > 1 ? 'colgroup' : 'col'} colSpan={group.span > 1 ? group.span : undefined} className="text-accent-foreground" dangerouslySetInnerHTML={{ __html: formatHeaderLabel(group.label) }}></TableHead>
                )}
            </TableRow>
            {hasIconRow && (
                <TableRow>
                    {groups.map((group, index) => (
                        <TableHead key={index} className="text-center font-semibold" colSpan={group.span > 1 ? group.span : undefined}>
                            {group.icon === 'two-supports' && <TwoSupportsIcon className="h-16 mx-auto" />}
                        </TableHead>
                    ))}
                </TableRow>
            )}
            {section.subheaders && section.subheaders.length > 0 && (
                <TableRow>
                    {section.subheaders.map((label, index) => (
                        <TableHead key={index} scope="col" className={index === 0 ? 'bg-secondary/20 font-medium text-foreground' : 'text-center font-medium text-foreground'}>{label}</TableHead>
                    ))}
                </TableRow>
            )}
            </TableHeader>
            <TableBody>
                {section.rows.map((row: (string | number)[], rowIndex: number) => (
                    <TableRow key={rowIndex}>
                    {row.map((cell: string | number, cellIndex: number) => (
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
            {item.image?.src ? (
              <Image
                src={item.image.src}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={item.image.aiHint}
              />
            ) : (
              // No photo on file yet — a neutral placeholder is safer than
              // reusing another piece's picture.
              <div className="flex h-full w-full items-center justify-center bg-secondary/40 p-4 text-center text-sm text-muted-foreground">
                Photo à venir
              </div>
            )}
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
  
  // Some variants are a grid of parts with no representative hero image; those
  // get the full width instead of an empty column.
  const { mainImage } = product;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {mainImage && (
            <div className="md:sticky top-24">
                <ProductImageGallery mainImage={mainImage} />
            </div>
        )}
        <div className={!mainImage ? 'md:col-span-2' : ''}>
          <div className="border-l-8 border-accent pl-4 mb-6">
            <h2 className="text-2xl font-bold text-accent uppercase">{product.title}</h2>
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
