/**
 * Shopify Storefront API Integration
 * Handles order management and product sync with Shopify
 */

import { Order, Product, CartItem } from '@/types/ecommerce';

// Shopify Configuration
const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';
const SHOPIFY_API_VERSION = '2024-01';

// Shopify GraphQL Endpoint
const SHOPIFY_GRAPHQL_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

/**
 * Shopify GraphQL Query Helper
 */
async function shopifyFetch<T>(query: string, variables: Record<string, any> = {}): Promise<T> {
  try {
    const response = await fetch(SHOPIFY_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(`Shopify GraphQL error: ${JSON.stringify(result.errors)}`);
    }

    return result.data;
  } catch (error) {
    console.error('Shopify API Error:', error);
    throw error;
  }
}

/**
 * Fetch Products from Shopify
 */
export async function fetchShopifyProducts(first: number = 20, after?: string): Promise<any> {
  const query = `
    query GetProducts($first: Int!, $after: String) {
      products(first: $first, after: $after) {
        edges {
          node {
            id
            title
            description
            handle
            tags
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                  quantityAvailable
                  sku
                }
              }
            }
          }
          cursor
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;

  return shopifyFetch(query, { first, after });
}

/**
 * Get Product by Handle
 */
export async function getShopifyProductByHandle(handle: string): Promise<any> {
  const query = `
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        description
        handle
        tags
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
              quantityAvailable
              sku
            }
          }
        }
      }
    }
  `;

  return shopifyFetch(query, { handle });
}

/**
 * Create Shopify Checkout
 */
export async function createShopifyCheckout(lineItems: CartItem[]): Promise<any> {
  const mutation = `
    mutation CreateCheckout($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
          lineItems(first: 50) {
            edges {
              node {
                title
                quantity
                variant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
          totalPrice {
            amount
            currencyCode
          }
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  // Convert cart items to Shopify line items format
  const shopifyLineItems = lineItems.map(item => ({
    variantId: item.product.id, // Should be Shopify variant ID
    quantity: item.quantity,
  }));

  return shopifyFetch(mutation, {
    input: {
      lineItems: shopifyLineItems,
    },
  });
}

/**
 * Create Draft Order in Shopify
 * For B2B orders with custom payment terms
 */
export async function createShopifyDraftOrder(order: Order): Promise<any> {
  // Note: This requires Admin API access, not Storefront API
  // You'll need to implement this with the Admin API REST endpoint
  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/draft_orders.json`;
  
  const lineItems = order.items.map(item => ({
    title: item.product.name,
    quantity: item.quantity,
    price: item.product.price.toString(),
    sku: item.product.sku,
  }));

  const draftOrder = {
    draft_order: {
      line_items: lineItems,
      customer: {
        first_name: order.customerName.split(' ')[0],
        last_name: order.customerName.split(' ').slice(1).join(' '),
        email: order.customerEmail,
      },
      shipping_address: {
        first_name: order.shippingAddress.firstName,
        last_name: order.shippingAddress.lastName,
        address1: order.shippingAddress.address1,
        address2: order.shippingAddress.address2,
        city: order.shippingAddress.city,
        province: order.shippingAddress.wilaya,
        country: order.shippingAddress.country,
        phone: order.shippingAddress.phone,
      },
      note: order.notes,
      tags: order.paymentMethod === 'monthly_credit' ? 'monthly_payment' : '',
    },
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || '',
      },
      body: JSON.stringify(draftOrder),
    });

    if (!response.ok) {
      throw new Error(`Shopify Admin API error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error creating draft order:', error);
    throw error;
  }
}

/**
 * Get Order Status from Shopify
 */
export async function getShopifyOrderStatus(orderId: string): Promise<any> {
  // This requires Admin API access
  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/orders/${orderId}.json`;
  
  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || '',
      },
    });

    if (!response.ok) {
      throw new Error(`Shopify Admin API error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching order status:', error);
    throw error;
  }
}

/**
 * Sync Product Inventory
 */
export async function syncShopifyInventory(productId: string, locationId: string, quantity: number): Promise<any> {
  // This requires Admin API access and inventory management
  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/inventory_levels/set.json`;
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || '',
      },
      body: JSON.stringify({
        location_id: locationId,
        inventory_item_id: productId,
        available: quantity,
      }),
    });

    if (!response.ok) {
      throw new Error(`Shopify Inventory API error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error syncing inventory:', error);
    throw error;
  }
}

/**
 * Convert Shopify Product to Internal Product Format
 */
export function convertShopifyProduct(shopifyProduct: any): Partial<Product> {
  const variant = shopifyProduct.variants?.edges?.[0]?.node;
  const image = shopifyProduct.images?.edges?.[0]?.node;

  return {
    id: shopifyProduct.id,
    name: shopifyProduct.title,
    description: shopifyProduct.description,
    sku: variant?.sku || '',
    price: parseFloat(variant?.price?.amount || '0'),
    images: shopifyProduct.images?.edges?.map((edge: any) => edge.node.url) || [],
    inStock: variant?.availableForSale || false,
    stockQuantity: variant?.quantityAvailable || 0,
    tags: shopifyProduct.tags || [],
  };
}
