# Fix Add Product Error

## Steps:
- [x] 1. Update ProductRepository.js: Parse price to number, add try-catch
- [x] 2. Fix migration 001_create_produtos.js: price column to NUMERIC(18,4)
- [x] 1. Update ProductRepository.js: Parse price to number, add try-catch
- [x] 2. Fix migration 001_create_produtos.js: price column to NUMERIC(18,4)
- [x] 3. Add validation in produto.js
- [ ] 4. Fix .env DB_PASSWORD = 'senac'
- [ ] 5. Run migration: node app/database/migration/run.js
- [ ] 6. Test adding product
