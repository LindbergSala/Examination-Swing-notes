# Swing Notes API

Ett backend-API för att skapa, läsa, uppdatera och ta bort anteckningar med inloggning och autentisering (JWT).

## 🚀 Kom igång

### 1. Klona projektet
```bash
git clone https://github.com/ditt-konto/swing-notes-api.git
cd swing-notes-api
```

### 2. Installera beroenden
```bash
npm install
```

### 3. Skapa en `.env`-fil
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/swing-notes
JWT_SECRET=valfri-hemlig-sträng
```

### 4. Starta servern
```bash
node server.js
```

### 5. Swagger-dokumentation
Gå till:  
[http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## 🔐 Autentisering

Alla `/api/notes`-endpoints kräver JWT-token.  
Skapa ett konto och logga in för att få token.  
Använd `Authorization: Bearer <ditt-token>` i dina anrop.

---

## 📫 API-endpoints

### Auth
- POST `/api/user/signup` – Skapa konto
- POST `/api/user/login` – Logga in

### Notes (kräver token)
- GET `/api/notes` – Hämta alla anteckningar
- POST `/api/notes` – Skapa anteckning
- PUT `/api/notes/:id` – Uppdatera anteckning
- DELETE `/api/notes/:id` – Radera anteckning
- GET `/api/notes/search?title=...` – Sök efter titel

---

## ⚙️ Tekniker

- Node.js + Express
- MongoDB + Mongoose
- bcryptjs
- JSON Web Tokens (JWT)
- Swagger för dokumentation
- Postman för testning

---

## ✅ Felhantering

| Statuskod | Beskrivning               |
|-----------|---------------------------|
| 200       | OK – anrop lyckades       |
| 400       | Bad Request – fel data    |
| 404       | Not Found – saknas        |
| 500       | Serverfel – hanteras internt |
