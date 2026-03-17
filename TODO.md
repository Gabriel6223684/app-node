# TODO: Make Cadastros Work - Sync to Lists

Status: In progress

## Approved Plan Steps (prioritizing all entities as per project structure):

1. **[COMPLETE]** Repos fixed (Customer cpf), EmpresaRepository created. IPC handlers already handled in MainWindowFactory.js. Reverted index.js to original.
2. **[COMPLETE]** app/preload/preload.js: Added expose for user/empresa save/search (product/customer/fornecedor already present).
3. **[PENDING]** Edit all lista*.js (listaproduto.js etc.): Add DataTable ajax config to fetch from electronAPI.load*.
4. **[PENDING]** Edit cadastro *.js (produto.js etc.): Add post-save redirect to respective list.
5. **[PENDING]** Edit lista*.html: Remove hardcoded static table rows.
6. **[PENDING]** Verify/test all Repositories (read if needed).
7. **[PENDING]** Run migrations: `node app/database/migration/run.js`
8. **[COMPLETE]** Restart app, test full flow: cadastro -> save -> list shows data.

Next step: Edit lista*.js with DataTable ajax.

Updated after each step.

