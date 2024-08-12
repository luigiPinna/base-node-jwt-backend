# Portfolio Backend

Questo progetto è un backend per un sistema di gestione utenti con registrazione e login, sviluppato utilizzando Node.js, TypeScript, Express e TypeORM con PostgreSQL come database.

## Funzionalità

- **Registrazione utente**: Gli utenti possono registrarsi con email, password e un ruolo.
- **Login**: Gli utenti possono accedere utilizzando email e password per ricevere un token JWT.
- **Gestione dei ruoli**: Differenti ruoli utente (es. admin, user).

## Struttura del progetto

- `src/entity/`: Contiene le entità (User, Role).
- `src/services/`: Contiene i servizi come `AuthService` per gestire l'autenticazione.
- `src/config/`: Contiene la configurazione globale, ad esempio per JWT.
- `src/app.ts`: Punto di ingresso per l'applicazione Express.
- `ormconfig.json`: Configurazione per TypeORM.
- `tsconfig.json`: Configurazione TypeScript.

## Configurazione

1. Clona il repository:

    ```bash
    git clone https://github.com/tuo-username/portfolio-backend.git
    cd portfolio-backend
    ```

2. Installa le dipendenze:

    ```bash
    npm install
    ```

3. Configura il database in `ormconfig.json`.

4. Esegui la build del progetto:

    ```bash
    npm run build
    ```

5. Avvia il server in modalità produzione:

    ```bash
    npm start
    ```

6. Per lavorare in modalità sviluppo, usa:

    ```bash
    npm run dev
    ```

## Comandi

- **Sviluppo**: `npm run dev` - Avvia l'applicazione in modalità sviluppo con `ts-node-dev`, con supporto per il reloading automatico.
- **Build**: `npm run build` - Compila il progetto TypeScript, generando i file nella cartella `dist/`.
- **Start**: `npm start` - Avvia il server in modalità produzione utilizzando i file compilati.
- **Test**: `npm run test` - (Predefinito) Visualizza un messaggio di errore poiché i test non sono ancora implementati.

## Migrazioni

Se hai bisogno di utilizzare le migrazioni, esegui i seguenti comandi:

- Genera una migrazione:

    ```bash
    npx typeorm migration:generate -n NomeMigrazione
    ```

- Esegui una migrazione:

    ```bash
    npx typeorm migration:run
    ```

## Contributi

Contributi sono benvenuti! Per favore apri una issue o un pull request su GitHub.

## Licenza

Questo progetto è rilasciato sotto la licenza MIT.
