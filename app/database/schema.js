import { pgTable, varchar, numeric, serial, text, timestamp, bigserial } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    price: numeric("price", { precision: 18, scale: 4 }).notNull(),
});

export const customer = pgTable('customer', {
	id: serial('id').primaryKey(),
	nome: text('nome', { length: 150 }).notNull(),
	email: varchar('email', { length: 255 }).notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// Stub for fornecedor assuming structure
export const fornecedores = pgTable("fornecedores", {
    id: serial("id").primaryKey(),
    nome: varchar("nome", { length: 255 }).notNull(),
    cnpj: varchar("cnpj", { length: 18 }).notNull(),
});
