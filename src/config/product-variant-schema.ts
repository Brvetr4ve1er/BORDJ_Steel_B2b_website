
export type ProductImage = {
  src: string;
  alt: string;
  aiHint?: string;
};

export type TableSection = {
  type: 'table';
  title: string;
  subtitle?: string;
  headers: string[];
  subheaders?: { [key: string]: string[] };
  rows: (string | number)[][];
  icon?: 'one-support' | 'two-supports';
};

export type KeyValueSection = {
  type: 'keyValue';
  title: string;
  items: {
    key: string;
    value: string;
  }[];
};

export type ListSection = {
  type: 'list';
  title: string;
  items: string[];
};

export type TextSection = {
  type: 'text';
  title: string;
  content: string;
};

export type ImageSection = {
  type: 'image';
  title: string;
  caption?: string;
  image: ProductImage;
};

export type ImageGridSection = {
  type: 'imageGrid';
  items: {
    name: string;
    length: string;
    image: ProductImage;
  }[];
};

export type ProductVariantSection =
  | TableSection
  | KeyValueSection
  | ListSection
  | TextSection
  | ImageSection
  | ImageGridSection;

export type ProductVariant = {
  id: string;
  title: string;
  mainImage: ProductImage;
  sections: ProductVariantSection[];
};


// --- Example Skeleton ---
export const exampleSkeleton: ProductVariant = {
  id: "example-product",
  title: "Example Product Title",
  mainImage: {
    src: "",
    alt: "",
    aiHint: "",
  },
  sections: [
    {
      type: 'keyValue',
      title: 'Caractéristiques',
      items: [
        { key: 'Utilisation', value: '' },
        { key: 'Définition', value: '' }
      ]
    },
    {
      type: 'list',
      title: 'Avantages',
      items: ["", ""]
    },
    {
      type: 'table',
      title: 'Spécifications Techniques',
      headers: ["", ""],
      subheaders: {},
      rows: [
        ["", 0],
        ["", 0]
      ]
    },
    {
      type: 'text',
      title: 'Mise en Œuvre',
      content: ""
    },
    {
      type: 'image',
      title: 'Schéma Géométrique',
      caption: '',
      image: { src: '', alt: '' }
    },
    {
        type: 'imageGrid',
        items: [
            {
                name: '',
                length: '',
                image: { src: '', alt: '' }
            }
        ]
    }
  ]
};
