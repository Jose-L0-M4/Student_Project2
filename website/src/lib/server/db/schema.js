import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql, relations } from 'drizzle-orm';
import { user } from './auth.schema.js';
export * from './auth.schema';

/** =========================

* User Table



export const user = sqliteTable('user', {

id: integer().primaryKey({ autoIncrement: true }),

username: text().notNull().unique(),

passwordHash: text().notNull(),

firstname: text().notNull(),

surname: text().notNull(),

dob: text().notNull(), // YYYY-MM-DD

email: text().notNull().unique(),

role: text().notNull().default('user')

});
* ========================= */

/** =========================

* Session Table



export const session = sqliteTable('session', {

id: text().primaryKey(), // hashed token

userId: integer().notNull().references(() => user.id),

expiresAt: integer({ mode: 'timestamp_ms' }).notNull()

});
* ========================= */


/** =========================

* Product Category Table

* ========================= */

export const productCategory = sqliteTable('product_category', {

id: integer().primaryKey({ autoIncrement: true }),

name: text().notNull().unique(),

description: text()

});
/** =========================

* Product Table

* ========================= */

export const product = sqliteTable('product', {

id: integer().primaryKey({ autoIncrement: true }),

name: text().notNull(),

description: text(),

price: integer().notNull(), // stored in cents

image: text(),

quantity: integer().notNull().default(0),

categoryId: integer().references(() => productCategory.id)

});


/** =========================

* Order Table

* ========================= */

export const order = sqliteTable('order', {

id: integer().primaryKey({ autoIncrement: true }),

userId: integer().notNull().references(() => user.id),

status: text().notNull().default('pending'),

total: integer().notNull(), // in cents

createdAt: integer({ mode: 'timestamp_ms' }).notNull().default(sql`CURRENT_TIMESTAMP`)

});


/** =========================

* Order Detail Table

* ========================= */

export const orderDetail = sqliteTable('order_detail', {

id: integer().primaryKey({ autoIncrement: true }),

orderId: integer().notNull().references(() => order.id),

productId: integer().notNull().references(() => product.id),

quantity: integer().notNull().default(1),

unitPrice: integer().notNull() // price at time of order (cents)

});


/** =========================

* Cart Table

* ========================= */

export const cart = sqliteTable('cart', {

id: integer().primaryKey({ autoIncrement: true }),

userId: integer().notNull().references(() => user.id),

createdAt: integer({ mode: 'timestamp_ms' }).notNull().default(sql`CURRENT_TIMESTAMP`)

});

/** =========================

* Cart Item Table

* ========================= */

export const cartItem = sqliteTable('cart_item', {

id: integer().primaryKey({ autoIncrement: true }),

cartId: integer().notNull().references(() => cart.id),

productId: integer().notNull().references(() => product.id),

quantity: integer().notNull().default(1)

});


/** =========================

* Product Review Table

* ========================= */

export const productReview = sqliteTable('product_review', {
  id: integer().primaryKey({ autoIncrement: true }),

  productId: integer().notNull().references(() => product.id),

  userId: integer().notNull().references(() => user.id),

  rating: integer().notNull(),

  comment: text()
});


/** =========================

* Relations for ORM Joins

* ========================= */


// User → Orders (1:M)

export const userRelations = relations(user, ({ many }) => ({

orders: many(order)

}));


// Product Category → Products (1:M)

export const productCategoryRelations = relations(productCategory, ({ many }) => ({

products: many(product)

}));


// Product → Order Details (1:M) and Category (M:1)

export const productRelations = relations(product, ({ many, one }) => ({

category: one(productCategory, {

fields: [product.categoryId],

references: [productCategory.id]

}),

orderDetails: many(orderDetail)

}));


// Order → Order Details (1:M) and User (M:1)

export const orderRelations = relations(order, ({ many, one }) => ({

user: one(user, {

fields: [order.userId],

references: [user.id]

}),

orderDetails: many(orderDetail)

}));


// Order Detail → Product (M:1) and Order (M:1)

export const orderDetailRelations = relations(orderDetail, ({ one }) => ({

product: one(product, {

fields: [orderDetail.productId],

references: [product.id]

}),

order: one(order, {

fields: [orderDetail.orderId],

references: [order.id]

})

}));


// User → Cart (1:1 or 1:M)

export const cartRelations = relations(cart, ({ many, one }) => ({

user: one(user, {

fields: [cart.userId],

references: [user.id]

}),

items: many(cartItem)

}));


// Cart Item → Cart & Product

export const cartItemRelations = relations(cartItem, ({ one }) => ({

cart: one(cart, {

fields: [cartItem.cartId],

references: [cart.id]

}),

product: one(product, {

fields: [cartItem.productId],

references: [product.id]

})

}));